const CACHE_NAME = 'respira-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/assets/icons/icon-192x192.png',
        '/assets/icons/icon-512x512.png',
        '/assets/icons/favicon-16x16.png',
        '/assets/icons/favicon-32x32.png',
        '/assets/icons/favicon.ico',
        '/assets/icons/apple-touch-icon.png',
        '/assets/sounds/bell-a.mp3',
        '/assets/sounds/chuva.mp3',
        '/assets/sounds/floresta.mp3',
        '/assets/sounds/mar.mp3',
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
