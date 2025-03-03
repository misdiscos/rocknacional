const CACHE_NAME = "rock-nacional-player-v3.5";
const urlsToCache = [
    "/", 
    "/index.html",
    "/styles.css",
    "/script.js",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    // Guardar en caché los álbumes visitados
                    if (event.request.url.includes(".html") || event.request.url.includes(".mp3")) {
                        cache.put(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                });
            });
        }).catch(() => caches.match("/index.html")) // Si no hay conexión, mostrar la página principal
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
            );
        })
    );
});
