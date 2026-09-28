/* Karte aus der Hand auf einen Slot ziehen. Getrennt vom Klick-Menü. */
(function () {
  var drag = null;

  function ghost(on, x, y, src) {
    var el = document.getElementById('dc-ghost');
    if (!on) {
      if (el) el.style.display = 'none';
      return;
    }
    if (!el) {
      el = document.createElement('div');
      el.id = 'dc-ghost';
      document.body.appendChild(el);
    }
    if (src) el.innerHTML = '<img alt="" src="' + src + '">';
    el.style.display = 'block';
    el.style.left = (x + 14) + 'px';
    el.style.top = (y + 14) + 'px';
  }

  function slotsOf(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  function hit(list, x, y) {
    var i, r, best = null, bestD = 1e9;
    for (i = 0; i < list.length; i++) {
      r = list[i].getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return list[i];
      var d = Math.abs(x - (r.left + r.right) / 2) + Math.abs(y - (r.top + r.bottom) / 2);
      if (d < bestD) { bestD = d; best = list[i]; }
    }
    if (!best) return null;
    r = best.getBoundingClientRect();
    if (Math.abs(x - (r.left + r.right) / 2) <= r.width * 0.65 && Math.abs(y - (r.top + r.bottom) / 2) <= r.height * 0.85) return best;
    return null;
  }

  function under(x, y) {
    var front = hit(slotsOf('#my-front .front-line .slot'), x, y);
    var support = hit(slotsOf('#my-support .slot'), x, y);
    if (front && support) {
      var a = front.getBoundingClientRect();
      var b = support.getBoundingClientRect();
      var da = Math.abs(y - (a.top + a.bottom) / 2);
      var db = Math.abs(y - (b.top + b.bottom) / 2);
      return da <= db ? front : support;
    }
    return front || support;
  }

  function mark(slot) {
    document.querySelectorAll('.slot.drop-ok').forEach(function (s) { s.classList.remove('drop-ok'); });
    if (slot) slot.classList.add('drop-ok');
  }

  document.addEventListener('pointerdown', function (ev) {
    if (ev.button != null && ev.button !== 0) return;
    var card = ev.target && ev.target.closest ? ev.target.closest('#hand .card') : null;
    if (!card || !card.getAttribute('data-uid')) return;
    ev.preventDefault();
    var img = card.querySelector('img');
    drag = {
      uid: card.getAttribute('data-uid'),
      pointerId: ev.pointerId,
      x: ev.clientX,
      y: ev.clientY,
      moved: false,
      src: img ? img.src : ''
    };
  }, true);

  document.addEventListener('pointermove', function (ev) {
    if (!drag || ev.pointerId !== drag.pointerId) return;
    if (!drag.moved && Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      document.body.classList.add('dc-dragging');
      ghost(true, ev.clientX, ev.clientY, drag.src);
    }
    if (ev.cancelable) ev.preventDefault();
    ghost(true, ev.clientX, ev.clientY);
    mark(under(ev.clientX, ev.clientY));
  }, true);

  document.addEventListener('pointerup', function (ev) {
    if (!drag || ev.pointerId !== drag.pointerId) return;
    var d = drag;
    drag = null;
    ghost(false);
    mark(null);
    document.body.classList.remove('dc-dragging');
    if (!d.moved) return;
    ev.preventDefault();
    ev.stopPropagation();
    window.dcSuppressClick = true;
    window.setTimeout(function () { window.dcSuppressClick = false; }, 400);
    var slot = under(ev.clientX, ev.clientY);
    if (slot && window.dcAcceptDrop) window.dcAcceptDrop(slot, d.uid);
    else {
      var hint = document.getElementById('hint');
      if (hint) hint.textContent = 'Nicht auf einem Slot losgelassen.';
    }
  }, true);
})();
