(function () {
  try {
    var BANNER_ID = 'dmhq-pixel-tester-banner';
    if (document.getElementById(BANNER_ID)) return;

    // Create banner
    var bar = document.createElement('div');
    bar.id = BANNER_ID;
    bar.textContent = 'Pixel tester';

    // Basic styles: thin, fixed, top
    // (Avoid flash/overlap by offsetting body if not already accounted for)
    bar.setAttribute('style', [
      'position:fixed',
      'top:0',
      'left:0',
      'right:0',
      'height:28px',
      'line-height:28px',
      'font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
      'font-size:12px',
      'text-align:center',
      'background:#111',
      'color:#fff',
      'z-index:2147483647', // on top of everything
      'box-shadow:0 1px 2px rgba(0,0,0,.2)'
    ].join(';'));

    document.documentElement.appendChild(bar);

    // Nudge the page so content isn't covered.
    // Only add if not already added by us previously.
    var BODY_MARGIN_FLAG = 'data-dmhq-banner-offset';
    var root = document.documentElement;
    if (!root.hasAttribute(BODY_MARGIN_FLAG)) {
      var prev = parseInt((document.body && getComputedStyle(document.body).marginTop) || '0', 10) || 0;
      document.body.style.marginTop = (prev + 28) + 'px';
      root.setAttribute(BODY_MARGIN_FLAG, '1');
    }

    // Optional: remove on SPA route changes if needed, or keep persistent.

    // dataLayer ping
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'dmhq_pixel_tester_banner_added',
      ts: Date.now()
    });
  } catch (e) {
    console.error('[DMHQ] account script error:', e);
  }
})();
