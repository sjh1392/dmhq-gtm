(function () {
  try {
    // ---- Session ID handling ----
    var sessionKey = 'dmhq_session_id';

    function generateGuid() {
      // RFC4122 version 4–style UUID
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    // Get or create session ID
    var sessionId = sessionStorage.getItem(sessionKey);
    if (!sessionId) {
      sessionId = generateGuid();
      sessionStorage.setItem(sessionKey, sessionId);
      console.log('[DMHQ] New sessionId generated:', sessionId);
    } else {
      console.log('[DMHQ] Existing sessionId found:', sessionId);
    }

    console.log('[DMHQ] External script loaded via GTM');
 

    // ---- Push to dataLayer ----
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'dmhq_ext_loaded',

      sessionId: sessionId,
      ts: Date.now()
    });

  } catch (e) {
    console.error('[DMHQ] loader error:', e);
  }
})();
