// service-worker.js — gerado pelo Mini SK em 03/10/2026, 13:26:55
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-pwa2-';
const CACHE = PREFIXO + 'muslu8gs';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./android/app/build.gradle",
  "./android/app/src/main/AndroidManifest.xml",
  "./android/app/src/main/java/app/minisk/shell/MainActivity.java",
  "./android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png",
  "./android/build.gradle",
  "./android/gradle.properties",
  "./android/settings.gradle",
  "./apk.config.json",
  "./chat/index.html",
  "./comparador/index.html",
  "./editor/assets/app.js",
  "./editor/extrator.html",
  "./editor/favicon.svg",
  "./editor/icon-192.png",
  "./editor/icon-512.png",
  "./editor/index.html",
  "./editor/manifest.json",
  "./editor/opengraph.jpg",
  "./editor/sw.js",
  "./favicon.ico",
  "./hub.html",
  "./hub.webmanifest",
  "./icon-48.png",
  "./icon-72.png",
  "./icon-96.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./manifest.json",
  "./novo/assets/app.js",
  "./novo/index.html",
  "./novo/skulpt-stdlib.js",
  "./novo/skulpt.min.js",
  "./novo/sql-wasm.js",
  "./novo/sql-wasm.wasm",
  "./outros/chat-isolado.html",
  "./outros/icon-48.png",
  "./outros/icon-72.png",
  "./outros/icon-96.png",
  "./outros/icon-192.png",
  "./outros/icon-512.png",
  "./outros/index.html",
  "./outros/js/bug-detector.js",
  "./outros/js/bug-patcher.js",
  "./outros/js/comparator.js",
  "./outros/js/deps-analyzer.js",
  "./outros/js/endpoint-tester.js",
  "./outros/js/extractor.js",
  "./outros/js/git-diff-analyzer.js",
  "./outros/js/main.js",
  "./outros/js/replit-detector.js",
  "./outros/manifest.json",
  "./outros/sw.js",
  "./playground/assets/app.js",
  "./playground/index.html",
  "./playground/skulpt-stdlib.js",
  "./playground/skulpt.min.js",
  "./playground/sql-wasm.js",
  "./playground/sql-wasm.wasm"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
