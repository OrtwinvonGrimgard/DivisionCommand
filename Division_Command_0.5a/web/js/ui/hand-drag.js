/* Karte aus der Hand auf einen Slot ziehen. Nur dieses Modul. */
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

  function columnSlot(rootSel, x, y) {
    var root = document.querySelector(rootSel);
    if (!root) return null;
    var box = root.getBoundingClientRect();
    if (box.width < 20 || box.height < 8) return null;
    if (x < box.left - 12 || x > box.right + 12 || y < box.top - 70 || y > box.bottom + 50) return null;
    var slots = root.querySelectorAll('.slot');
    if (!slots.length) return null;
    var i = Math.floor(((x - box.left) / box.width) * slots.length);
    if (i < 0) i = 0;
    if (i >= slots.length) i = slots.length - 1;
    if (!slots[i].getAttribute('data-uid')) return slots[i];
    var k;
    for (k = 1; k < slots.length; k++) {
      if (i - k >= 0 && !slots[i - k].getAttribute('data-uid')) return slots[i - k];
      if (i + k < slots.length && !slots[i + k].getAttribute('data-uid')) return slots[i + k];
    }
    return null;
  }

  function aim(x, y, uid) {
    var zone = window.dcCardZone ? window.dcCardZone(uid) : '';
    if (zone === 'front') return columnSlot('#my-front .front-line', x, y);
    if (zone === 'support') return columnSlot('#my-support', x, y);
    if (zone === 'equip') {
      var filled = document.querySelectorAll('#my-front .front-line .slot[data-uid]');
      var i, r, best = null, bestD = 1e9;
      for (i = 0; i < filled.length; i++) {
        r = filled[i].getBoundingClientRect();
        var d = Math.abs(x - (r.left + r.right) / 2) + Math.abs(y - (r.top + r.bottom) / 2);
        if (d < bestD) { bestD = d; best = filled[i]; }
      }
      return best;
    }
    return columnSlot('#my-front .front-line', x, y) || columnSlot('#my-support', x, y);
  }

  function mark(slot) {
    document.querySelectorAll('.slot.drop-ok').forEach(function (s) { s.classList.remove('drop-ok'); });
    if (slot) slot.classList.add('drop-ok');
  }

  function end(x, y) {
    if (!drag) return;
    var d = drag;
    drag = null;
    ghost(false);
    mark(null);
    document.body.classList.remove('dc-dragging');
    if (!d.moved) return;
    window.dcSuppressClick = true;
    window.setTimeout(function () { window.dcSuppressClick = false; }, 500);
    var slot = aim(x, y, d.uid);
    if (slot && window.dcAcceptDrop) window.dcAcceptDrop(slot, d.uid);
    else {
      var hint = document.getElementById('hint');
      if (hint) hint.textContent = 'Nicht auf der eigenen Front losgelassen.';
    }
  }

  document.addEventListener('pointerdown', function (ev) {
    if (drag || (ev.button != null && ev.button !== 0)) return;
    var card = ev.target && ev.target.closest ? ev.target.closest('#hand .card') : null;
    if (!card || !card.getAttribute('data-uid')) return;
    ev.preventDefault();
    var img = card.querySelector('img');
    drag = {
      uid: card.getAttribute('data-uid'),
      pointerId: ev.pointerId,
      x: ev.clientX,
      y: ev.clientY,
      lx: ev.clientX,
      ly: ev.clientY,
      moved: false,
      src: img ? img.src : ''
    };
  }, true);

  document.addEventListener('pointermove', function (ev) {
    if (!drag || (ev.pointerId != null && drag.pointerId != null && ev.pointerId !== drag.pointerId)) return;
    drag.lx = ev.clientX;
    drag.ly = ev.clientY;
    if (!drag.moved && Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      document.body.classList.add('dc-dragging');
      ghost(true, ev.clientX, ev.clientY, drag.src);
      if (window.dcDragNote) {
        var lab = document.getElementById('my-front-label');
        if (lab) lab.textContent = window.dcDragNote(drag.uid);
      }
    }
    if (ev.cancelable) ev.preventDefault();
    ghost(true, ev.clientX, ev.clientY);
    mark(aim(ev.clientX, ev.clientY, drag.uid));
  }, true);

  document.addEventListener('pointerup', function (ev) {
    if (!drag) return;
    if (ev.pointerId != null && drag.pointerId != null && ev.pointerId !== drag.pointerId) return;
    ev.preventDefault();
    ev.stopPropagation();
    var x = ev.clientX || drag.lx;
    var y = ev.clientY || drag.ly;
    end(x, y);
  }, true);

  document.addEventListener('mouseup', function (ev) {
    if (!drag || !drag.moved) return;
    end(ev.clientX || drag.lx, ev.clientY || drag.ly);
  }, true);
})();
