
window.onload = function () {

  // baaaaad solution, why? the lang done in js is too late, it needs to be loaded, figure out another way
  // TODO: make this a caddy ishee

  // find language from url
  const lang = location.pathname.split('/')[1];
  if (!lang) return;
  // also check lang mataches en|ar|ku
  if (!['en', 'ar', 'ku'].includes(lang)) return;
  document.querySelector('html').setAttribute('lang', lang);
  // load script
  const script = document.createElement('script');
  script.src = `/locale/ol-${lang}.js`;
  document.head.appendChild(script);

  // last issue, fix font downloads

};
