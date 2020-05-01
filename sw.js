self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

var urlsToPrefetch = [
  '/offline.html',
  '/favicon.ico'
];

var cacheName = 'cacheboiya';

self.addEventListener("install", e => {
  cacheOfflinePage();
  self.skipWaiting();
});

async function cacheOfflinePage(){
  const cache = await caches.open(cacheName);
  cache.addAll(urlsToPrefetch);
}


// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url);

//   if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
//     event.respondWith(
//       fetch(event.request.url).catch(error => {
//         return caches.match(event.request).then(function (response) {
//                   return response || caches.match("offline.html")
//         })
//       })
//     );
//   }
// });


self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  try {
    return await fetch(req);
  } catch (err) {
    return caches.match("offline.html");
  }
}


self.addEventListener('push', event => {
  const options = {   
    "body": "Body Message",
      "icon": "/img/android-chrome-192x192.png",
    "badge": "/img/android-chrome-192x192.png",
  };
  const promiseChain = self.registration.showNotification('Hello, World.',options);
  event.waitUntil(promiseChain);
});