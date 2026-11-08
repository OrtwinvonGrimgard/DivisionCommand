function show(id) {
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('on'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('on');
}

document.getElementById('go-start').onclick = function () {
  var tr = document.getElementById('title-root');
  if (tr) tr.classList.remove('boot-intro', 'logo-in', 'btn-in');
  show('scr-title');
};

document.getElementById('go-single').onclick = function () { show('scr-single'); };
document.getElementById('go-lan').onclick = function () { show('scr-lan'); };
document.getElementById('go-library').onclick = function () { show('scr-library'); };
document.getElementById('go-hilfe').onclick = function () { show('scr-hilfe'); };
document.getElementById('go-user').onclick = function () { show('scr-user'); };
document.getElementById('go-playtest').onclick = function () { show('scr-playtest'); };
document.getElementById('go-options').onclick = function () { show('scr-options'); };
document.getElementById('go-quit').onclick = function () { if (confirm('Beenden?')) window.close(); };

['single','lan','library','user','playtest','options','hilfe'].forEach(function(name) {
  var btn = document.getElementById('back-' + name);
  if (btn) btn.onclick = function () { show('scr-title'); };
});

(function bootIntro() {
  var tr = document.getElementById('title-root');
  if (!tr) return;
  setTimeout(function () { tr.classList.add('logo-in'); }, 1400);
  setTimeout(function () { tr.classList.add('btn-in'); }, 5000);
})();
