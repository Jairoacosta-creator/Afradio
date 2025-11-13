const CACHE_NAME = "afradio-cache-v2";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./LogoAfradio.jpg",
  "./AFRadio_logo_192.png",
  "./AFRadio_logo_512.png",
  "./service-worker.js",
  "https://afradio.es/listen/afradio/radio.mp3"
];

// Instalar y guardar en caché los archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Archivos cacheados correctamente");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activar y limpiar cachés antiguos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log("Eliminando caché antigua:", key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Interceptar peticiones y responder desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

