// Hero slideshow: fades between slides every 5s, with arrows + dots.
// Needs the page to have: .slide, #dots, #prevBtn, #nextBtn.

(async function () {
  await window.__includesReady;

  var slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  var dotsWrap = document.getElementById('dots');
  var current = 0;
  var timer;

  var dots = [];
  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.getElementById('prevBtn').addEventListener('click', function () { prev(); restart(); });
  document.getElementById('nextBtn').addEventListener('click', function () { next(); restart(); });

  restart();
})();