/**
 * Doktrin-Laufzeit: strukturierte Doktrin-Effektcodes an die Engine anbinden
 * (Passive, Kosten, Trigger, Zugbeginn).
 *
 * Lädt nach `engine.js`, gleiches Installationsmuster wie `victory_trophy.js`.
 * Hängt Methoden am Engine-Prototyp ein; ändert keine Kartendaten.
 */
(function (root) {
  'use strict';

  function hasTag(card, tag) {
    if (!card) return false;
    var t = String(tag || '').toLowerCase();
    var bag = []
      .concat(card.klasse_tags || [])
      .concat(card.tags || [])
      .concat(String(card.klasse || '').split(','))
      .map(function (x) { return String(x).trim().toLowerCase(); });
    return bag.some(function (x) { return x === t || x.indexOf(t) >= 0; });
  }
  function isInfantry(card) { return hasTag(card, 'infanterie'); }
  function isArtillery(card) {
    return hasTag(card, 'artillerie') || hasTag(card, 'haubitze') || hasTag(card, 'mörser') || hasTag(card, 'moerser') ||
      !!(card && (card.effects || []).some(function (e) { return e.code === 'ATTACK_ANY_FRONT'; }));
  }
  function isPanzer(card) { return hasTag(card, 'panzer') || hasTag(card, 'kette'); }
  function sectionCount(engine, p, sec) {
    return engine.frontList(p).filter(function (l) { return l.section === sec; }).length;
  }
  function hasSupport(p) {
    return !!(p && (p.support || []).some(Boolean));
  }
  function supportInSection(engine, p, sec) {
    // Support is global zone; treat "in section" as any own support present (deck design).
    return hasSupport(p);
  }
  function dokParam(engine, p, code) {
    if (!p || !p.doctrines) return null;
    for (var i = 0; i < p.doctrines.length; i++) {
      var def = engine.defOf(p.doctrines[i]);
      if (!def) continue;
      var fx = (def.effects || []).find(function (e) { return e.code === code; });
      if (fx) return fx.param || {};
    }
    return null;
  }
  function dokAllParams(engine, p, code) {
    var out = [];
    if (!p || !p.doctrines) return out;
    for (var i = 0; i < p.doctrines.length; i++) {
      var def = engine.defOf(p.doctrines[i]);
      if (!def) continue;
      (def.effects || []).forEach(function (e) {
        if (e.code === code) out.push(e.param || {});
      });
    }
    return out;
  }
  function hasDok(engine, p, code) {
    return !!(engine._hasDoctrine && engine._hasDoctrine(p, code));
  }

  function patchEngine(DCEngine) {
    if (!DCEngine || !DCEngine.Engine) return;
    var proto = DCEngine.Engine.prototype;
    if (proto._dokRuntimePatched) return;
    proto._dokRuntimePatched = true;
    proto._dokParam = function (p, code) { return dokParam(this, p, code); };

    // ---- Passive ATK/DEF ----
    var _cad = proto.currentAtkDef;
    proto.currentAtkDef = function (inst) {
      var r = _cad.apply(this, arguments);
      var atk = r.atk;
      var dv = r.def;
      var loc = this.findInst(inst.uid);
      var owner = (loc && loc.player) || (inst.owner != null ? this.player(inst.owner) : null);
      if (!owner || !loc || loc.zone !== 'front') return { atk: atk, def: dv };
      var def = this.defOf(inst) || {};
      var sec = loc.section;
      var ownN = sectionCount(this, owner, sec);
      var foe = this.opponent(owner.id);
      var foeN = sectionCount(this, foe, sec);
      var p;

      // AUSHARREN: no support → +ATK/+DEF (0 allowed)
      p = dokParam(this, owner, 'AUSHARREN');
      if (p && !supportInSection(this, owner, sec)) {
        if (p.atk) atk += Number(p.atk);
        if (p.def) dv += Number(p.def);
      }
      // AUFFANGEN: enemy more units → +DEF (+ optional ATK when equal)
      p = dokParam(this, owner, 'AUFFANGEN');
      if (p) {
        if (p.base_def) dv += Number(p.base_def || 0);
        if (foeN > ownN) {
          dv += Number(p.def || 1);
          if (p.outnumber_atk) atk += Number(p.outnumber_atk || 0);
        }
        if (p.equal_atk && foeN === ownN && ownN > 0) atk += Number(p.equal_atk || 0);
      }

      // LINIENKRIEG: base DEF + clustered bonus
      p = dokParam(this, owner, 'LINIENKRIEG');
      if (p) {
        if (p.base_def) dv += Number(p.base_def || 0);
        if (ownN >= Number(p.count || 2)) {
          dv += Number(p.def || 1);
          if (p.grouped_atk) atk += Number(p.grouped_atk || 0);
        }
      }

      // VERTEILTE_STELLUNG: alone +DEF / grouped +ATK
      p = dokParam(this, owner, 'VERTEILTE_STELLUNG');
      if (p) {
        if (ownN === 1 && p.alone) dv += Number(p.alone.def || 1);
        if (ownN >= 2 && p.grouped) atk += Number(p.grouped.atk || 1);
      }

      // UMGEHEN: local outnumber (or equal if flagged) → +ATK
      p = dokParam(this, owner, 'UMGEHEN');
      if (p) {
        var umOk = ownN > foeN;
        if (String(p.if || '').indexOf('equal') >= 0 || p.if === 'opponent-has-fewer-or-equal') umOk = ownN >= foeN && ownN > 0;
        if (umOk) atk += Number(p.atk || 1);
      }

      // GEPANZERTER_FUSS: base DEF + equipped → +ATK/+DEF
      p = dokParam(this, owner, 'GEPANZERTER_FUSS');
      if (p) {
        if (p.base_def) dv += Number(p.base_def || 0);
        if ((inst.attachments || []).length) {
          /* t255: ein ausdrückliches 0 gilt (nur DEF-Bonus); fehlender Wert bleibt 1. */
          atk += p.atk != null ? Number(p.atk) : 1;
          dv += p.def != null ? Number(p.def) : 1;
        }
      }

      // WEITERKAEMPFEN: damaged → +ATK/+DEF; SANITAET optional
      if (this._isDamaged(inst)) {
        p = dokParam(this, owner, 'WEITERKAEMPFEN');
        if (p) {
          atk += Number(p.atk || 1);
          if (p.def) dv += Number(p.def || 0);
        }
        if (hasDok(this, owner, 'SANITAET')) {
          var sp = dokParam(this, owner, 'SANITAET') || { def: 1 };
          var need = String(sp.need || 'support-in-section');
          if (need === 'always' || supportInSection(this, owner, sec)) dv += Number(sp.def || 0);
        }
      }

      // FEUERWALZE: artillery +ATK
      p = dokParam(this, owner, 'FEUERWALZE');
      if (p && isArtillery(def)) atk += Number(p.artillerie_atk || 1);

      // RASTEN: did not attack last turn → +ATK
      p = dokParam(this, owner, 'RASTEN');
      if (p && inst.flags && inst.flags.dokRested) atk += Number(p.atk || 1);

      // NORMVERBAND: front has inf+panzer+arty → +ATK/+DEF
      p = dokParam(this, owner, 'NORMVERBAND');
      if (p) {
        var hasI = false, hasP = false, hasA = false;
        this.frontList(owner).forEach(function (l) {
          var d = this.defOf(l.inst);
          if (isInfantry(d)) hasI = true;
          if (isPanzer(d)) hasP = true;
          if (isArtillery(d)) hasA = true;
        }.bind(this));
        // t283: `min_types` (Standard 3) Gattungen; ausdrückliches def/atk 0 gilt (vorher gab def:0 trotzdem +1 DEF).
        var nvTypes = (hasI ? 1 : 0) + (hasP ? 1 : 0) + (hasA ? 1 : 0);
        if (nvTypes >= Number(p.min_types || 3)) {
          atk += p.atk != null ? Number(p.atk) : 1;
          dv += p.def != null ? Number(p.def) : 1;
        }
      }

      // SCHEINSCHWERPUNKT / thin-section DEF/ATK
      p = dokParam(this, owner, 'SCHEINSCHWERPUNKT');
      if (p && ownN <= Number(p.thin_max || 1)) {
        if (p.thin_def != null) dv += Number(p.thin_def || 1);
        if (p.thin_atk != null) atk += Number(p.thin_atk || 0);
      }

      // VESPER ABRIEGELN soft: arty +ATK vs thin foe section (applied in combat wrap too)
      // ENTSATZ: entered attacked section → flag; held_def while section recently attacked
      p = dokParam(this, owner, 'ENTSATZ');
      if (p) {
        if (inst.flags && inst.flags.dokEntsatzUntil === this.state.turn && p.on_enter) {
          atk += Number(p.on_enter.atk || 1);
          dv += Number(p.on_enter.def || 1);
        }
        if (owner.flags && owner.flags.dokAttackedSections && owner.flags.dokAttackedSections[sec] != null) {
          if (p.held_def) dv += Number(p.held_def || 0);
          if (p.held_atk) atk += Number(p.held_atk || 0);
        }
      }

      // Temp doctrine buffs from turn-start / triggers
      if (inst.flags && inst.flags.dokAtkUntil === this.state.turn) atk += Number(inst.flags.dokAtk || 0);
      if (inst.flags && inst.flags.dokAuswUntil >= this.state.turn) atk += Number(inst.flags.dokAuswAtk || 0);
      if (inst.flags && inst.flags.dokDefUntil === this.state.turn) dv += Number(inst.flags.dokDef || 0);
      if (owner.flags && owner.flags.dokSectionAtk && owner.flags.dokSectionAtk[sec] != null &&
          owner.flags.dokSectionAtkUntil === this.state.turn) {
        atk += Number(owner.flags.dokSectionAtk[sec] || 0);
      }
      if (owner.flags && owner.flags.dokSectionDef && owner.flags.dokSectionDef[sec] != null &&
          owner.flags.dokSectionDefUntil === this.state.turn) {
        dv += Number(owner.flags.dokSectionDef[sec] || 0);
      }

      // MARSCH_AUS_DEM_VOLLEN on-enter ATK until end of turn
      if (inst.flags && inst.flags.dokMarschUntil === this.state.turn) {
        p = dokParam(this, owner, 'MARSCH_AUS_DEM_VOLLEN');
        if (p) atk += Number(p.atk || 1);
      }

      // ABSCHLUSS / GEGENSTOSS flags
      if (inst.flags && inst.flags.dokAbschlussUntil >= this.state.turn) atk += Number(inst.flags.dokAbschlussAtk || 1);
      if (inst.flags && inst.flags.dokGegenstossUntil >= this.state.turn) atk += Number(inst.flags.dokGegenstossAtk || 1);

      // STOSSTRUPP body-core
      p = dokParam(this, owner, 'STOSSTRUPP');
      if (p) {
        if (p.base_all_atk) atk += Number(p.base_all_atk || 0);
        if (isInfantry(def) && p.base_inf_atk) atk += Number(p.base_inf_atk || 0);
        if (p.damaged_atk && this._isDamaged(inst)) atk += Number(p.damaged_atk || 1);
      }

      // AUFKLAERUNGSSCHLAG / LOKALISIERUNG handled in combat wrap vs revealed
      // PUNKTFEUER: arty vs undamaged
      p = dokParam(this, owner, 'PUNKTFEUER');
      if (p && p.vs_undamaged && isArtillery(def)) {
        // bonus applied in combat when target undamaged
      }

      // LAUER patience: rested units +ATK/+DEF; optional infantry_only; fresh deploy DEF
      p = dokParam(this, owner, 'LAUER');
      if (p) {
        var lauerOk = !p.infantry_only || isInfantry(def);
        if (lauerOk && p.rested && inst.flags && inst.flags.dokRested) {
          atk += Number(p.rested.atk || 0);
          dv += Number(p.rested.def || 0);
        }
        if (lauerOk && p.fresh_def && inst.summonedTurn === this.state.turn) dv += Number(p.fresh_def || 0);
      }

      // t283 BOLLWERK_FRONT_DEF: Bollwerk gibt allen eigenen Einheiten +DEF (Befestigungen allein trugen die Doktrin nicht).
      p = dokParam(this, owner, 'BOLLWERK_FRONT_DEF');
      if (p) dv += Number(p.def != null ? p.def : 1);

      // ETAPPENSICHERUNG base DEF
      p = dokParam(this, owner, 'ETAPPENSICHERUNG');
      if (p && p.base_def) dv += Number(p.base_def || 0);

      // CALDRIS forsorge aura: none here (heal on turn start)

      return { atk: atk, def: dv };
    };

    // ---- Cost discounts ----
    var _cost = proto.costOf;
    proto.costOf = function (def, player, kind, inst, consume) {
      var cost = _cost.call(this, def, player, kind, inst, consume);
      if (!player || !def) return cost;
      var p;
      // BREITES_AUFGEBOT: infantry cheaper + later DEF baked on play
      p = dokParam(this, player, 'BREITES_AUFGEBOT');
      if (p && isInfantry(def) && def.typ === 'Einheit') {
        cost = Math.max(Number(p.min || 1), cost + Number(p.play_cost || -1));
      }
      // MARSCH_AUS_DEM_VOLLEN: unit into section with support cheaper
      p = dokParam(this, player, 'MARSCH_AUS_DEM_VOLLEN');
      if (p && def.typ === 'Einheit' && hasSupport(player)) {
        cost = Math.max(Number(p.min || 1), cost + Number(p.play_cost || -1));
      }
      // MATERIALERSATZ: panzer/arty cheaper (always, or after loss if gated)
      p = dokParam(this, player, 'MATERIALERSATZ');
      if (p && def.typ === 'Einheit' && (isPanzer(def) || isArtillery(def))) {
        var who = p.who || ['panzer', 'geschuetze'];
        var okType = (who.indexOf('panzer') >= 0 && isPanzer(def)) ||
          ((who.indexOf('geschuetze') >= 0 || who.indexOf('artillerie') >= 0) && isArtillery(def));
        if (okType) {
          var always = !p.if || p.if === 'always';
          var had = always || (player.grave || []).some(function (g) {
            var gd = this.defOf(g);
            if (!gd) return false;
            if (String(p.if || '').indexOf('any-front') >= 0) return gd.typ === 'Einheit';
            return isPanzer(gd) || isArtillery(gd);
          }.bind(this));
          if (had) cost = Math.max(Number(p.min || 1), cost + Number(p.play_cost || -1));
        }
      }
      // ABLOESUNG chain: discount into lost section
      if (player.flags && player.flags.dokAbloesung && def.typ === 'Einheit') {
        var ab = player.flags.dokAbloesung;
        if (ab.untilTurn >= this.state.turn) {
          cost = Math.max(1, cost + Number(ab.play_ap || -1));
        }
      }
      return cost;
    };

    // ---- On play: bake BREITES def, marsch flag, abloesung temp DEF, entsatz ----
    var _playHook = proto._finishPlayUnit || null;
    // Hook via wrapping _actSlot success path is hard; wrap a common post-place if exists.
    // Use _trophyOnPlay if present, else wrap after createMatch... Safer: wrap dispatch PLAY/CHOOSE_SLOT via _placeUnit if any.
    var _place = proto._placeOnFront;
    if (typeof _place === 'function') {
      proto._placeOnFront = function (player, card, section, row) {
        var ret = _place.apply(this, arguments);
        this._dokAfterPlace(player, card, section, row);
        return ret;
      };
    }

    proto._dokAfterPlace = function (player, card, section, row) {
      if (!player || !card) return;
      var def = this.defOf(card);
      if (!def || def.typ !== 'Einheit') return;
      var p;
      p = dokParam(this, player, 'BREITES_AUFGEBOT');
      if (p && isInfantry(def) && p.def) {
        card.def = (card.def == null ? Number(def.def) || 0 : card.def) + Number(p.def || 1);
        card.defMax = (card.defMax == null ? card.def : card.defMax) + Number(p.def || 1);
      }
      p = dokParam(this, player, 'MARSCH_AUS_DEM_VOLLEN');
      if (p && hasSupport(player)) {
        card.flags = card.flags || {};
        card.flags.dokMarschUntil = this.state.turn;
        if (p.def) {
          card.def = (card.def == null ? Number(def.def)||0 : card.def) + Number(p.def||0);
          card.defMax = (card.defMax == null ? card.def : card.defMax) + Number(p.def||0);
        }
      }
      p = dokParam(this, player, 'ENTSATZ');
      if (p && player.flags && player.flags.dokAttackedSections && player.flags.dokAttackedSections[section]) {
        card.flags = card.flags || {};
        card.flags.dokEntsatzUntil = this.state.turn;
      }
      p = dokParam(this, player, 'MATERIALERSATZ');
      if (p && p.enter_def && (isPanzer(def) || isArtillery(def))) {
        var alwaysEnter = !p.if || p.if === 'always';
        var hadLoss = alwaysEnter || (player.grave || []).some(function (g) { var gd = this.defOf(g); return gd && gd.typ === 'Einheit'; }.bind(this));
        if (hadLoss) {
          card.def = (card.def == null ? Number(def.def)||0 : card.def) + Number(p.enter_def||1);
          card.defMax = (card.defMax == null ? card.def : card.defMax) + Number(p.enter_def||1);
        }
      }
      // ABLOESUNG temp DEF
      if (player.flags && player.flags.dokAbloesung && player.flags.dokAbloesung.section === section) {
        var ab = player.flags.dokAbloesung;
        var dlt = Number(ab.def || 1);
        card.def = (card.def == null ? Number(def.def) || 0 : card.def) + dlt;
        card.defMax = (card.defMax == null ? card.def : card.defMax) + dlt;
        card.flags = card.flags || {};
        card.flags.dokAbloesungTempDef = dlt;
        card.flags.dokAbloesungUntil = this.state.turn + Number(ab.def_turns || 1);
        // consume once
        player.flags.dokAbloesung = null;
      }
    };

    // Also hook via _actSlot if _placeOnFront missing
    var _actSlot = proto._actSlot;
    proto._actSlot = function (pid, a) {
      var before = null;
      try {
        var p0 = this.player(pid);
        // snapshot occupied
      } catch (e) {}
      var res = _actSlot.call(this, pid, a);
      try {
        if (res && res.ok) {
          var p = this.player(pid);
          var sec = a.section || (a.slot && a.slot.section) || (this.state.pending && this.state.pending.section);
          var row = a.row != null ? a.row : (a.slot && a.slot.row);
          if (sec != null && row != null && p.front[sec] && p.front[sec][row]) {
            this._dokAfterPlace(p, p.front[sec][row], sec, row);
          }
        }
      } catch (e2) {}
      return res;
    };

    // ---- Destroy: ABLOESUNG, ABNUTZUNG, ABSCHLUSS ----
    var _destroy = proto._destroy;
    proto._destroy = function (loc, meta) {
      var deadOwner = loc && loc.player;
      var deadSec = loc && loc.section;
      var deadZone = loc && loc.zone;
      var deadInst = loc && loc.inst;
      var killer = deadOwner ? this.opponent(deadOwner.id) : null;
      var ret = _destroy.call(this, loc, meta);
      try {
        if (deadZone === 'front' && deadOwner && deadInst) {
          // ABLOESUNG: arm discount once per turn into section
          if (hasDok(this, deadOwner, 'ABLOESUNG')) {
            var ap = dokParam(this, deadOwner, 'ABLOESUNG') || {};
            if (!deadOwner.flags) deadOwner.flags = {};
            if (deadOwner.flags.dokAbloesungUsedTurn !== this.state.turn) {
              deadOwner.flags.dokAbloesungUsedTurn = this.state.turn;
              deadOwner.flags.dokAbloesung = {
                section: deadSec,
                play_ap: Number(ap.play_ap != null ? ap.play_ap : -1),
                def: Number(ap.def != null ? ap.def : 1),
                def_turns: Number(ap.def_turns != null ? ap.def_turns : 1),
                untilTurn: this.state.turn + 1,
                permanent: !!ap.permanent
              };
              this._log(deadOwner.name + ': Ablösung — nächste Einheit in ' + deadSec + ' kostet weniger.');
            }
          }
          // ABNUTZUNG for killer
          if (killer && hasDok(this, killer, 'ABNUTZUNG')) {
            var bp = dokParam(this, killer, 'ABNUTZUNG') || {};
            if (!killer.flags) killer.flags = {};
            killer.flags.dokSectionAtk = killer.flags.dokSectionAtk || {};
            killer.flags.dokSectionAtk[deadSec] = (killer.flags.dokSectionAtk[deadSec] || 0) +
              Number((bp.on_destroy_in_section && bp.on_destroy_in_section.section_atk) || 1);
            killer.flags.dokSectionAtkUntil = this.state.turn;
            if (bp.on_destroy_in_section && bp.on_destroy_in_section.heal) {
              var healAmt = Number(bp.on_destroy_in_section.heal || 1);
              var mates = this.frontList(killer).filter(function (l) { return l.section === deadSec; });
              if (mates.length) this._heal(mates[0].inst, healAmt);
            }
            if (bp.on_destroy_in_section && bp.on_destroy_in_section.draw) this._draw(killer, Number(bp.on_destroy_in_section.draw || 1));
            if (bp.other_sections && bp.other_sections.def) {
              killer.flags.dokSectionDef = killer.flags.dokSectionDef || {};
              ['L', 'C', 'R'].forEach(function (s) {
                if (s === deadSec) return;
                killer.flags.dokSectionDef[s] = (killer.flags.dokSectionDef[s] || 0) +
                  Number(bp.other_sections.def || 1);
              });
              killer.flags.dokSectionDefUntil = this.state.turn + 1;
            }
          }
          // ABSCHLUSS: killer's unit that destroyed gets +ATK
          if (killer && hasDok(this, killer, 'ABSCHLUSS') && meta && meta.killerUid) {
            var kLoc = this.findInst(meta.killerUid);
            if (kLoc && kLoc.inst) {
              var cp = dokParam(this, killer, 'ABSCHLUSS') || {};
              kLoc.inst.flags = kLoc.inst.flags || {};
              kLoc.inst.flags.dokAbschlussAtk = Number(cp.atk || 1);
              kLoc.inst.flags.dokAbschlussUntil = this.state.turn + 1;
            }
          }
        }
      } catch (e) {}
      return ret;
    };

    // Mark killer uid before destroy in combat
    var _applyHits = proto._applyCombatHits;
    proto._applyCombatHits = function (aLoc, tLoc, dmgToT, dmgToA, fog) {
      this.state._dokLastAttackerUid = aLoc && aLoc.inst && aLoc.inst.uid;
      // Combat doctrine modifiers
      try {
        var A = aLoc && aLoc.inst;
        var T = tLoc && tLoc.inst;
        var atkP = aLoc && aLoc.player;
        var defP = tLoc && tLoc.player;
        if (A && T && atkP) {
          var aDef = this.defOf(A);
          // AUFKLAERUNGSSCHLAG: +ATK vs revealed (optional once/turn)
          var p = dokParam(this, atkP, 'AUFKLAERUNGSSCHLAG');
          // t283: Param `against` wählt das Ziel: 'revealed' (Standard, aufgedeckt) oder 'observed' (beobachtet).
          var vsOk = function (prm) {
            var ag = (prm && prm.against) || 'revealed';
            if (ag === 'observed') return !!(T.flags && T.flags.observed);
            return T.facedown === false;
          };
          if (p && vsOk(p)) {
            var scoutOk = !p.scout_only || hasTag(aDef, 'aufklaerung');
            if (scoutOk) {
              if (p.once_per_turn) {
                atkP.flags = atkP.flags || {};
                if (atkP.flags.dokAufklaerUsed !== this.state.turn) {
                  dmgToT += Number(p.atk || 1);
                  atkP.flags.dokAufklaerUsed = this.state.turn;
                }
              } else dmgToT += Number(p.atk || 1);
            }
          }
          // LOKALISIERUNG: sum all matching doctrine effects (card may bundle several)
          dokAllParams(this, atkP, 'LOKALISIERUNG').forEach(function (lp) {
            if (vsOk(lp)) {
              dmgToT += Math.abs(Number(lp.def || -1));
              if (lp.vs_damaged_extra && this._isDamaged(T)) dmgToT += Number(lp.vs_damaged_extra || 0);
            }
          }.bind(this));
          // PUNKTFEUER: base arty + vs undamaged
          p = dokParam(this, atkP, 'PUNKTFEUER');
          if (p && isArtillery(aDef)) {
            if (p.base_arty_atk) dmgToT += Number(p.base_arty_atk || 0);
            if ((p.vs_undamaged || p.who === 'artillerie') && !this._isDamaged(T)) dmgToT += Number(p.atk || 1);
          }
          // ABRIEGELN: base arty + thin section
          p = dokParam(this, atkP, 'ABRIEGELN');
          if (p && isArtillery(aDef) && tLoc.zone === 'front') {
            if (p.base_arty_atk) dmgToT += Number(p.base_arty_atk || 0);
            if (p.thin_atk) {
              var fn = sectionCount(this, defP, tLoc.section);
              if (fn <= Number(p.thin_max || 1)) dmgToT += Number(p.thin_atk || 1);
            }
          }
          // ZIELANGRIFF vs damaged
          p = dokParam(this, atkP, 'ZIELANGRIFF');
          if (p && p.vs_damaged_atk && this._isDamaged(T)) {
            dmgToT += Number(p.vs_damaged_atk || 1);
            atkP.flags = atkP.flags || {};
            atkP.flags._dokZielDrawArmed = !!p.draw_on_damaged_kill;
          }
          // FEUERWALZE on_shell: own units in section +ATK flag
          p = dokParam(this, atkP, 'FEUERWALZE');
          if (p && p.on_shell && isArtillery(aDef) && aLoc.zone === 'front') {
            var self = this;
            this.frontList(atkP).forEach(function (l) {
              if (l.section !== aLoc.section) return;
              if (!p.on_shell.include_self && l.inst.uid === A.uid) return;
              l.inst.flags = l.inst.flags || {};
              l.inst.flags.dokAtk = (l.inst.flags.dokAtk || 0) + Number(p.on_shell.atk || 1);
              l.inst.flags.dokAtkUntil = self.state.turn;
            });
          }
          // Mark defender section attacked for ENTSATZ / GEGENSTOSS
          if (defP) {
            defP.flags = defP.flags || {};
            defP.flags.dokAttackedSections = defP.flags.dokAttackedSections || {};
            defP.flags.dokAttackedSections[tLoc.section] = this.state.turn;
            defP.flags.dokAttackedThisTurn = true;
          }
        }
      } catch (e) {}
      var ret = _applyHits.call(this, aLoc, tLoc, dmgToT, dmgToA, fog);
      // GEGENSTOSS: after attack, buff surviving defenders in section
      try {
        var defP2 = tLoc && tLoc.player;
        if (defP2 && hasDok(this, defP2, 'GEGENSTOSS') && tLoc.zone === 'front') {
          var gp = dokParam(this, defP2, 'GEGENSTOSS') || {};
          var self2 = this;
          this.frontList(defP2).forEach(function (l) {
            if (l.section !== tLoc.section) return;
            if (self2._isDead && self2._isDead(l.inst)) return;
            l.inst.flags = l.inst.flags || {};
            l.inst.flags.dokGegenstossAtk = Number(gp.atk || 1);
            l.inst.flags.dokGegenstossUntil = self2.state.turn + 1;
          });
          if (gp.heal_survivor && tLoc.inst && !(this._isDead && this._isDead(tLoc.inst))) {
            this._heal(tLoc.inst, Number(gp.heal_survivor || 1));
          }
        }
        // ABSCHLUSS via killer uid if target dead
        if (aLoc && tLoc && this._isDead && this._isDead(tLoc.inst) && aLoc.player.flags && aLoc.player.flags._dokZielDrawArmed) {
          this._draw(aLoc.player, 1);
          aLoc.player.flags._dokZielDrawArmed = false;
        }
        if (aLoc && tLoc && this._isDead && this._isDead(tLoc.inst) && hasDok(this, aLoc.player, 'ABSCHLUSS')) {
          var cp = dokParam(this, aLoc.player, 'ABSCHLUSS') || {};
          aLoc.inst.flags = aLoc.inst.flags || {};
          aLoc.inst.flags.dokAbschlussAtk = Number(cp.atk || 1);
          aLoc.inst.flags.dokAbschlussUntil = this.state.turn + 1;
          if (cp.draw) this._draw(aLoc.player, Number(cp.draw || 1));
        }
        if (aLoc && tLoc && this._isDead && this._isDead(tLoc.inst) && hasDok(this, aLoc.player, 'WEITERKAEMPFEN')) {
          var wp = dokParam(this, aLoc.player, 'WEITERKAEMPFEN') || {};
          if (wp.heal_on_kill && this._isDamaged(aLoc.inst)) this._heal(aLoc.inst, Number(wp.heal_on_kill || 1));
          if (wp.ap_on_kill) {
            aLoc.player.flags = aLoc.player.flags || {};
            if (aLoc.player.flags.dokWkApTurn !== this.state.turn) {
              aLoc.player.flags.dokWkApTurn = this.state.turn;
              aLoc.player.ap += Number(wp.ap_on_kill || 1);
            }
          }
        }
      } catch (e2) {}
      return ret;
    };

    // ---- Turn start / end doctrine ticks ----
    var _actEnd = proto._actEnd;
    proto._actEnd = function (pid) {
      var res = _actEnd.call(this, pid);
      try {
        // After end, next player is active — apply their turn-start doctrines
        var nxtId = this.state.active;
        var nxt = this.player(nxtId);
        this._dokTurnStart(nxt);
        // Mark rested flags for previous player units
        var cur = this.player(pid);
        var self = this;
        this.frontList(cur).forEach(function (l) {
          l.inst.flags = l.inst.flags || {};
          l.inst.flags.dokRested = !l.inst.attackUsed;
          // expire abloesung temp DEF
          if (l.inst.flags.dokAbloesungUntil != null && l.inst.flags.dokAbloesungUntil < self.state.turn) {
            if (l.inst.flags.dokAbloesungTempDef) {
              var d = Number(l.inst.flags.dokAbloesungTempDef);
              l.inst.def = Math.max(1, (l.inst.def || 0) - d);
              l.inst.defMax = Math.max(l.inst.def, (l.inst.defMax || 0) - d);
              l.inst.flags.dokAbloesungTempDef = 0;
            }
          }
        });
        // clear attacked sections older than previous turn for entsatz window
        if (nxt.flags && nxt.flags.dokAttackedSections) {
          var keep = {};
          var t = this.state.turn;
          Object.keys(nxt.flags.dokAttackedSections).forEach(function (s) {
            if (nxt.flags.dokAttackedSections[s] >= t - 1) keep[s] = nxt.flags.dokAttackedSections[s];
          });
          nxt.flags.dokAttackedSections = keep;
        }
      } catch (e) {}
      return res;
    };

    proto._dokTurnStart = function (p) {
      if (!p) return;
      var self = this;
      p.flags = p.flags || {};
      // SCHWERPUNKT: densest section +ATK
      if (hasDok(this, p, 'SCHWERPUNKT')) {
        var sp = dokParam(this, p, 'SCHWERPUNKT') || {};
        // t283: Param `auto` – 'densest' (Standard): dichtester Abschnitt; 'center': immer das Zentrum.
        var best = 'C'; var bestN = sp.auto === 'center' ? sectionCount(self, p, 'C') : -1;
        ['L', 'C', 'R'].forEach(function (s) {
          if (sp.auto === 'center') return;
          var n = sectionCount(self, p, s);
          if (n > bestN) { bestN = n; best = s; }
        });
        var minU = Number(sp.min_units || 1);
        if (bestN >= minU) {
          p.flags.dokSectionAtk = p.flags.dokSectionAtk || {};
          p.flags.dokSectionAtk[best] = Number(sp.atk || 1);
          p.flags.dokSectionAtkUntil = this.state.turn;
          this._log(p.name + ': Schwerpunkt auf ' + best + '.');
        }
      }
      // STURMANGRIFF: strongest infantry +ATK
      if (hasDok(this, p, 'STURMANGRIFF')) {
        var st = dokParam(this, p, 'STURMANGRIFF') || {};
        /* t255: `count` – so viele der stärksten Infanterien erhalten den Bonus (Standard 1). */
        // t283: Param `auto` – 'strongest-infantry' (Standard) nach ATK, 'weakest-infantry' umgekehrt.
        var weakFirst = st.auto === 'weakest-infantry';
        var inf = this.frontList(p).filter(function (l) { return isInfantry(self.defOf(l.inst)); })
          .map(function (l, i) { var a0 = Number(self.defOf(l.inst).atk) || 0; return { inst: l.inst, a: weakFirst ? -a0 : a0, i: i }; })
          .sort(function (x, y) { return (y.a - x.a) || (x.i - y.i); });
        inf.slice(0, Math.max(1, Number(st.count || 1))).forEach(function (x) {
          x.inst.flags = x.inst.flags || {};
          x.inst.flags.dokAtk = Number(st.atk || 2);
          x.inst.flags.dokAtkUntil = self.state.turn;
        });
      }
      // STOSSTRUPP: only legacy turn-start pick when no passive body-core params
      if (hasDok(this, p, 'STOSSTRUPP')) {
        var stp = dokParam(this, p, 'STOSSTRUPP') || {};
        if (!(stp.base_all_atk || stp.base_inf_atk || stp.damaged_atk)) {
          var pick2 = null; var best2 = -1;
          this.frontList(p).forEach(function (l) {
            if (!isInfantry(self.defOf(l.inst))) return;
            var a = Number(self.defOf(l.inst).atk) || 0;
            if (a > best2) { best2 = a; pick2 = l.inst; }
          });
          if (pick2) {
            pick2.flags = pick2.flags || {};
            pick2.flags.dokAtk = Number(stp.atk || 2);
            pick2.flags.dokAtkUntil = this.state.turn;
            if (!stp.no_def_loss && stp.def) {
              pick2.def = Math.max(1, (pick2.def || 0) + Number(stp.def));
            }
          }
        }
      }
      // ETAPPENSICHERUNG: heal one damaged OR section DEF
      if (hasDok(this, p, 'ETAPPENSICHERUNG')) {
        var ep = dokParam(this, p, 'ETAPPENSICHERUNG') || {};
        if (ep.heal) {
          var hurt = this.frontList(p).filter(function (l) { return self._isDamaged(l.inst); });
          if (hurt.length) {
            this._heal(hurt[0].inst, Number(ep.heal || 1));
            this._log(p.name + ': Etappensicherung heilt.');
          }
        } else {
          // densest section +DEF
          var bestS = 'C'; var bestNs = -1;
          ['L', 'C', 'R'].forEach(function (s) {
            var n = sectionCount(self, p, s);
            if (n > bestNs) { bestNs = n; bestS = s; }
          });
          if (bestNs > 0) {
            p.flags.dokSectionDef = p.flags.dokSectionDef || {};
            p.flags.dokSectionDef[bestS] = Number(ep.def || 1);
            p.flags.dokSectionDefUntil = this.state.turn;
          }
        }
      }
      // VERLEGUNG: optional free shift — skip for bot; grant +DEF to one unit that could shift
      if (hasDok(this, p, 'VERLEGUNG')) {
        var vp = dokParam(this, p, 'VERLEGUNG') || {};
        if (vp.passive_def) {
          this.frontList(p).forEach(function (l) {
            l.inst.flags = l.inst.flags || {};
            l.inst.flags.dokDef = Number(vp.passive_def || 1);
            l.inst.flags.dokDefUntil = self.state.turn;
          });
        }
      }
    };

    // AUSWERTUNG: survive damage → temp ATK
    var _damage = proto._damage;
    proto._damage = function (inst, amt, meta) {
      var before = inst && inst.def;
      var ret = _damage.apply(this, arguments);
      try {
        var loc = this.findInst(inst && inst.uid);
        if (loc && loc.zone === 'front' && loc.player && hasDok(this, loc.player, 'AUSWERTUNG')) {
          if (inst.def != null && inst.def > 0 && !(this._isDead && this._isDead(inst))) {
            var ap = dokParam(this, loc.player, 'AUSWERTUNG') || {};
            inst.flags = inst.flags || {};
            if (ap.no_stack) {
              inst.flags.dokAtk = Number(ap.atk || 1);
            } else {
              inst.flags.dokAtk = (inst.flags.dokAtk || 0) + Number(ap.atk || 1);
            }
            if (ap.until === 'end-of-next-own-turn') {
              /* t255: Bonus hält bis zum Ende des nächsten eigenen Zuges (eigener Merker, kein Überschreiben durch Sturmangriff o. Ä.). */
              inst.flags.dokAuswAtk = Number(ap.atk || 1);
              inst.flags.dokAuswUntil = this.state.turn + (this.state.active === loc.player.id ? 0 : 1);
            } else {
              inst.flags.dokAtkUntil = this.state.turn; // end of this turn
            }
          }
        }
      } catch (e) {}
      return ret;
    };

    // Match start: apply turn-start for starting player once match begins
    var _create = proto.createMatch;
    proto.createMatch = function () {
      var ret = _create.apply(this, arguments);
      try {
        var active = this.player(this.state.active);
        this._dokTurnStart(active);
      } catch (e) {}
      return ret;
    };
  }

  root.DC_DOCTRINE_RUNTIME = { patchEngine: patchEngine };
  function tryPatch() {
    if (root.DCEngine) patchEngine(root.DCEngine);
  }
  tryPatch();
})(typeof window !== 'undefined' ? window : globalThis);
