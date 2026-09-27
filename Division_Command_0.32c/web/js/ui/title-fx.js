// Titelhintergrund: Gemälde als Dauerschleife (Lampe, Fransen, Flaggen, Stadtfeuer).
(function () {
  'use strict';
  var vid = document.getElementById('title-loop');
  if (!vid) return;
  vid.muted = true;
  vid.loop = true;
  vid.playsInline = true;
  var play = function () { vid.play().catch(function () {}); };
  if (vid.readyState >= 2) play();
  else vid.addEventListener('canplay', play, { once: true });
  document.addEventListener('pointerdown', play, { once: true });
})();
