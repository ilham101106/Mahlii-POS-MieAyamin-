/* ==========================================================================
   MieAyamin POS - Offline Service Worker (sw.js)
   Cache-First strategy for 100% Offline operation on Tablets & iPhones
   ========================================================================== */

const CACHE_NAME = 'mieayamin-pos-v1.0.2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './kasir.html',
  './admin.html',
  './dapur.html',
  './dokumentasi.html',
  './poster_qr.html',
  './styles.css',
  './css/styles.css',
  './js/storage.js',
  './js/kasir.js',
  './js/admin.js',
  './js/dapur.js',
  './manifest.json',
  './images/icon.svg',
  './images/ceker_pedas.png',
  './images/es_jeruk_peras.png',
  './images/es_teh_jumbo.png',
  './images/mie_ayam_komplit.png',
  './images/mie_yamin_manis.png'
];

// Install Event - Cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching static offline assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Cache First, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version & update cache in background if network is available
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          /* Ignore network errors when offline */
        });
        return cachedResponse;
      }

      // If not in cache, fetch from network and cache it
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Return offline fallback if html page requested
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
