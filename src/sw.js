const OFFLINE_PAGE = './offline/index.html';

const CACHE = 'offline-cache';




self.addEventListener('install', (event) => {
  // console.log('👷', 'install', event);

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.add(OFFLINE_PAGE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // console.log('👷', 'activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.mode === "cors" || event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        if (!response || response.status === 404) {
          return;
        }

        if (event.request.destination === "document" || event.request.mode === "navigate") {
          return response;
        }

        event.waitUntil(updateCache(event.request, response.clone()));

        return response;
      })
      .catch(function (error) {
        console.log("Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        // The following validates that the request was for a navigation to a new document
        if ((request.destination !== "unknown" && request.destination !== "document") || request.mode !== "navigate") {
          return Promise.reject("no-match");
        }
        return cache.match(OFFLINE_PAGE);
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}