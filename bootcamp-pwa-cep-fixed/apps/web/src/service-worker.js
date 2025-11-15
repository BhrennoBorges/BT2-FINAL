const CACHE = 'bootcamp-cep-cache-v1';
const ASSETS = ['/', '/index.html', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE && caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() =>
        caches.match(request).then((res) => res || caches.match('/offline.html'))
      )
  );
});
