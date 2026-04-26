const CACHE = 'jog-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Cache-first for app shell + Tesseract CDN assets (so 2nd run is offline-friendly)
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isTesseract = /(?:cdn\.jsdelivr\.net|unpkg\.com|tessdata)/i.test(url.host) || /tesseract|traineddata/i.test(url.pathname);
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || isTesseract || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
