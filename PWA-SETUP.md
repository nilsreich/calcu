# PWA Setup Guide

## 📱 Progressive Web App Features

Diese App ist als installierbare PWA konfiguriert mit folgenden Features:

> **⚠️ Important:** PWA is disabled in development mode (especially for GitHub Codespaces) to avoid CORS issues. It works fully in production builds. See [CODESPACES.md](CODESPACES.md) for details.

### ✅ Implementiert:
- **Service Worker** für Offline-Funktionalität
- **Web App Manifest** für Installation
- **Auto-Update** bei neuen Versionen
- **Cache-First** Strategie für optimale Performance
- **Workbox** für fortgeschrittenes Caching

## 🎨 Icons Generieren

### Option 1: Browser (Empfohlen)
1. Öffne `generate-icons.html` im Browser
2. Lade alle generierten Icons herunter
3. Platziere sie im `public/` Verzeichnis

### Option 2: Design-Tool
Erstelle Icons in deinem bevorzugten Design-Tool:

**Benötigte Größen:**
- `pwa-64x64.png` - Kleines Icon
- `pwa-192x192.png` - Standard PWA Icon
- `pwa-512x512.png` - Großes PWA Icon
- `maskable-icon-512x512.png` - Maskable Icon (mit Safe Zone)
- `favicon.ico` - Browser Favicon (32x32)
- `apple-touch-icon.png` - iOS Icon (180x180)

**SVG Icons (bereits vorhanden):**
- `icon.svg` - Haupt-Icon
- `mask-icon.svg` - Safari Pinned Tab
- `apple-touch-icon.svg` - iOS Fallback

## 🚀 Installation testen

### Desktop (Chrome/Edge):
1. Öffne die App im Browser
2. Klicke auf das ⊕ Icon in der Adressleiste
3. Wähle "Installieren"

### Mobile (Android):
1. Öffne die App in Chrome
2. Tippe auf Menü (⋮)
3. Wähle "Zum Startbildschirm hinzufügen"

### Mobile (iOS):
1. Öffne die App in Safari
2. Tippe auf Teilen-Button
3. Wähle "Zum Home-Bildschirm"

## 🔧 Konfiguration

Die PWA ist konfiguriert in `vite.config.ts`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Calculator',
    short_name: 'Calc',
    theme_color: '#ffffff',
    // ... weitere Einstellungen
  }
})
```

## 📦 Build & Deploy

```bash
# Development mit PWA
pnpm dev

# Production Build
pnpm build

# Build Preview (testet PWA)
pnpm preview
```

## 🧪 Testing

### Service Worker testen:
1. Build erstellen: `pnpm build`
2. Preview starten: `pnpm preview`
3. DevTools → Application → Service Workers
4. Offline-Modus aktivieren und App testen

### Manifest testen:
1. DevTools → Application → Manifest
2. Prüfe alle Felder und Icons
3. "Add to homescreen" testen

## 🎯 Features

### Offline Support
- Alle Assets werden gecacht
- App funktioniert ohne Internet
- Automatische Updates im Hintergrund

### Auto-Update
```typescript
onNeedRefresh() {
  if (confirm('New version available! Reload?')) {
    updateSW(true)
  }
}
```

### Caching Strategy
- **App-Assets**: Cache-First (sofort verfügbar)
- **Google Fonts**: Cache-First mit 1 Jahr Expiration
- **Runtime Caching**: Für dynamische Inhalte

## 📊 PWA Checkliste

- ✅ HTTPS (in Production)
- ✅ Service Worker registriert
- ✅ Web App Manifest
- ✅ Icons in allen Größen
- ✅ Viewport Meta-Tag
- ✅ Theme Color
- ✅ Offline Fallback
- ✅ Install Prompt
- ⏳ Icons generieren (siehe oben)

## 🔗 Ressourcen

- [PWA Builder](https://www.pwabuilder.com/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox Docs](https://developers.google.com/web/tools/workbox)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
