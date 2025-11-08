// Nombre de la caché para esta versión de la aplicación
const CACHE_NAME = 'afradio-cache-v1';

// Lista de archivos que queremos guardar en caché
const urlsToCache = [
  './', // El archivo index.html (o afradio_player.html)
  'afradio_player.html',
  'afradio-manifest.json',
  // No podemos guardar el streaming de audio ni el widget de iframe, solo los archivos estáticos
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Archivos estáticos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar solicitudes y servir desde caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si encontramos el recurso en caché, lo devolvemos
        if (response) {
          return response;
        }
        // Si no está en caché, hacemos la solicitud normal a la red
        return fetch(event.request);
      })
  );
});

// Eliminar cachés antiguas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Eliminando caché antigua', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});