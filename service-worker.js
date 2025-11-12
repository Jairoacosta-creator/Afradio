const CACHE_NAME = 'afradio-v1';
const OFFLINE_URL = '/index.html';
const ASSETS = [
'/',
'/index.html',
'/styles.css',
'/app.js',
'/afradio-manifest.json',
'/icons/afradio-192.png',
'/icons/afradio-512.png'
];


self.addEventListener('install', (e) => {
self.skipWaiting();
e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});


self.addEventListener('activate', (e) => {
e.waitUntil(
caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
);
self.clients.claim();
});


self.addEventListener('fetch', (e) => {
e.respondWith(
fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match(OFFLINE_URL)))
);
});