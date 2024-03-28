import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'style',
  new NetworkFirst({
    cacheName: 'styles',
  })
);

registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst({
    cacheName: 'scripts',
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new NetworkFirst({
    cacheName: 'images',
  })
);
