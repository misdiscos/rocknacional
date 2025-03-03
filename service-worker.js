const CACHE_NAME = "rock-nacional-player-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png",
    "/icon-256.png",
    "/icon-128.png"
];

// Instalar Service Worker y guardar archivos en caché
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activar y limpiar cachés antiguos
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
            );
        })
    );
});

// Interceptar peticiones y servir desde caché o red
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response; // Servir desde caché si está disponible

            return fetch(event.request).then(fetchResponse => {
                // Guardar en caché los álbumes visitados
                return caches.open(CACHE_NAME).then(cache => {
                    if (event.request.url.includes(".html") || event.request.url.includes(".mp3") || event.request.url.includes(".jpg")) {
                        cache.put(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                });
            });
        }).catch(() => caches.match("/index.html")) // Si no hay conexión, mostrar la página principal
    );
});
