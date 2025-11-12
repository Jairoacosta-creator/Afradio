// service-worker.js - básico para caching
const CACHE_NAME = 'afradio-v1';
const OFFLINE_URL = '/index.html';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/afradio-manifest.json',
  '/icons/afradio-192.png',
  '/icons/afradio-512.png',
  // añade aquí CSS, JS o assets importantes
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Strategy: try network, fallback to cache
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match(OFFLINE_URL))
    )
  );
});
