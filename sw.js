/* Massi Fars · Service Worker (modular)
   هەر وەشانێکی نوێ: تەنها VERSION بگۆڕە (و mf-build لە index.html).
   وەشانی نوێ دادەبەزێت و چاوەڕێ دەکات؛ تەنها کاتێک بەکارهێنەر «نوێ بکەرەوە» دەکات چالاک دەبێت. */
const VERSION = 'V1.0.2-modular';
const CACHE = 'mf-' + VERSION;
const SCOPE = self.registration.scope;

const PRECACHE = ['index.html', 'manifest.webmanifest', 'changelog.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'css/app-extra-6.css', 'css/app-extra-7.css', 'css/app-main-2.css', 'css/app-main-3.css', 'css/app-main-4.css', 'css/app-main-5.css', 'css/app-main.css', 'css/bg-origin-fix.css', 'css/bg.css', 'css/box-visibility.css', 'css/card-reorder.css', 'css/clock.css', 'css/compact-order-cards-v2.css', 'css/compact-order-cards.css', 'css/count.css', 'css/credit-seal.css', 'css/credit.css', 'css/crp-page.css', 'css/ctask.css', 'css/ctmap.css', 'css/launcher-v7.css', 'css/lite.css', 'css/mb-pro.css', 'css/mfa.css', 'css/mfg.css', 'css/mfrq.css', 'css/mfw.css', 'css/mfw2.css', 'css/mlmap-base.css', 'css/mlmap.css', 'css/modern-profiles.css', 'css/nb-ledger-v3.css', 'css/nb-ledger-v4.css', 'css/notebook-price.css', 'css/notebook-v56.css', 'css/numpad.css', 'css/order-bell.css', 'css/order-card-final.css', 'css/order-cards-v9.css', 'css/order-items.css', 'css/order-readable.css', 'css/order-view.css', 'css/palette-v52.css', 'css/period.css', 'css/pfedit.css', 'css/premium-overrides.css', 'css/profile-v13.css', 'css/qr-zoom.css', 'css/qty-stepper.css', 'css/recedit.css', 'css/receipt-v2.css', 'css/refresh.css', 'css/requested-kg.css', 'css/sp-redesign.css', 'css/storage-guard.css', 'css/tables-notify.css', 'css/tools-number-format.css', 'css/top-menu.css', 'css/topbar-v3.css', 'css/unified-cards.css', 'js/app-admin-boot.js', 'js/app-character.js', 'js/app-core.js', 'js/app-cust-sales.js', 'js/app-deals.js', 'js/app-extra-7.js', 'js/app-keys-init.js', 'js/app-storage-parse.js', 'js/back-button.js', 'js/box-visibility.js', 'js/card-reorder.js', 'js/config-and-utils.js', 'js/courier-task.js', 'js/credit-seal.js', 'js/dialog.js', 'js/firebase.js', 'js/icons-ready.js', 'js/imgcomp.js', 'js/kb-fix.js', 'js/lazy-libs.js', 'js/lib-html2canvas.js', 'js/lib-jspdf.js', 'js/libcache.js', 'js/lite.js', 'js/live-apply.js', 'js/mfa.js', 'js/mfrq.js', 'js/mfw.js', 'js/note-manage.js', 'js/notebook-pagebar.js', 'js/numpad.js', 'js/period.js', 'js/pfedit.js', 'js/profile-v13.js', 'js/qr-zoom.js', 'js/recedit.js', 'js/receipt-theme.js', 'js/receipt-v2.js', 'js/refresh-btn.js', 'js/storage-guard.js', 'js/sync.js', 'js/sysctl-pre.js', 'js/sysctl.js', 'js/team-logo.js', 'js/tools-number-format.js', 'js/top-menu.js', 'js/unified-cards.js', 'js/update.js', 'js/viewer.js'];

self.addEventListener('install', function (e) {
  /* نابێت skipWaiting بکەین: وەشانی نوێ چاوەڕێ دەکات هەتا بەکارهێنەر ڕازی بێت */
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(PRECACHE.map(function (u) {
        var url = (u.indexOf('http') === 0 || u.indexOf('/') === 0) ? u : (SCOPE + u);
        return c.add(new Request(url, { cache: 'reload' })).catch(function () {});
      }));
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k.indexOf('mf-') === 0 && k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (e) {
  var data = e.data || {};
  var port = e.ports && e.ports[0];
  function reply(msg) { if (port) try { port.postMessage(msg); } catch (x) {} }

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (data.type === 'STATUS') {
    reply({ ptr: { label: VERSION }, pending: self.registration.waiting ? { id: 'waiting' } : null });
  } else if (data.type === 'CHECK') {
    self.registration.update().then(function () {
      reply({ ptr: { label: VERSION }, pending: self.registration.waiting ? { id: 'waiting' } : null });
    }).catch(function () {
      reply({ ptr: { label: VERSION }, pending: null });
    });
  } else if (data.type === 'ACTIVATE') {
    if (self.registration.waiting) {
      self.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    reply({ ok: true });
  }
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigate: cache-first (وەشانی ئێستا)، ئەگەر نەبوو لە ئینتەرنێت
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.open(CACHE).then(function (c) {
        return c.match(SCOPE + 'index.html').then(function (hit) {
          return hit || c.match(SCOPE).then(function (h2) {
            return h2 || fetch(req);
          });
        });
      }).catch(function () { return fetch(req); })
    );
    return;
  }

  // Assets: cache-first, then network and update cache
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.ok && /\.(css|js|png|jpg|jpeg|webp|svg|woff2?|json|webmanifest)$/i.test(url.pathname)) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
    })
  );
});
