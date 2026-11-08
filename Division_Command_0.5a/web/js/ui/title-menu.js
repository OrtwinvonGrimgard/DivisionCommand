function show(id) {
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('on'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('on');

  var titleRoot = document.getElementById('title-root');
  if (titleRoot) {
    if (id === 'scr-title' || id === 'scr-boot') {
      titleRoot.style.display = '';
    } else {
      titleRoot.style.display = 'none';
    }
  }
}

async function openScreen(name) {
  if (!document.getElementById('scr-' + name)) {
    try {
      const res = await fetch('partials/' + name + '.html');
      if (res.ok) {
        const html = await res.text();
        document.getElementById('screen-container').insertAdjacentHTML('beforeend', html);
        var back = document.getElementById('back-' + name);
        if (back) back.onclick = function () { show('scr-title'); };
      }
    } catch (e) { console.warn('Load failed', name, e); }
  }
  show('scr-' + name);
}

document.getElementById('go-start').onclick = function () {
  var tr = document.getElementById('title-root');
  if (tr) {
    tr.classList.remove('boot-intro', 'logo-in', 'btn-in');
    tr.style.display = '';
  }
  show('scr-title');
};

document.getElementById('go-single').onclick = function () { openScreen('single'); };
document.getElementById('go-lan').onclick = function () { openScreen('lan'); };
document.getElementById('go-library').onclick = function () { openScreen('library'); };
document.getElementById('go-hilfe').onclick = function () { openScreen('hilfe'); };
document.getElementById('go-user').onclick = function () { openScreen('user'); };
document.getElementById('go-playtest').onclick = function () { openScreen('playtest'); };
document.getElementById('go-options').onclick = function () { openScreen('options'); };
document.getElementById('go-quit').onclick = function () { if (confirm('Beenden?')) window.close(); };

(function bootIntro() {
  var tr = document.getElementById('title-root');
  if (!tr) return;
  setTimeout(function () { tr.classList.add('logo-in'); }, 1400);
  setTimeout(function () { tr.classList.add('btn-in'); }, 5000);
})();
