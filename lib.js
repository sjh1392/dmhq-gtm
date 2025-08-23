(function () {
  console.log('[DMHQ] External script loaded via GTM');
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'dmhq_ext_loaded',
    source: 'cdn',
    ts: Date.now()
  });
})();
