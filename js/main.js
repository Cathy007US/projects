(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========== language switch ========== */
  var LANG_KEY = 'portfolio-lang';

  function applyLang(lang) {
    var value = lang === 'cn' ? 'cn' : 'en';
    root.setAttribute('data-lang', value);
    root.setAttribute('lang', value === 'cn' ? 'zh-CN' : 'en');
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === value));
    });
    try { localStorage.setItem(LANG_KEY, value); } catch (e) {}
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.setLang);
    });
  });

  var saved = 'en';
  try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  applyLang(saved);

  /* ========== image fallback: show flat gallery panel ========== */
  document.querySelectorAll('.slide img').forEach(function (img) {
    var markBroken = function () { img.classList.add('is-broken'); };
    img.addEventListener('error', markBroken);
    if (img.complete && img.naturalWidth === 0) markBroken();
  });

  /* ========== carousel ========== */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.track');
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = carousel.querySelector('.dots');
    var prevBtn = carousel.querySelector('.c-arrow.prev');
    var nextBtn = carousel.querySelector('.c-arrow.next');
    var index = 0;
    var timer = null;
    var dots = [];

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1) + ' / ' + slides.length);
      dot.addEventListener('click', function () { go(i); restart(); });
      dotsWrap && dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function go(next) {
      index = (next + slides.length) % slides.length;
      track.style.transform = 'translate3d(' + (-index * 100) + '%, 0, 0)';
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-selected', String(i === index));
      });
      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', String(i !== index));
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); restart(); });

    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(index - 1); restart(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { go(index + 1); restart(); e.preventDefault(); }
    });

    /* touch / trackpad swipe */
    var startX = null;
    carousel.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button')) return;
      startX = e.clientX;
    });
    carousel.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 42) { go(index + (delta < 0 ? 1 : -1)); restart(); }
      startX = null;
    });
    carousel.addEventListener('pointercancel', function () { startX = null; });

    /* autoplay: pause on hover / focus / hidden tab */
    function start() {
      if (reduced || timer || slides.length < 2) return;
      timer = setInterval(function () { go(index + 1); }, 6400);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function restart() { stop(); start(); }

    carousel.addEventListener('pointerenter', stop);
    carousel.addEventListener('pointerleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    go(0);
    start();
  });

  /* ========== 简介/技术栈 切换：标题右侧标签，双语适配 ========== */
  document.querySelectorAll('.meta-tabs').forEach(function (group) {
    var card = group.closest('.meta');
    var tabs = Array.prototype.slice.call(group.querySelectorAll('.meta-tab'));

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (tab.classList.contains('is-active')) return;
        var key = tab.dataset.tab;

        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', String(on));
        });

        if (!card) return;
        card.querySelectorAll('.pane').forEach(function (pane) {
          pane.classList.toggle('is-active', pane.dataset.pane === key);
        });
      });
    });
  });

  /* ========== reveal on scroll ========== */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 2) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ========== copyright year: 2026 — current year ========== */
  (function () {
    var START_YEAR = 2026;
    var now = new Date().getFullYear();
    var el = document.getElementById('copyright-year');
    if (!el) return;
    el.textContent = now > START_YEAR ? START_YEAR + '–' + now : String(START_YEAR);
  })();
})();