/**
 * Idempotente Redaktion: ein taktisches Wort entspricht genau einem Effektcode.
 * Keine Zuordnung nur nach Namen oder ähnlich klingendem Text.
 * Export: `migrate`.
 */
'use strict';
/* Idempotente, eng gefasste Redaktion: ein Wort = ein bestehender Effektcode.
   Keine Zuordnung nach bloßen Namen oder militärisch ähnlichen Texten. */
const REMINDERS = {
  'Absetzen': 'Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.',
  'Erstschadenschutz': 'Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.'
};
const EXCLUDED = new Set(['dc_b_feldaltar_138', 'dc_b_kettengebet_141', 'dc_b_wachsiegel_647']);
/**
 * Führt die idempotente taktische Migration auf einer Kartendefinition aus.
 */
function migrate(c) {
  const fx = c.effects || [], has = k => fx.some(e => e.code === k);
  const add = (word, pattern) => {
    c.keywords = Array.from(new Set((c.keywords || []).concat(word)));
    if (pattern) c.text = (c.text || '').replace(pattern, '').replace(/\s+/g, ' ').trim();
    const r = word + ' (' + REMINDERS[word] + ')';
    c.rules = c.rules || []; if (!c.rules.includes(r)) c.rules.push(r);
  };
  if (has('RELOCATE_HIDE')) add('Absetzen', /Nach (?:jedem eigenen Angriff verdeckt bis zu deinem nächsten Zug|dem Angriff bis zum nächsten eigenen Zug verdeckt|Angriff verdeckt bis zum nächsten eigenen Zug)\./g);
  if (has('EQUIP_IGNORE_FIRST_DAMAGE') && !EXCLUDED.has(c.id)) add('Erstschadenschutz', /Der erste Schaden am Träger wird ignoriert \(einmalig\)\./g);
  for (const e of fx) {
    const p = e.param || {};
    if (e.code === 'EQUIP_NEGATE_DAMAGE') {
      const n = Number(p.amount || p.negate || 1), s = 'Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu ' + n + ' verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.';
      c.text = (c.text || '').replace(/Einmalig: verhindere \d+ Schaden am Träger\.|einmalig negiere \d+ Schaden\./g, s);
      c.rules = (c.rules || []).map(r => /^Einmalig: Erleidet der Träger erstmals Schaden,/.test(r) ? s : r);
    }
    if (e.code === 'TURN_DRAW') {
      const n = Number(p.n || 1), s = 'Zu Beginn jedes deiner Züge: Ziehe ' + n + ' zusätzliche Karte' + (n === 1 ? '' : 'n') + ', solange diese Unterstützung liegt. Das Handlimit gilt unverändert.';
      c.text = (c.text || '').replace(/Zugbeginn: eine zusätzliche Karte ziehen\.|Zu Beginn deines Zuges: ziehe \d+ zusätzliche Karte[n]?\./g, s);
      c.rules = (c.rules || []).map(r => /^Zu Beginn jedes deiner Züge ziehst du/.test(r) ? s : r);
    }
    if (e.code === 'ON_DESTROY_DRAW') {
      const n = Number(p.draw || 1), s = 'Wird der Träger zerstört, ziehst du ' + n + ' Karte' + (n === 1 ? '' : 'n') + '.';
      c.text = (c.text || '').replace(/(?:Träger stirbt: ziehe \d+|Wenn Träger zerstört wird: ziehe \d+ Karte[n]?|Bei Zerstörung: ziehe \d+|Wird der Träger zerstört: ziehe \d+)\./g, s);
    }
  }
  // Konkrete gedruckte Versprechen; keine neue Bedeutung der allgemeinen Wörter.
  if (c.id === 'dc_b_notdepot_643') c.effects = [{code:'DRAW_THEN_CHOOSE_DISCARD',param:{draw:2,discard:1}}];
  if (c.id === 'dc_b_filterpatrone_410') c.effects = [{code:'FIRST_DEFENSE_BONUS',param:{amount:1}}];
  if (c.id === 'dc_b_verlegung_210') c.effects = [{code:'MOVE_SLOTS',param:{slots:2,count:1}}];
  if (['dc_b_aktenbefehl_887','dc_b_tausch_945'].includes(c.id)) c.effects = fx.map(e => e.code === 'OUT_OF_COMBAT' ? {code:'NO_MOVE_THIS_TURN',param:{}} : e);
  if (['dc_au_sturmleitern','dc_b_sturmleitern_133'].includes(c.id)) c.effects = fx.map(e => e.code === 'CARRIER_FIRST_ATTACK_ATK' ? {code:'FIRST_ATTACK_EACH_TURN',param:Object.assign({},e.param || {atk:1},c.id === 'dc_b_sturmleitern_133' ? {attachmentTurnOnly:true} : {})} : e);
  if (c.id === 'dc_b_feldaltar_138') c.effects=[{code:'FIRST_ENEMY_ATTACK_TARGET_DENIED',param:{}}];
  if (c.id === 'dc_b_kettengebet_141') c.effects=[{code:'SECTION_INF_FIRST_POINT_PER_TURN',param:{amount:1}}];
  if (c.id === 'dc_b_wachsiegel_647') c.effects=[{code:'EQUIP_STAT',param:{def:1}},{code:'EQUIP_IGNORE_FIRST_DAMAGE',param:{afterAtk:-1}}];
  if (c.id === 'dc_b_glaubensbanner_113') c.effects=[{code:'TACTICAL_SECTION_INF_DEF',param:{amount:1}}];
  return c;
}
module.exports = {migrate, REMINDERS, EXCLUDED};
