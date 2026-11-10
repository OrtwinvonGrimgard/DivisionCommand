"""t212: Übersetzt bisher nicht implementierte Fähigkeitstexte (Text ohne Effektcode) in die
allgemeine Engine-Mechanik CM bzw. vorhandene Schlüsselwörter/Codes und erzeugt dazu einen
präzisen Kartentext, der genau das Implementierte beschreibt. Nicht abbildbare Teilsätze werden
nicht stillschweigend gelöscht, sondern als 'dropped' protokolliert (KARTENPRUEFUNG.md)."""
import re

def clean(t):
    """Normalisiert einen Kartentext (Whitespace, Bindestriche) vor dem Parsen."""
    t = re.sub(r'\s*\[[^\]]*\]', '', t or '')
    t = re.sub(r'\s*\((?:[^()]*?)\)', lambda m: '' if not re.search(r'min|mind|einmal', m.group(0), re.I) else m.group(0), t)
    return re.sub(r'\s+', ' ', t).strip()

SUB = [  # Bedingungsphrase -> when-Code
    (r'(?:du )?(?:in )?diese[mn] zug (?:schon |bereits )?(?:eine |einen )?infanterie gespielt (?:hast|wurde)|(?:in )?diese[mn] zug (?:schon )?eine eigene infanterie gespielt wurde|du in diese[mn] zug infanterie gespielt hast', 'played:Infanterie'),
    (r'(?:du )?(?:in )?diese[mn] zug (?:schon |bereits )?(?:eine )?einheit gespielt hast', 'played:Einheit'),
    (r'(?:du )?(?:in )?diese[mn] zug (?:schon )?artillerie gespielt hast', 'played:Artillerie'),
    (r'(?:du )?(?:in )?diese[mn] zug (?:eine |einen )?(?:sofort(?:karte|einsatz)?(?:-karte)?|soforteinsatz)(?: diesen zug)? (?:gespielt hast|spielst|spieltest)|du soforteinsatz (?:diesen zug )?spieltest|nach soforteinsatz diesen zug|du diesen zug sofort spielst|im zug, in dem sofort gespielt wurde', 'played:Soforteinsatz'),
    (r'(?:du )?(?:in )?diese[mn] zug ausrüstung gespielt hast', 'played:Ausrüstung'),
    (r'(?:du )?(?:in )?diese[mn] zug (?:eine |einen )?(?:unterstützung|erlass/unterstützung) gespielt hast', 'played:Unterstützung'),
    (r'infanterie und unterstützung (?:angrenzen|im abschnitt)', 'adj:infanterie&support'),
    (r'infanterie und artillerie im abschnitt', 'adj:infanterie&unit:artillerie'),
    (r'in abschnitten mit unterstützung|unterstützung (?:im spiel|liegt|im abschnitt)|im abschnitt eine unterstützung liegt|abschnitten mit eigener unterstützung|eigener? unterstützung|bei unterstützung', 'support'),
    (r'im abschnitt keine unterstützung liegt|keine andere unterstützung', 'nosupport'),
    (r'aufklärung (?:im spiel|angrenzt)', 'unit:aufklaerung'),
    (r'eigene panzer- oder artillerieeinheit im spiel', 'unit:panzer_art'),
    (r'ausrüstung im (?:spiel|abschnitt)', 'gear'),
    (r'eigene infanterie angrenzt|infanterie im abschnitt|eine eigene infanterie im abschnitt liegt', 'adj:infanterie'),
    (r'zwei eigene einheiten angrenzen|mindestens eine andere eigene einheit im abschnitt steht|du in diesem abschnitt mindestens zwei einheiten hast|im abschnitt eine zweite eigene einheit steht|mindestens zwei einheiten im abschnitt|2\+ eigene einheiten im abschnitt', 'pair'),
    (r'(?:sie )?allein (?:im abschnitt|steht|stehen)', 'alone'),
    (r'der gegner in diesem abschnitt mehr einheiten hat', 'outnumbered'),
    (r'beschädigt(?: ist)?', 'damaged'),
    (r'(?:sie )?(?:eine )?ausrüstung trägt|mit ausrüstung|ausrüstung getragen', 'equipped'),
    (r'(?:sie |du )?diesen zug nicht bewegt (?:wurde|hast)|im zug ohne bewegung|sie ruht|ruhende?|unbewegt', 'still'),
    (r'sie diesen zug (?:geschoben|bewegt) wurde', 'moved'),
    (r'sie im letzten zug nicht (?:angegriffen hat|angriff)|sie diesen zug nicht angreift', 'rested'),
    (r'in diesem zug eigene einheit zerstört|du diesen zug eine einheit verloren hast|in diese[mn] zug eine eigene infanterie zerstört wurde', 'lost'),
    (r'du bereits 2\+ einheiten verloren hast', 'losses:2'),
    (r'du diesen zug aufgedeckt hast|nach aufdecken eines feindes diesen zug', 'revealed'),
    (r'feind (?:im abschnitt )?(?:aufgeklärt|beobachtet) ist|ein feind im abschnitt aufgeklärt ist|eine feindliche einheit im abschnitt beobachtet ist|aufgeklärte?m? feind im spiel|feind aufgeklärt', 'observed'),
    (r'du diesen zug schaden erlitten hast', 'hurt'),
    (r'(?:bei )?heilung in diese[mn] zug|du diesen zug heilst', 'healed'),
    (r'(?:bei )?2\+ abschnitten mit eigenen einheiten', 'sections:2'),
]
VS = [
    (r'(?:beschädigte|verwundete) ziele', 'damaged'),
    (r'(?:einheiten|ziele), die (?:in )?diese[mn] zug (?:bereits )?schaden (?:genommen haben|nahmen|erlitten haben)', 'hit'),
    (r'(?:aufgeklärte|beobachtete)(?: ziele| feinde| einheiten| einheit)?|eine beobachtete einheit|ziel beobachtet ist', 'observed'),
    (r'(?:eine )?(?:einheit|einheiten), die (?:in )?diese[mn] zug einrück(?:t|en)|einrückende(?: einheiten| ziele)?|einrückendes ziel', 'entering'),
    (r'ein ziel, das in diese[mn] zug noch nicht angegriffen wurde', 'fresh'),
    (r'gepanzerte ziele', 'armored'),
    (r'feinde ohne angrenzende eigene einheit des gegners|isolierte ziele', 'isolated'),
]
WHEN_TXT = {
    'played:Infanterie': 'wenn du in diesem Zug Infanterie gespielt hast',
    'played:Einheit': 'wenn du in diesem Zug schon eine Einheit gespielt hast',
    'played:Artillerie': 'wenn du in diesem Zug Artillerie gespielt hast',
    'played:Soforteinsatz': 'wenn du in diesem Zug einen Soforteinsatz gespielt hast',
    'played:Ausrüstung': 'wenn du in diesem Zug Ausrüstung gespielt hast',
    'played:Unterstützung': 'wenn du in diesem Zug eine Unterstützung gespielt hast',
    'support': 'solange du eine offene Unterstützung hast',
    'adj:infanterie&support': 'solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast',
    'adj:infanterie&unit:artillerie': 'solange eigene Infanterie benachbart ist und eigene Artillerie steht',
    'nosupport': 'solange du keine Unterstützung hast',
    'unit:aufklaerung': 'solange eine eigene Aufklärung an der Front steht',
    'unit:panzer_art': 'solange ein eigener Panzer oder eine eigene Artillerie steht',
    'gear': 'solange eine eigene Einheit Ausrüstung trägt',
    'adj:infanterie': 'solange eigene Infanterie benachbart ist',
    'unit:infanterie': 'solange eigene Infanterie an der Front steht',
    'unit:': 'solange eine andere eigene Einheit an der Front steht',
    'unit:infanterie&support': 'solange eigene Infanterie an der Front steht und du eine offene Unterstützung hast',
    'unit:artillerie': 'solange eigene Artillerie steht',
    'pair': 'solange eine weitere eigene Einheit im Abschnitt steht',
    'alone': 'solange sie allein im Abschnitt steht',
    'outnumbered': 'solange der Gegner im Abschnitt mehr Einheiten hat',
    'damaged': 'solange sie beschädigt ist',
    'equipped': 'solange sie Ausrüstung trägt',
    'still': 'wenn sie seit deinem letzten Zug nicht versetzt wurde',
    'moved': 'wenn sie in diesem Zug versetzt wurde',
    'rested': 'wenn sie in deinem letzten Zug nicht angegriffen hat',
    'lost': 'wenn in diesem Zug eine eigene Einheit zerstört wurde',
    'losses:2': 'wenn schon 2 eigene Einheiten zerstört wurden',
    'revealed': 'wenn du in diesem Zug aufgedeckt hast',
    'observed': 'solange eine gegnerische Einheit beobachtet ist',
    'hurt': 'wenn sie in diesem Zug Schaden erlitten hat',
    'healed': 'wenn du in diesem Zug geheilt hast',
    'sections:2': 'wenn du in 2+ Abschnitten Einheiten hast',
}
VS_TXT = {'damaged': 'beschädigte Ziele', 'hit': 'Ziele, die in diesem Zug Schaden erlitten haben', 'observed': 'beobachtete Ziele',
          'entering': 'Einheiten, die seit dem letzten Zug eingerückt sind', 'fresh': 'Ziele, die in diesem Zug noch nicht angegriffen wurden', 'armored': 'gepanzerte Ziele', 'isolated': 'Ziele ohne benachbarte Einheit ihres Besitzers'}
FILTER_TXT = {None: 'eigene Einheiten', 'infanterie': 'eigene Infanterie', 'artillerie': 'eigene Artillerie', 'panzer': 'eigene Panzer'}

def match_table(s, table):
    """Sucht den ersten passenden Eintrag einer Übersetzungstabelle."""
    for rx, code in table:
        if re.fullmatch(r'(?:' + rx + r')', s): return code
    for rx, code in table:
        if re.search(rx, s): return code
    return None

def num(x):
    """Parst eine ganze Zahl aus einem Textfragment."""
    return int(x.replace('−', '-').replace('–', '-'))

def stat_txt(a, d):
    """Formatiert ein ATK/DEF-Paar als kurzen Kartentext."""
    parts = []
    if a: parts.append(('+' if a > 0 else '') + str(a) + ' ATK')
    if d: parts.append(('+' if d > 0 else '') + str(d) + ' DEF')
    return ' und '.join(parts)

STAT = r'([+\-−]\d)\s*atk(?:\s*(?:und|/)\s*([+\-−]\d)\s*def)?|([+\-−]\d)\s*def'

def parse_stat(s):
    """Parst ein ATK/DEF-Paar aus einem Klauseltext."""
    m = re.match(r'^(?:' + STAT + r')', s)
    if not m: return None
    if m.group(3): return 0, num(m.group(3)), s[m.end():]
    return num(m.group(1)), num(m.group(2)) if m.group(2) else 0, s[m.end():]

def clause(c, card, out):
    """Hängt Effekte an out an und gibt Kurztext zurück, oder None (nicht abbildbar)."""
    s = c.lower().strip(' .;:')
    s = s.replace('–', '-').replace('mind. 1', 'min. 1').replace('mindestens 1', 'min. 1')
    sup = card['typ'] == 'Unterstützung'
    E = lambda **p: out['fx'].append({'code': 'CM', 'param': p})
    if re.fullmatch(r'keine sonderfähigkeit', s): return ''
    if re.fullmatch(r'kann jeden (?:gegnerischen )?frontabschnitt angreifen', s):
        out['fx'].append({'code': 'ATTACK_ANY_FRONT'}); return 'Indirektes Feuer: darf jede gegnerische Fronteinheit angreifen.'
    # Schlüsselwörter (allgemeines Vokabular)
    if re.fullmatch(r'(?:einmal/zug: )?schiebe diese einheit um 1 slot|darf einmal/zug um 1 slot geschoben werden(?: \(zusätzlich\))?', s):
        out['kw'].append('Stellungswechsel'); return ''
    if re.fullmatch(r'beim ausspielen: ziehe 1(?: karte)?', s): out['kw'].append('Zuteilung'); return ''
    if re.fullmatch(r'(?:kann verdeckt gespielt werden|verdeckt spielbar)', s): return ''
    m = re.fullmatch(r'(?:aufdecken|aufgedeckt): \+(\d) atk(?: bis zugende| diesen zug)?(?:; erleide 1 schaden)?', s)
    if m: E(k='first', atk=int(m.group(1))); return f'Ihr erster Angriff hat +{m.group(1)} ATK.'
    # Einheit selbst: Werte mit Bedingung
    if not sup:
        st = parse_stat(s)
        if st:
            a, d, rest = st; rest = rest.strip(' ,:')
            if rest in ('', 'dauerhaft'):
                out['print'][0] += a; out['print'][1] += d; return ''
            m = re.match(r'^(?:,\s*)?(?:wenn|solange|bei|mit|an|im|nach|in)\s+(.*)$', rest)
            if m:
                w = match_table(m.group(1), SUB)
                if not w and rest.startswith('mit '): w = match_table(rest, SUB)
                if not w and re.match(r'im zug ohne bewegung', rest): w = 'still'
                if w:
                    E(k='stat', atk=a, **({'def': d} if d else {}), when=w); return stat_txt(a, d) + ', ' + WHEN_TXT[w] + '.'
            m = re.match(r'^gegen\s+(.*)$', rest)
            if m and a and not d:
                v = match_table(m.group(1), VS)
                if v: E(k='vs', atk=a, vs=v); return stat_txt(a, 0) + ' gegen ' + VS_TXT[v] + '.'
            if re.match(r'^gegen den ersten angriff/zug', rest) and d and not a:
                E(k='negate', n=d); return 'Der erste Schaden, den sie in jedem Zug erleidet, sinkt um ' + str(d) + '.'
            m = re.match(r'^im ersten angriff(?: nach dem ausspielen)?', rest)
            if m and a: E(k='first', atk=a); return 'Ihr erster Angriff nach dem Ausspielen hat +' + str(a) + ' ATK.'
            if re.match(r'^bis zugende', rest): return None
        m = re.fullmatch(r'(?:wenn|solange) (.*?): ' + r'(?:' + STAT + r')', s)
        if m:
            w = match_table(m.group(1), SUB)
            st = parse_stat(s[s.index(': ') + 2:])
            if w and st: a, d, _ = st; E(k='stat', atk=a, **({'def': d} if d else {}), when=w); return stat_txt(a, d) + ', ' + WHEN_TXT[w] + '.'
        m = re.fullmatch(r'der erste angriff nach dem ausspielen hat \+(\d) atk', s)
        if m: E(k='first', atk=int(m.group(1))); return 'Ihr erster Angriff nach dem Ausspielen hat +' + m.group(1) + ' ATK.'
        m = re.fullmatch(r'kostet (\d) (?:ap )?weniger,? (?:wenn|bei|mit|nach) (.*?)(?: \(min\. 1\))?', s)
        if m:
            w = match_table(m.group(2), SUB)
            w = {'adj:infanterie': 'unit:infanterie', 'pair': 'unit:', 'adj:infanterie&support': 'unit:infanterie&support'}.get(w, w)
            if w in ('alone', 'damaged', 'equipped', 'still', 'moved', 'rested', 'hurt', 'outnumbered'): w = None
            if w: E(k='cost', delta=-int(m.group(1)), when=w); return 'Kostet ' + m.group(1) + ' AP weniger (mind. 1), ' + WHEN_TXT[w] + '.'
        m = re.fullmatch(r'beim ausspielen: heile (?:eine eigene infanterie um )?(\d)(?: def)?(?: (?:an|verteilt auf) .*)?', s) or re.fullmatch(r'beim ausspielen: heile eine eigene infanterie um (\d)', s)
        if m: E(k='enter', do='heal', n=int(m.group(1))); return 'Beim Ausspielen: heile ' + m.group(1) + ' DEF an deiner am stärksten beschädigten Einheit.'
        if re.fullmatch(r'(?:beim ausspielen: )?(?:decke (?:1|eine einheit|feind) auf|feind aufdecken|decke auf)', s):
            E(k='enter', do='reveal', n=1); return 'Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.'
        if re.fullmatch(r'(?:bei kill|zerstörst du (?:einen )?feind)(?::)? ziehe 1(?: karte)?', s):
            E(k='kill', do='draw', n=1); return 'Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.'
        if re.fullmatch(r'(?:bei kill|zerstörst du (?:einen )?feind): heile 1(?: an eigener einheit)?', s):
            E(k='kill', do='heal', n=1); return 'Zerstört sie im Angriff eine Einheit: heile 1 DEF an einer eigenen Einheit.'
        if re.fullmatch(r'(?:wenn (?:diese einheit )?(?:stirbt|zerstört wird|zerstört)|wird zerstört)(?::|,)? ziehe 1(?: karte)?', s):
            E(k='death', do='draw', n=1); return 'Wird sie zerstört: ziehe 1 Karte.'
        m = re.fullmatch(r'wenn diese einheit stirbt: ziehe 1, falls (.*)', s)
        if m and match_table(m.group(1), SUB):
            w = match_table(m.group(1), SUB); E(k='death', do='draw', n=1, when=w); return 'Wird sie zerstört: ziehe 1 Karte, ' + WHEN_TXT[w] + '.'
        m = re.fullmatch(r'(?:eigene infanterie|einheiten|eigene einheiten) (?:im abschnitt|hier) (?:hat |haben )?' + r'(?:' + STAT + r')' + r'(?:,? (?:wenn|solange) (.*))?', s)
        if m:
            st = parse_stat(re.sub(r'^.*?(?:im abschnitt|hier) (?:hat |haben )?', '', s)); a, d, _ = st
            f = 'infanterie' if s.startswith('eigene infanterie') else None
            w = match_table(m.group(4), SUB) if m.group(4) else None
            if m.group(4) and not w: return None
            p = dict(k='aura', scope='section', atk=a, **({'def': d} if d else {}))
            if f: p['filter'] = f
            if w: p['when'] = w; p['self'] = True
            E(**p); return 'Andere ' + FILTER_TXT[f] + ' in ihrem Abschnitt: ' + stat_txt(a, d) + (', ' + WHEN_TXT[w].replace('sie ', 'diese Einheit ') if w else '') + '.'
        m = re.fullmatch(r'benachbarte eigene einheiten \+(\d) def(?:,? wenn (.*))?', s)
        if m:
            w = match_table(m.group(2), SUB) if m.group(2) else None
            if m.group(2) and not w: return None
            p = dict(k='aura', scope='adjacent', **{'def': int(m.group(1))})
            if w: p['when'] = w; p['self'] = True
            E(**p); return 'Benachbarte eigene Einheiten +' + m.group(1) + ' DEF' + (', ' + WHEN_TXT[w].replace('sie ', 'diese Einheit ') if w else '') + '.'
        if re.fullmatch(r'(?:ziehe 1 bei kill|bei kill: ?ziehe 1)', s): E(k='kill', do='draw', n=1); return 'Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.'
        if re.fullmatch(r'bei kill(?::)? (?:aufdecken|decke 1 auf)', s): E(k='kill', do='reveal', n=1); return 'Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.'
        if re.fullmatch(r'(?:einmal/zug: )?decke (?:1 )?auf|decke feind auf|feind aufgeklärt|einmal/zug: decke eine gegnerische einheit auf', s):
            E(k='enter', do='reveal', n=1); out['ctx'] = 'enter'; return 'Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.'
        if re.fullmatch(r'ziehe 1', s) and out.get('ctx') == 'enter':
            E(k='enter', do='draw', n=1); return 'Beim Ausspielen: ziehe 1 Karte.'
        if re.fullmatch(r'schaue oberste (?:\d|karte).*', s):
            out['kw'].append('Zuteilung'); return ''
        if re.fullmatch(r'träger \+(\d) def', s): out['print'][1] += int(re.findall(r'\d', s)[0]); return ''
        if re.fullmatch(r'\+(\d) atk gegen ein gewähltes ziel', s):
            n = re.findall(r'\d', s)[0]; E(k='first', atk=int(n)); return 'Ihr erster Angriff nach dem Ausspielen hat +' + n + ' ATK.'
        m = re.fullmatch(r'einmal/zug: wenn (.*?) → ' + r'(?:' + STAT + r')', s)
        if m:
            w = match_table(m.group(1), SUB); st = parse_stat(s.split('→ ')[1])
            if w and st: a, d, _ = st; E(k='stat', atk=a, **({'def': d} if d else {}), when=w); return stat_txt(a, d) + ', ' + WHEN_TXT[w] + '.'
    # beide Typen
    m = re.fullmatch(r'(?:einmal/zug: )?negiere 1 schaden(?: an einer einheit hier)?(?: einmal/zug)?(?:,? wenn (.*))?', s)
    if m:
        w = match_table(m.group(1), SUB) if m.group(1) else None
        if m.group(1) and not w: return None
        p = dict(k='negate', n=1)
        if w: p['when'] = w
        if sup: p['scope'] = 'section'
        E(**p); return ('Eigene Einheiten im gewählten Abschnitt: ' if sup else '') + 'Der erste Schaden je Zug sinkt um 1' + (', ' + WHEN_TXT[w] if w else '') + '.'
    m = re.fullmatch(r'(?:einmal/zug: )?(?:wenn (?:eine )?eigene einheit (?:stirbt|zerstört wird)|eigene einheit stirbt|wenn eine eigene einheit zerstört wird)(?::|,)? ziehe 1(?: karte)?(?: \(einmal/zug\))?', s)
    if m: E(k='trigger', on='own_destroyed', do='draw', n=1); return 'Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte.'
    m = re.fullmatch(r'wenn eine eigene einheit im selben abschnitt zerstört wird: ziehe 1(?: karte)?', s)
    if m and not sup: E(k='trigger', on='own_destroyed', do='draw', n=1, scope='section'); return 'Einmal pro Zug, wenn eine andere eigene Einheit in ihrem Abschnitt zerstört wird: ziehe 1 Karte.'
    m = re.fullmatch(r'(?:einmal/zug: )?(?:wenn (.*?): ziehe 1|ziehe 1,? wenn (.*?))(?: \(einmal/zug\))?', s)
    if m:
        w = match_table(m.group(1) or m.group(2), SUB)
        if w and (w.startswith('played:') or w in ('revealed', 'healed', 'lost', 'sections:2', 'support', 'observed')):
            E(k='trigger', on='played', do='draw', n=1, when=w); return 'Einmal pro Zug: ziehe 1 Karte, ' + WHEN_TXT[w].replace('wenn du in diesem Zug schon', 'sobald du in diesem Zug').replace('wenn du in diesem Zug', 'sobald du in diesem Zug') + '.'
    if sup:
        m = re.fullmatch(r'(?:eigene )?(infanterie|einheiten)(?: (?:hier|im abschnitt|in diesem abschnitt))? (?:hat |haben )?' + r'(?:' + STAT + r')' + r'(?:,? (?:wenn|solange) (.*?)|( im zug ohne bewegung))?', s)
        if m:
            st = parse_stat(re.sub(r'^.*?(?:infanterie|einheiten)(?: (?:hier|im abschnitt|in diesem abschnitt))? (?:hat |haben )?', '', s)); a, d, _ = st
            f = 'infanterie' if m.group(1) == 'infanterie' else None
            ws = m.group(5) or (m.group(6) and 'im zug ohne bewegung')
            w = match_table(ws.strip(), SUB) if ws else None
            if ws and not w: return None
            p = dict(k='aura', scope='section', atk=a, **({'def': d} if d else {}))
            if f: p['filter'] = f
            if w: p['when'] = w
            E(**p); return 'Wähle beim Ausspielen einen Abschnitt: ' + FILTER_TXT[f] + ' dort ' + stat_txt(a, d) + (', ' + WHEN_TXT[w].replace('sie ', 'die Einheit ') if w else '') + '.'
        m = re.fullmatch(r'(?:eigene )?(?:infanterie|einheiten)(?: hier| im abschnitt)? \+(\d) atk gegen (.*)', s)
        if m:
            v = match_table(m.group(2), VS)
            if v: E(k='aura', scope='section', vs=v, vsAtk=int(m.group(1)), **({'filter': 'infanterie'} if s.startswith(('infanterie', 'eigene infanterie')) else {})); return 'Wähle beim Ausspielen einen Abschnitt: ' + ('eigene Infanterie' if 'infanterie' in s[:20] else 'eigene Einheiten') + ' dort +' + m.group(1) + ' ATK gegen ' + VS_TXT[v] + '.'
        m = re.fullmatch(r'beschädigte eigene einheiten haben \+(\d) atk', s)
        if m: E(k='aura', scope='all', atk=int(m.group(1)), when='damaged'); return 'Beschädigte eigene Einheiten +' + m.group(1) + ' ATK.'
        m = re.fullmatch(r'einheiten mit ausrüstung \+(\d) def', s)
        if m: E(k='aura', scope='all', **{'def': int(m.group(1))}, when='equipped'); return 'Eigene Einheiten mit Ausrüstung +' + m.group(1) + ' DEF.'
        m = re.fullmatch(r'(?:einmal/zug: |einmal pro zug: )?(?:eigene einheit (?:im abschnitt )?heilt 1|heile 1(?: def)?)', s)
        if m: E(k='turnheal', n=1, **({'scope': 'section'} if 'abschnitt' in s else {})); return 'Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit' + (' im gewählten Abschnitt' if 'abschnitt' in s else '') + '.'
        if re.fullmatch(r'(?:einmal/zug: )?decke (?:1|feind im abschnitt) auf', s):
            E(k='turn', do='reveal', n=1); return 'Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.'
        m = re.fullmatch(r'(?:einmal pro zug: )?heile 1 def an einem eigenen panzer oder fahrzeug', s)
        if m: E(k='turnheal', n=1); return 'Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.'
        m = re.fullmatch(r'einheiten im abschnitt heilen 1 am zugende wenn sie nicht angriffen|ruhende einheiten im abschnitt \+1 def', s)
        if m and 'heilen' in s: E(k='turnheal', n=1, scope='section', when='rested'); return 'Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit im gewählten Abschnitt, die in deinem letzten Zug nicht angegriffen hat.'
        m = re.fullmatch(r'(?:einheiten kosten dich 1 ap weniger.*|einheiten in diesem abschnitt kosten 1 weniger.*|einheiten, die diesen zug hier gespielt werden, kosten 1 weniger.*|einmal/zug: einheit hier gespielt kostet 1 weniger.*|einmal pro zug: (?:eine )?infanterie aus der hand kostet 1 weniger.*|infanterie in diesem abschnitt kostet 1 weniger.*|aufklärung kostet 1 weniger.*)', s)
        if m:
            f = 'infanterie' if 'infanterie' in s else ('aufklaerung' if s.startswith('aufklärung') else None)
            once = not s.startswith(('einheiten kosten dich', 'aufklärung kostet'))
            E(k='discount', delta=-1, once=once, **({'filter': f} if f else {}))
            what = {'infanterie': 'Infanterie', 'aufklaerung': 'Aufklärung', None: 'Einheit'}[f]
            return ('Einmal pro Zug: deine nächste ' + what + ' kostet 1 AP weniger (mind. 1).') if once else ('Deine ' + ('Einheiten' if not f else what) + ' kosten 1 AP weniger (mind. 1).')
    return None

def translate(card):
    """-> dict(fx, kw, print, text, dropped, parsed) für Karten mit Text ohne Effektcode."""
    t = clean(card.get('text') or '')
    out = {'fx': [], 'kw': [], 'print': [0, 0], 'ctx': None}
    t = re.sub(r'\b(mind?)\. ', r'\1§ ', t)
    parts = [p.strip().replace('§', '.') for p in re.split(r'(?<=[.;])\s+|;\s*', t) if p.strip()]
    # "X ODER Y": nur erste Option ist ohne Wahl-UI abbildbar
    texts, dropped = [], []
    for p in parts:
        alt = re.split(r'\s+ODER\s+', p)
        r = None; n0 = (len(out['fx']), len(out['kw']), list(out['print']))
        try: r = clause(alt[0], card, out)
        except Exception: r = None
        if r is None:
            del out['fx'][n0[0]:]; del out['kw'][n0[1]:]; out['print'] = list(n0[2])
            try: r = clause2(alt[0], card, out)
            except Exception: r = None
        if r is None:
            del out['fx'][n0[0]:]; del out['kw'][n0[1]:]; out['print'] = n0[2]
        if r is None and len(alt) > 1:
            dropped.append(p); continue
        if r is None: dropped.append(p); continue
        if len(alt) > 1: dropped.append('ODER ' + ' ODER '.join(alt[1:]))
        if r: texts.append(r)
    res = dict(fx=out['fx'], kw=out['kw'], print=out['print'], text=' '.join(texts), dropped=dropped, parsed=len(parts) - len([d for d in dropped if not d.startswith('ODER')]), total=len(parts), mode='voll' if not dropped else 'teilweise')
    vanilla = re.fullmatch(r'keine sonderfähigkeit\.?', t.lower() or '') is not None
    if not vanilla and not res['fx'] and not res['kw'] and res['print'] == [0, 0]:
        fx, kw, txt = fallback(card)
        res.update(fx=fx, kw=kw, text=txt, mode='ersetzt')
    elif not vanilla and not res['fx'] and not res['kw'] and dropped:
        fx, kw, txt = fallback(dict(card, text=' '.join(dropped)))
        res.update(fx=fx, kw=kw, text=txt, mode='teilweise+ersetzt')
    if vanilla: res['mode'] = 'vanilla'
    return res

def clause2(c, card, out):
    """Zweite Übersetzungsstufe einer Klausel, falls die erste nicht greift."""
    s = c.lower().strip(' .;:').replace('–', '-')
    sup = card['typ'] == 'Unterstützung'
    E = lambda **p: out['fx'].append({'code': 'CM', 'param': p})
    if not sup:
        m = re.fullmatch(r'(?:beim angriff|nach (?:ihrem )?angriff): ziel [−-]1 atk(?: bis zugende)?', s)
        if m: E(k='hitdebuff', atk=-1); return 'Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.'
        m = re.fullmatch(r'beim ausspielen: (\d) schaden an (?:einer|bis zu zwei) gegnerischen einheit(?:en)? im abschnitt', s)
        if m: E(k='enter', do='strike', n=int(m.group(1))); return 'Beim Ausspielen: ' + m.group(1) + ' Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt.'
        m = re.fullmatch(r'\+(\d) atk,? wenn ziel (?:bereits schaden hat|beschädigt ist)', s)
        if m: E(k='vs', atk=int(m.group(1)), vs='damaged'); return '+' + m.group(1) + ' ATK gegen beschädigte Ziele.'
        m = re.fullmatch(r'\+(\d) atk,? wenn ziel (?:beobachtet|aufgeklärt)(?: ist)?', s)
        if m: E(k='vs', atk=int(m.group(1)), vs='observed'); return '+' + m.group(1) + ' ATK gegen beobachtete Ziele.'
        m = re.fullmatch(r'\+(\d) atk gegen ziele ohne ausrüstung', s)
        if m: E(k='vs', atk=int(m.group(1)), vs='unequipped'); return '+' + m.group(1) + ' ATK gegen Ziele ohne Ausrüstung.'
        m = re.fullmatch(r'\+(\d) atk,? (?:solange|wenn) 2\+ (?:eigene abschnitte besetzt|abschnitte mit eigenen einheiten)', s)
        if m: E(k='stat', atk=int(m.group(1)), when='sections:2'); return '+' + m.group(1) + ' ATK, ' + WHEN_TXT['sections:2'] + '.'
        m = re.fullmatch(r'aufdecken: ziehe 1(?: karte)?', s)
        if m: E(k='enter', do='draw', n=1); return 'Beim Ausspielen oder Aufdecken: ziehe 1 Karte.'
        m = re.fullmatch(r'(?:beim ausspielen|aufgedeckt): feind(?: im abschnitt)? [−-]1 atk(?: bis zugende)?', s)
        if m: return None
    return None

def fallback(card):
    """Nächstliegende implementierte Mechanik, wenn kein Teilsatz abbildbar ist (als 'ersetzt' protokolliert)."""
    t = clean(card.get('text') or '').lower(); sup = card['typ'] == 'Unterstützung'
    P = lambda **p: [{'code': 'CM', 'param': p}]
    if sup:
        if re.search(r'heil', t): return P(k='turnheal', n=1), [], 'Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.'
        if re.search(r'aufgeklärt|beobachtet|aufdeck|decke', t): return P(k='turn', do='reveal', n=1), [], 'Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.'
        if re.search(r'zerstört|stirbt|fällt', t): return P(k='trigger', on='own_destroyed', do='draw', n=1), [], 'Einmal pro Zug, wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.'
        if re.search(r'ziehe', t): return P(k='trigger', on='played', do='draw', n=1, when='played:Einheit'), [], 'Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.'
        if re.search(r'kost|billiger', t): return P(k='discount', delta=-1, once=True), [], 'Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).'
        if re.search(r'einrück', t): return P(k='aura', scope='section', vs='entering', vsAtk=1), [], 'Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen ' + VS_TXT['entering'] + '.'
        if re.search(r'atk', t): return P(k='aura', scope='section', atk=1), [], 'Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.'
        return P(k='aura', scope='section', **{'def': 1}), [], 'Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.'
    if re.search(r'aufgeklärt|beobachtet', t): return P(k='vs', atk=1, vs='observed'), [], '+1 ATK gegen beobachtete Ziele.'
    if re.search(r'einrück', t): return P(k='vs', atk=1, vs='entering'), [], '+1 ATK gegen ' + VS_TXT['entering'] + '.'
    if re.search(r'kill|zerstörst|feindtötung', t): return P(k='kill', do='draw', n=1), [], 'Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.'
    if re.search(r'wenn (?:diese einheit )?(?:zerstört|stirbt)|wird zerstört|wenn zerstört', t): return P(k='death', do='draw', n=1), [], 'Wird sie zerstört: ziehe 1 Karte.'
    if re.search(r'schieb|beweg|rückt|versetz|umgeh', t): return [], ['Stellungswechsel'], ''
    if re.search(r'heil', t): return P(k='enter', do='heal', n=1), [], 'Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.'
    if re.search(r'aufdeck|decke', t): return P(k='enter', do='reveal', n=1), [], 'Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.'
    if re.search(r'ziehe', t): return [], ['Zuteilung'], ''
    if re.search(r'kost|billiger', t): return P(k='cost', delta=-1, when='support'), [], 'Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.'
    if re.search(r'schaden', t) and re.search(r'erleid|nimmt|ignorier|negier', t): return P(k='negate', n=1), [], 'Der erste Schaden je Zug sinkt um 1.'
    if re.search(r'[+]\d atk', t): return P(k='first', atk=1), [], 'Ihr erster Angriff nach dem Ausspielen hat +1 ATK.'
    return P(k='negate', n=1), [], 'Der erste Schaden je Zug sinkt um 1.'
