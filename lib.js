(function () {
  try {
    // --- helpers ---
    function getParamFromCurrentScript(name) {
      var s = document.currentScript && document.currentScript.src;
      if (!s) {
        // fallback: find by id used in GTM
        var el = document.getElementById('dmhq-lib');
        s = el && el.src;
      }
      if (!s) return null;
      var m = s.match(new RegExp('[?&]' + name + '=([^&#]+)'));
      return m ? decodeURIComponent(m[1]) : null;
    }

    function injectScript(id, src) {
      if (document.getElementById(id)) return;
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = src;
      tag.id = id;
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(tag, first);
    }

    // --- parse account id from query ---
    var aid = getParamFromCurrentScript('aid');
    if (!aid) {
      console.warn('[DMHQ] lib.js: missing account id (aid).');
      return;
    }

    // --- build account script URL ---
    // Structure suggestion in your repo:
    // /<ACCOUNT_ID>.js
    var ACCOUNT_SCRIPT_URL =
      'https://cdn.jsdelivr.net/gh/sjh1392/dmhq-gtm@main/' + encodeURIComponent(aid) + '.js';

    // --- load account script ---
    injectScript('dmhq-account-' + aid, ACCOUNT_SCRIPT_URL);

    // Optional: dataLayer ping
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'dmhq_lib_loaded',
      accountId: aid,
      ts: Date.now()
    });
  } catch (e) {
    console.error('[DMHQ] lib.js error:', e);
  }
})();
