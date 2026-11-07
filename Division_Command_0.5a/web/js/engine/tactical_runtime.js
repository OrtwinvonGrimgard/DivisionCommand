/* Allgemeines taktisches Vokabular (t203). Kein Textparser: strukturierte Codes,
   Instanz-IDs, atomare Zielwahl und explizite Eintritts-/Nachkampfereignisse. */
(function (g) {
  'use strict';
  const P = g.DCEngine.Engine.prototype, S = ['L','C','R'];
  const CODES = ['TACTICAL_BIND','TACTICAL_INTERDICT','TACTICAL_COVER'];
  const fx = (eng, inst, code) => ((eng.defOf(inst) || {}).effects || []).find(e => e.code === code);
  const sig = l => l && [l.player.id,l.zone,l.section,l.row].join(':');
  const isInf = d => d && (d.klasse === 'Infanterie' || (d.tags || []).includes('infanterie'));
  const need = (ok, msg) => { if (!ok) throw new Error(msg); };
  Object.assign(g.DCEngine.PENDING_META, {
    'tac-aura-section': {title:'Glaubensbanner: eigenen Abschnitt für Infanterie +1 DEF festlegen',pick:'section',needs:true},
    'tac-bind': {title:'Binden: offene gegnerische Front im gegenüberliegenden Abschnitt',pick:'card',needs:true},
    'tac-interdict': {title:'Anmarschstörung: gegnerischen Abschnitt wählen (+1 AP beim nächsten Einsatz)',pick:'section',needs:true},
    'tac-cover-ally': {title:'Feuerschutz 2: offenen unmittelbaren Nachbarn wählen',pick:'card',needs:true},
    'tac-cover-target': {title:'Feuerschutz 2: gemeinsames legales Angriffsziel wählen',pick:'card',needs:true},
    'tac-break': {title:'Gefechtsabbruch: 1 AP; danach Angriffsverbot bis Ende deines nächsten Zuges',pick:'slot',needs:true},
    'tac-discard': {title:'Notdepot: 1 eigene Handkarte abwerfen (verpflichtend)',pick:'card',needs:true}
  });
  P._tacBlockedAttack = function (inst) {
    const f = inst.flags || {};
    return f.tacAttackSpentTurn === this.state.turn || (f.tacNoAttackUntil != null && this.state.turn <= f.tacNoAttackUntil);
  };
  P._tacMayMove = function (inst) {
    const f = (inst && inst.flags) || {};
    return !(f.tacBoundUntil != null && this.state.turn <= f.tacBoundUntil) && f.tacNoMoveTurn !== this.state.turn;
  };
  P._tacAssertMove = function (inst) { need(this._tacMayMove(inst),'Einheit darf ihr Feld nicht verlassen (Binden/Bewegungsverbot)'); };
  P._tacDepart = function (inst, leaving) {
    this.state.players.forEach(p => {
      const m = p.flags && p.flags.tacCover;
      if (m && m.ids.includes(inst.uid)) delete p.flags.tacCover;
    });
    if (leaving && inst.flags.tacBannerBonus) {
      const n=inst.flags.tacBannerBonus; inst.defMax=Math.max(1,inst.defMax-n); if (inst.def>0) inst.def=Math.max(1,inst.def-n); inst.flags.tacBannerBonus=0;
    }
    if (leaving) ['tacBoundUntil','tacNoMoveTurn','tacNoAttackUntil','tacAttackSpentTurn'].forEach(k => delete inst.flags[k]);
  };
  P._tacCleanup = function () {
    if (!this.state || !this.state.players) return;
    const turn = this.state.turn;
    this.state.players.forEach(p => {
      p.flags = p.flags || {};
      const m = p.flags.tacInterdict;
      if (m) {
        const l=this.findInst(m.source);
        if (turn > m.until || !l || l.zone !== 'support' || l.inst.facedown || l.player.id !== p.id) delete p.flags.tacInterdict;
      }
      const c=p.flags.tacCover;
      if (c && (c.turn !== turn || c.ids.some((id,i) => {
        const l=this.findInst(id); return !l || l.zone !== 'front' || l.inst.facedown || sig(l) !== c.positions[i];
      }))) delete p.flags.tacCover;
      this.frontList(p).forEach(l => {
        const f=l.inst.flags || {};
        const bonus=isInf(this.defOf(l.inst)) ? (p.support || []).filter(s=>s && !s.facedown && s.flags.tacAuraSection === l.section && fx(this,s,'TACTICAL_SECTION_INF_DEF')).reduce((a,s)=>a+Number((fx(this,s,'TACTICAL_SECTION_INF_DEF').param || {}).amount || 1),0) : 0;
        const delta=bonus-Number(f.tacBannerBonus || 0);
        if (delta) { l.inst.defMax=Math.max(1,l.inst.defMax+delta); l.inst.def=delta>0 ? l.inst.def+delta : Math.max(1,Math.min(l.inst.def+delta,l.inst.defMax)); }
        f.tacBannerBonus=bonus;
        ['tacBoundUntil','tacNoAttackUntil'].forEach(k => { if (f[k] != null && turn > f[k]) delete f[k]; });
        if (f.tacNoMoveTurn !== turn) delete f.tacNoMoveTurn;
      });
    });
  };
  P._tacReady = function (l) {
    return !!(l && l.zone === 'front' && !l.inst.facedown && !l.inst.flags.noAttack && this._canAct(l.inst,l.player.id));
  };
  P._tacTargets = function (l) {
    if (!this._tacReady(l)) return [];
    return this.legalAttackTargets(l).map(t=>this.findInst(t.inst.uid)).filter(t => t && t.zone === 'front' && !t.inst.facedown && !this._isDeployProtected(t.inst));
  };
  P._tacAdjacent = function (l, onlyFree) {
    if (!l || l.zone !== 'front') return [];
    // Tatsächliche neunfach sichtbare Frontlinie aus renderFront:
    // L0,L1,L2,C0,C1,C2,R0,R1,R2. Kein Sprung um drei Felder.
    const index=this._lineIndex(l.section,l.row);
    return [index-1,index+1].filter(i=>i>=0 && i<9).map(i=>({section:S[Math.floor(i/3)],row:i%3})).filter(s=>!onlyFree || !l.player.front[s.section][s.row]);
  };
  P._tacActivation = function (pid, uid) {
    this._tacCleanup();
    const l=this.findInst(uid), p=this.player(pid);
    need(l && l.player.id === pid && !l.inst.facedown,'Keine offene eigene Quelle');
    const code=CODES.find(c=>fx(this,l.inst,c));
    need(code,'Keine aktivierbare taktische Fähigkeit');
    need(this.state.active === pid && this.state.phase === 'main','Nur im eigenen Zug');
    need(p.ap >= 1,'Zu wenig AP');
    if (code === 'TACTICAL_INTERDICT') {
      need(l.zone === 'support','Anmarschstörung braucht eine Unterstützung');
      need(l.inst.flags.tacInterdictUsedTurn !== this.state.turn,'Anmarschstörung schon genutzt');
      need(!p.flags.tacInterdict,'Schon eine eigene Anmarschstörung aktiv');
      return {kind:'tac-interdict',player:pid,uid,choices:S.map(s=>({section:s,side:'enemy',target:'sec:'+s,label:s+' · nächster Einheiteneinsatz +1 AP'}))};
    }
    need(this._tacReady(l),'Diese Einheit könnte jetzt nicht legal angreifen');
    need(p.ap >= Number(this.rules.attack_ap || 1),'Zu wenig AP für einen legalen Angriff');
    const targets=this._tacTargets(l);
    if (code === 'TACTICAL_BIND') {
      need(p.flags.tacBindUsedTurn !== this.state.turn,'Binden schon einmal in diesem Zug genutzt');
      need(this.legalAttackTargets(l).length,'Kein legaler Angriff möglich');
      const choices=this.frontList(this.opponent(pid)).map(t=>this.findInst(t.inst.uid)).filter(t=>t.section === l.section && !t.inst.facedown && !this._hostileTargetBlocked(t.inst) && !(t.inst.flags.tacBoundUntil != null && this.state.turn <= t.inst.flags.tacBoundUntil)).map(t=>({target:t.inst.uid,label:this.defOf(t.inst).name}));
      need(choices.length,'Kein offenes, ungebundenes legales Ziel im gegenüberliegenden Abschnitt');
      return {kind:'tac-bind',player:pid,uid,choices};
    }
    need(l.inst.flags.tacCoverUsedTurn !== this.state.turn,'Feuerschutz dieser Einheit schon genutzt');
    need(!p.flags.tacCover,'Schon ein eigener Feuerschutz aktiv');
    const adj=this._tacAdjacent(l).map(s=>l.player.front[s.section][s.row]).filter(Boolean);
    const choices=adj.map(i=>this.findInst(i.uid)).filter(a=>this._tacReady(a) && this._tacTargets(a).some(t=>targets.some(x=>x.inst.uid === t.inst.uid))).map(a=>({target:a.inst.uid,label:this.defOf(a.inst).name}));
    need(choices.length,'Kein offener unmittelbarer Nachbar mit gemeinsamem legalem Ziel');
    return {kind:'tac-cover-ally',player:pid,uid,choices};
  };
  P._tacAbility = function (pid, a) {
    const l=this.findInst(a.uid);
    if (!l || !CODES.some(c=>fx(this,l.inst,c))) return null;
    need(!this.state.pending,'Erst offene Auswahl abschließen');
    const spec=this._tacActivation(pid,a.uid);
    this.state.pending=this._sealPending(spec); return {ok:true,need:'target'};
  };
  P._tacChoose = function (pid, a) {
    const q=this.state.pending;
    if (!q || !/^tac-/.test(q.kind)) return null;
    need(q.player === pid,'Nicht deine Auswahl');
    const chosen=(q.choices || []).find(c=> a.slot ? c.slot && c.slot.section === a.slot.section && c.slot.row === Number(a.slot.row) : c.target === a.target);
    need(chosen,'Ungültige taktische Auswahl');
    const p=this.player(pid);
    if (q.kind === 'tac-aura-section') {
      const l=this.findInst(q.uid); need(l && l.zone === 'support' && l.player.id === pid,'Banner fehlt');
      l.inst.flags.tacAuraSection=chosen.section; this.state.pending=null;
      this._log('Glaubensbanner: Infanterie in '+chosen.section+' erhält +1 DEF.'); return {ok:true};
    }
    if (q.kind === 'tac-discard') {
      const i=p.hand.findIndex(c=>c.uid === a.target); need(i>=0,'Keine eigene Handkarte');
      p.grave.push(p.hand.splice(i,1)[0]);
      this.state.pending=null; return {ok:true};
    }
    if (q.kind === 'tac-break') {
      const l=this.findInst(q.uid);
      need(l && this._tacCanBreak(l),'Gefechtsabbruch nicht mehr zulässig');
      need(this._tacAdjacent(l,true).some(s=>s.section === chosen.slot.section && s.row === chosen.slot.row),'Kein freies unmittelbares Nachbarfeld');
      this._spend(p,1); this._tacDepart(l.inst,false);
      p.front[l.section][l.row]=null; p.front[chosen.slot.section][chosen.slot.row]=l.inst;
      l.inst.flags.tacBreakUsedTurn=this.state.turn;
      l.inst.flags.tacNoAttackUntil=this.state.turn+1;
      this.state.pending=null; this._tacOnEntry(l.inst,chosen.slot.section,l.section);
      this._log('Gefechtsabbruch: '+this.defOf(l.inst).name+' verlegt; Angriff erst nach Ende des nächsten eigenen Zuges.');
      this._applyMech(p); this._applyFuehrung(p); this._applyFlankDef(p);
      return {ok:true};
    }
    const fresh=this._tacActivation(pid,q.uid), l=this.findInst(q.uid);
    if (q.kind === 'tac-cover-ally') {
      need(fresh.choices.some(c=>c.target === a.target),'Nachbar nicht mehr zulässig');
      const al=this.findInst(a.target), ts=this._tacTargets(al), own=this._tacTargets(l);
      this.state.pending=this._sealPending({kind:'tac-cover-target',player:pid,uid:q.uid,ally:a.target,choices:ts.filter(t=>own.some(x=>x.inst.uid === t.inst.uid)).map(t=>({target:t.inst.uid,label:this.defOf(t.inst).name}))});
      return {ok:true,need:'target'};
    }
    if (q.kind === 'tac-cover-target') {
      need(fresh.choices.some(c=>c.target === q.ally),'Nachbar nicht mehr zulässig');
      const al=this.findInst(q.ally), t=this.findInst(a.target);
      need(t && this._tacTargets(l).some(x=>x.inst.uid === a.target) && this._tacTargets(al).some(x=>x.inst.uid === a.target),'Kein gemeinsames legales Ziel');
      const ids=[l.inst.uid,al.inst.uid,t.inst.uid];
      this._spend(p,1); l.inst.flags.tacAttackSpentTurn=this.state.turn;
      l.inst.flags.tacCoverUsedTurn=this.state.turn;
      p.flags.tacCover={turn:this.state.turn,ids,positions:ids.map(id=>sig(this.findInst(id))),amount:Number((fx(this,l.inst,'TACTICAL_COVER').param || {}).amount || 2)};
      this._log('Feuerschutz 2 bereit: nächster Angriff des gewählten Nachbarn gegen genau dieses Ziel.');
    } else if (q.kind === 'tac-bind') {
      need(fresh.choices.some(c=>c.target === a.target),'Bindenziel nicht mehr zulässig');
      const t=this.findInst(a.target); this._spend(p,1);
      l.inst.flags.tacAttackSpentTurn=this.state.turn; p.flags.tacBindUsedTurn=this.state.turn;
      t.inst.flags.tacBoundUntil=this.state.turn+1;
      this._log('Binden: '+this.defOf(t.inst).name+' darf bis Ende seines nächsten Zuges das Feld nicht verlassen.');
    } else if (q.kind === 'tac-interdict') {
      need(fresh.choices.some(c=>c.target === a.target),'Abschnitt nicht mehr zulässig');
      this._spend(p,1); l.inst.flags.tacInterdictUsedTurn=this.state.turn;
      p.flags.tacInterdict={source:l.inst.uid,section:chosen.section,until:this.state.turn+1};
      this._log('Anmarschstörung in '+chosen.section+': nächster gegnerischer Einheiteneinsatz +1 AP.');
    }
    this.state.pending=null; return {ok:true};
  };
  P._tacEntryTax = function (p, inst, section) {
    this._tacCleanup();
    if (this.defOf(inst).typ !== 'Einheit') return 0;
    return this.state.players.some(o=>o.id !== p.id && o.flags.tacInterdict && o.flags.tacInterdict.section === section) ? 1 : 0;
  };
  P._tacConsumeEntry = function (p, inst, section) {
    if (this.defOf(inst).typ !== 'Einheit') return;
    this.state.players.filter(o=>o.id !== p.id && o.flags.tacInterdict && o.flags.tacInterdict.section === section).forEach(o=>{
      delete o.flags.tacInterdict; this._log('Anmarschstörung verbraucht: +1 AP für '+this.defOf(inst).name+'.');
    });
  };
  P._tacPayFreeEntry = function (p, inst, section) {
    const n=this._tacEntryTax(p,inst,section);
    if (p.ap < n) { this._log('Einheiteneinsatz in '+section+' wegen Anmarschstörung nicht bezahlbar.'); return false; }
    if (n) { this._spend(p,n); this._tacConsumeEntry(p,inst,section); }
    return true;
  };
  P._tacOnEntry = function (inst, section, fromSection) {
    if (!inst || !inst.facedown || fromSection === section || this.defOf(inst).typ !== 'Einheit') return;
    this.state.players.filter(p=>p.id !== inst.owner).forEach(p=>{
      p.flags=p.flags || {}; p.flags.tacScreen=p.flags.tacScreen || {};
      if (p.flags.tacScreen[section] === this.state.turn) return;
      const source=this.frontList(p).find(l=>l.section === section && !l.inst.facedown && fx(this,l.inst,'TACTICAL_SCREEN'));
      if (!source) return;
      p.flags.tacScreen[section]=this.state.turn;
      inst.flags.kwHidden=true; this._revealInst(inst,{source:'Vorpostenmeldung'});
      this._log('Vorpostenmeldung '+section+': eintretende gegnerische Einheit aufgedeckt. Eingraben bleibt bestehen.');
    });
  };
  P._tacCombatBegin = function (A,T) {
    this._tacCleanup();
    const p=this.player(A.owner), c=p.flags.tacCover;
    if (!c || c.ids[1] !== A.uid || c.ids[2] !== T.uid) return 0;
    delete p.flags.tacCover; return c.amount;
  };
  P._tacCanBreak = function (l) {
    return l && l.zone === 'front' && !l.inst.facedown && l.inst.def > 0 && this.state.active !== l.player.id && fx(this,l.inst,'TACTICAL_BREAK') && l.inst.flags.tacBreakUsedTurn !== this.state.turn && this._tacMayMove(l.inst) && l.player.ap >= 1 && this._tacAdjacent(l,true).length;
  };
  P._tacAfterCombat = function (attackerOwner, targetUid, wasOpen) {
    if (wasOpen === false) return;
    const l=this.findInst(targetUid);
    if (!l || l.player.id === attackerOwner || !this._tacCanBreak(l)) return;
    const q=this.state.tacAfterCombat || (this.state.tacAfterCombat=[]);
    if (!q.some(x=>x.uid === targetUid && x.turn === this.state.turn)) q.push({uid:targetUid,turn:this.state.turn});
  };
  P._tacBeforeAction = function (pid,a) {
    this._tacCleanup();
    const q=this.state.pending;
    if (q && /^tac-/.test(q.kind)) need(pid === q.player && ['CHOOSE_TARGET','CHOOSE_SLOT','RESOLVE_PENDING','CANCEL_PENDING'].includes(a.type),'Erst taktische Auswahl abschließen');
  };
  P._tacAfterAction = function () {
    this._tacCleanup();
    if (this.state.pending || this.state.winner != null || this.state.phase === 'gameover') return;
    const q=this.state.tacAfterCombat || [];
    while(q.length) {
      const r=q.shift(), l=this.findInst(r.uid);
      if (r.turn !== this.state.turn || !this._tacCanBreak(l)) continue;
      this.state.pending=this._sealPending({kind:'tac-break',player:l.player.id,uid:r.uid,choices:this._tacAdjacent(l,true).map(slot=>({slot,label:'1 AP → '+slot.section+(slot.row+1)}))}); break;
    }
  };
  P._tacApplyEffect = function (pid,e,source,targetUid) {
    const p=this.player(pid);
    if (e.code === 'DRAW_THEN_CHOOSE_DISCARD') {
      this._draw(p,Number((e.param || {}).draw || 2));
      if (p.hand.length) this.state.pending=this._sealPending({kind:'tac-discard',player:pid,choices:p.hand.map(c=>({target:c.uid,label:this.defOf(c).name}))});
      return true;
    }
    if (e.code === 'NO_MOVE_THIS_TURN') {
      const l=this.findInst(targetUid); if (l && l.zone === 'front') l.inst.flags.tacNoMoveTurn=this.state.turn;
      return true;
    }
    return false;
  };
  P._tacEffectTargetAllowed = function (def,target) {
    if (!(def.effects || []).some(e=>['MOVE_SLOTS','MOVE_FRONT','RETURN_TO_HAND','REPAIR_BOUNCE'].includes(e.code))) return true;
    const l=this.findInst(target); return !l || l.zone !== 'front' || this._tacMayMove(l.inst);
  };
  P._tacDefenseBonus = function (T) {
    let n=0;
    (T.attachments || []).forEach(eq=>{
      const e=fx(this,eq,'FIRST_DEFENSE_BONUS');
      if (e && eq.flags.tacDefenseUsedTurn !== this.state.turn) { eq.flags.tacDefenseUsedTurn=this.state.turn; n+=Number((e.param || {}).amount || 1); }
    });
    return n;
  };
  P.tacticalStatus = function (inst) {
    const f=inst.flags || {}, out=[];
    if (f.tacBoundUntil != null && this.state.turn<=f.tacBoundUntil) out.push('Gebunden: kein Versetzen, Tauschen oder Rücknehmen bis Ende des nächsten Besitzerzuges; Angriff bleibt erlaubt.');
    if (f.tacNoMoveTurn === this.state.turn) out.push('Bewegungsverbot bis Zugende (kein Angriffsverbot).');
    if (f.tacNoAttackUntil != null && this.state.turn<=f.tacNoAttackUntil) out.push('Gefechtsabbruch: Angriffsverbot bis Ende des nächsten eigenen Zuges.');
    if (f.tacAttackSpentTurn === this.state.turn) out.push('Angriff für taktische Fähigkeit verbraucht (kein tatsächlicher Angriff).');
    this.state.players.forEach(p=>{
      const c=p.flags.tacCover; if(c && c.ids.includes(inst.uid)) out.push('Feuerschutz '+c.amount+': gebundener nächster Kampf, endet bei Feld-/Sichtbarkeitswechsel oder Zugende.');
      const m=p.flags.tacInterdict; if(m && m.source === inst.uid) out.push('Anmarschstörung aktiv in '+m.section+' bis nächster gegnerischer Zug endet oder erster Einheiteneinsatz.');
    }); return out;
  };
  P._tacOnSupport = function (inst) {
    if (!fx(this,inst,'TACTICAL_SECTION_INF_DEF')) return;
    this.state.pending=this._sealPending({kind:'tac-aura-section',player:inst.owner,uid:inst.uid,choices:S.map(section=>({target:'sec:'+section,section,side:'own',label:section+' · eigene Infanterie +1 DEF'}))});
  };
  P._tacTargetAllowed = function (A,T) {
    if (!A || !T) return false;
    if (A.owner === T.owner || this.player(A.owner).flags.tacAnyAttackTurn === this.state.turn) return true;
    return !(T.attachments || []).some(eq=>fx(this,eq,'FIRST_ENEMY_ATTACK_TARGET_DENIED'));
  };
  P._tacSectionDamage = function (inst,amount) {
    if (!inst || amount<=0 || !isInf(this.defOf(inst)) || inst.flags.tacPrayerTurn === this.state.turn) return amount;
    const l=this.findInst(inst.uid); if (!l || l.zone !== 'front') return amount;
    const protectedHere=this.frontList(l.player).some(src=>src.section === l.section && (src.inst.attachments || []).some(eq=>fx(this,eq,'SECTION_INF_FIRST_POINT_PER_TURN')));
    if (!protectedHere) return amount;
    inst.flags.tacPrayerTurn=this.state.turn; return Math.max(0,amount-1);
  };
  g.DC_TACTICAL_RUNTIME = true;
})(window);
