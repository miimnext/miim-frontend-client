if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, c) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let i = {};
    const o = (e) => a(e, t),
      r = { module: { uri: t }, exports: i, require: o };
    s[t] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (c(...e), i));
  };
}
define(["./workbox-c2c0676f"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/Po7BUMLoCfxY6darMbD-A/_buildManifest.js",
          revision: "8fa6e55b153985ef725f1465d4ecf023",
        },
        {
          url: "/_next/static/Po7BUMLoCfxY6darMbD-A/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/180.5a8a0d93690ed2d8.js",
          revision: "5a8a0d93690ed2d8",
        },
        {
          url: "/_next/static/chunks/190-52a4895ea6689a32.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/318.6ec5fdcfd821d78e.js",
          revision: "6ec5fdcfd821d78e",
        },
        {
          url: "/_next/static/chunks/342.fd652cff33e34a24.js",
          revision: "fd652cff33e34a24",
        },
        {
          url: "/_next/static/chunks/447-e08776dad71d2f68.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/491.8e0caa5fb9ee65a3.js",
          revision: "8e0caa5fb9ee65a3",
        },
        {
          url: "/_next/static/chunks/4bd1b696-08dc55b72455c4ce.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/503.6b82065cfda69b1d.js",
          revision: "6b82065cfda69b1d",
        },
        {
          url: "/_next/static/chunks/505-12b9f7992f4bb67a.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/799.b4d1ec13500081b0.js",
          revision: "b4d1ec13500081b0",
        },
        {
          url: "/_next/static/chunks/850.bd0422b43b639922.js",
          revision: "bd0422b43b639922",
        },
        {
          url: "/_next/static/chunks/895-ea9fb9988594b72b.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/8e1d74a4-6ee7a6830abe44f7.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/903.055f2fc91a435d9a.js",
          revision: "055f2fc91a435d9a",
        },
        {
          url: "/_next/static/chunks/916-0013d667779e180d.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/964.d1074f65f04c0929.js",
          revision: "d1074f65f04c0929",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/about/page-a7a8a6549265ef2b.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/createPost/page-2c93d9a1ea8d28c8.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/miim/%5Bname%5D/page-9d07f9f368aa823b.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/miim/layout-a6857783edc04053.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/miim/page-80214c5e4fba9ebc.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(pages)/post/%5Bid%5D/page-aeb61fb0b6cd01cb.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/layout-13fa715d78f27cca.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/page-67349fe473ae0e35.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-58e3aa7e8cc18b1a.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/framework-6b27c2b7aa38af2d.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/main-app-f7da9752c6335b12.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/main-c021cac7ea25dc06.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-b5283881ff8fda87.js",
          revision: "Po7BUMLoCfxY6darMbD-A",
        },
        {
          url: "/_next/static/css/3ba615d067957b62.css",
          revision: "3ba615d067957b62",
        },
        {
          url: "/_next/static/css/49fd21d87033091a.css",
          revision: "49fd21d87033091a",
        },
        {
          url: "/_next/static/css/60b94eb4058b17f8.css",
          revision: "60b94eb4058b17f8",
        },
        {
          url: "/_next/static/css/712f6fafc7ad0a54.css",
          revision: "712f6fafc7ad0a54",
        },
        {
          url: "/_next/static/css/f6498c67c9cdf110.css",
          revision: "f6498c67c9cdf110",
        },
        { url: "/favicon.ico", revision: "91475e6e64d1a9ce352f60666041c82d" },
        {
          url: "/icons/icon-192x192.png",
          revision: "91475e6e64d1a9ce352f60666041c82d",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "2718843e66f1bb806b590741b02546c6",
        },
        {
          url: "/images/post1.png",
          revision: "6544340116767a0780c1ef4b73f5bdda",
        },
        { url: "/manifest.json", revision: "6cf680a8eb70bf31c587f3f251ad7698" },
        {
          url: "/screenshots/screenshot-desktop.png",
          revision: "6d072e25d4ab6a1a6e464bc4beeb79f6",
        },
        {
          url: "/screenshots/screenshot-mobile.png",
          revision: "2a0c84f4672754eae69675469101869f",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: function (e) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.sameOrigin,
          a = e.url.pathname;
        return !(
          !s ||
          a.startsWith("/api/auth/callback") ||
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          n = e.sameOrigin;
        return (
          "1" === s.headers.get("RSC") &&
          "1" === s.headers.get("Next-Router-Prefetch") &&
          n &&
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          n = e.sameOrigin;
        return "1" === s.headers.get("RSC") && n && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.url.pathname;
        return e.sameOrigin && !s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
