const CACHE_NAME = 'sarkaripixels-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/favicon.svg',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // For clean path navigation, serve index.html from cache
  if (event.request.mode === 'navigate' || 
      requestUrl.pathname.startsWith('/tool/') || 
      requestUrl.pathname.startsWith('/page/')) {
    event.respondWith(
      caches.match('/index.html').then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(event.request).then(response => {
        // Cache dynamic assets like font files and lazy-loaded libraries on-demand
        if (response.status === 200 && (
            event.request.url.includes('fonts.gstatic.com') ||
            event.request.url.includes('cdnjs.cloudflare.com') ||
            event.request.url.includes('cdn.jsdelivr.net')
        )) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
