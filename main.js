
(function () {
  'use strict';
  var root = document.documentElement;

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {  } }

  function retarget() {
    var zh = root.lang === 'zh';
    document.querySelectorAll('a[data-zh-href]').forEach(function (a) {
      if (!a.dataset.enHref) a.dataset.enHref = a.getAttribute('href');
      a.setAttribute('href', zh ? a.dataset.zhHref : a.dataset.enHref);
    });
    var b = document.getElementById('langBtn');
    if (b) b.textContent = zh ? 'EN' : '中文';
  }
  retarget();

  var lb = document.getElementById('langBtn');
  if (lb) lb.addEventListener('click', function () {
    root.lang = root.lang === 'zh' ? 'en' : 'zh';
    save('ao.lang', root.lang);
    retarget();
  });

  var tb = document.getElementById('themeBtn');
  if (tb) tb.addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    save('ao.theme', root.dataset.theme);
  });

  var f = document.getElementById('launch');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = (document.getElementById('heroRepo').value || '').trim();
    var base = 'https://autooptm.com/app';
    location.href = v ? base + '?repo=' + encodeURIComponent(v) : base;
  });
})();
