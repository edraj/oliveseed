// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />
// Only necessary if you have an import from `$env/static/public`
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { build, files, version } from '$service-worker';

const sw = globalThis.self as unknown as ServiceWorkerGlobalScope;


const CACHE_NAME = `oliveseed-${version}`;
const ASSETS_TO_CACHE = [
  ...build, // the app itself
  ...files.filter(n => n !== '/config.json' && !n.startsWith('/x'))  // everything in `static` except config
];

const URLS_TO_IGNORE = [
  'googletagmanager', 'gtm', 'analytics', 'moengage', 'clarity.ms', 'bing.com',
  // exclude locally fetched
  'locale/'
];

sw.addEventListener('install', (event: ExtendableEvent) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS_TO_CACHE);
  }
  event.waitUntil(addFilesToCache());
});
sw.addEventListener('activate', (event: ExtendableEvent) => {
  async function deleteOldCaches() {
    const _keys = await caches.keys();

    return Promise.all(
      _keys
        .filter((name) => name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
  }
  event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event: FetchEvent) => {

  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return; // exclude chrome-extension
  if (event.request.url.startsWith('http://localhost')) return;
  if (URLS_TO_IGNORE.some(g => event.request.url.includes(g))) return;


  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE_NAME);

    // cache only the js files in build, ignore fetches for now

    // `build`/`files` can always be served from the cache
    if (ASSETS_TO_CACHE.includes(url.pathname)) {
      const response = await cache.match(url.pathname);

      if (response) {
        return response;
      }
    }

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      const response = await fetch(event.request);

      // if we're offline, fetch can return a value that is not a Response
      // instead of throwing - and we can't pass this non-Response to respondWith
      if (!(response instanceof Response)) {
        throw new Error('invalid response from fetch');
      }

      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch (err) {
      const response = await cache.match(event.request);

      if (response) {
        return response;
      }

      // if there's no cache, then just error out
      // as there is nothing we can do to respond to this request
      throw err;
    }
  }

  event.respondWith(respond());
});
