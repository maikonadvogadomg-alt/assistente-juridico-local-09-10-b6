// service-worker.js — gerado pelo Mini SK em 13/10/2026, 16:34:33
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-assistente-juridico-';
const CACHE = PREFIXO + 'mv72y1us';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./404.html",
  "./favicon.ico",
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
  "./public/auditoria.html",
  "./public/codigo-formatacao.txt",
  "./public/comparador.html",
  "./public/favicon.png",
  "./public/icon-192.png",
  "./public/icon-512.png",
  "./public/manifest.json",
  "./public/sw.js",
  "./src/App.tsx",
  "./src/components/pwa-install.tsx",
  "./src/components/theme-provider.tsx",
  "./src/components/theme-toggle.tsx",
  "./src/components/tiptap-editor.tsx",
  "./src/components/ui/accordion.tsx",
  "./src/components/ui/alert-dialog.tsx",
  "./src/components/ui/alert.tsx",
  "./src/components/ui/aspect-ratio.tsx",
  "./src/components/ui/avatar.tsx",
  "./src/components/ui/badge.tsx",
  "./src/components/ui/breadcrumb.tsx",
  "./src/components/ui/button.tsx",
  "./src/components/ui/calendar.tsx",
  "./src/components/ui/card.tsx",
  "./src/components/ui/carousel.tsx",
  "./src/components/ui/chart.tsx",
  "./src/components/ui/checkbox.tsx",
  "./src/components/ui/collapsible.tsx",
  "./src/components/ui/command.tsx",
  "./src/components/ui/context-menu.tsx",
  "./src/components/ui/dialog.tsx",
  "./src/components/ui/drawer.tsx",
  "./src/components/ui/dropdown-menu.tsx",
  "./src/components/ui/form.tsx",
  "./src/components/ui/hover-card.tsx",
  "./src/components/ui/input-otp.tsx",
  "./src/components/ui/input.tsx",
  "./src/components/ui/label.tsx",
  "./src/components/ui/menubar.tsx",
  "./src/components/ui/navigation-menu.tsx",
  "./src/components/ui/pagination.tsx",
  "./src/components/ui/popover.tsx",
  "./src/components/ui/progress.tsx",
  "./src/components/ui/radio-group.tsx",
  "./src/components/ui/resizable.tsx",
  "./src/components/ui/scroll-area.tsx",
  "./src/components/ui/select.tsx",
  "./src/components/ui/separator.tsx",
  "./src/components/ui/sheet.tsx",
  "./src/components/ui/sidebar.tsx",
  "./src/components/ui/skeleton.tsx",
  "./src/components/ui/slider.tsx",
  "./src/components/ui/switch.tsx",
  "./src/components/ui/table.tsx",
  "./src/components/ui/tabs.tsx",
  "./src/components/ui/textarea.tsx",
  "./src/components/ui/toast.tsx",
  "./src/components/ui/toaster.tsx",
  "./src/components/ui/toggle-group.tsx",
  "./src/components/ui/toggle.tsx",
  "./src/components/ui/tooltip.tsx",
  "./src/hooks/use-mobile.tsx",
  "./src/hooks/use-toast.ts",
  "./src/index.css",
  "./src/lib/queryClient.ts",
  "./src/lib/utils.ts",
  "./src/main.tsx",
  "./src/pages/auditoria-financeira.tsx",
  "./src/pages/code-assistant.tsx",
  "./src/pages/comparador-juridico.tsx",
  "./src/pages/consulta-corporativo.tsx",
  "./src/pages/consulta-pdpj.tsx",
  "./src/pages/consulta-processual.tsx",
  "./src/pages/filtrador.tsx",
  "./src/pages/jurisprudencia.tsx",
  "./src/pages/legal-assistant.tsx",
  "./src/pages/login.tsx",
  "./src/pages/not-found.tsx",
  "./src/pages/painel-processos.tsx",
  "./src/pages/playground.tsx",
  "./src/pages/previdenciario.tsx",
  "./src/pages/robo-djen.tsx",
  "./src/pages/token-generator.tsx",
  "./src/pages/tramitacao.tsx"
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
