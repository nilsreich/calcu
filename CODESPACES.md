# Codespaces Development Notes

## 🔧 PWA in Codespaces

### Problem
PWA (Progressive Web App) funktioniert nicht gut in GitHub Codespaces wegen:
- CORS-Einschränkungen bei Manifest-Dateien
- Authentifizierungs-Redirects blockieren Service Worker
- Tunneling ändert die Origin

### Lösung
PWA ist in **Development deaktiviert**, aber funktioniert in **Production**:

```typescript
// vite.config.ts
VitePWA({
  devOptions: {
    enabled: false  // Deaktiviert in Dev
  }
})
```

```typescript
// main.tsx
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  // Nur in Production aktiviert
  import('virtual:pwa-register').then(...)
}
```

## ✅ In Codespaces verfügbar

Alle anderen Features funktionieren normal:
- ✅ React 19 mit automatischen Optimierungen
- ✅ Math.js für präzise Berechnungen
- ✅ Tailwind CSS 4
- ✅ Material Design Ripple-Effekte
- ✅ Responsive Design
- ✅ Hot Module Replacement (HMR)

## 🚀 PWA testen

### Lokale Entwicklung
```bash
# PWA funktioniert lokal im Development Mode
pnpm dev
# PWA ist aktiv auf localhost
```

### Production Build
```bash
# Build erstellen
pnpm build

# Preview mit PWA
pnpm preview
# PWA ist vollständig aktiv
```

### Deployed App
Nach dem Deploy (z.B. auf Vercel, Netlify):
- PWA funktioniert vollständig
- Service Worker wird registriert
- App kann installiert werden
- Offline-Modus verfügbar

## 🔍 Fehler vermeiden

### CORS-Fehler in Codespaces
```
Access to manifest at '...' has been blocked by CORS policy
```

**Lösung:** Normal - PWA ist in Dev deaktiviert ✅

### Service Worker nicht gefunden
```
Failed to load resource: virtual:pwa-register
```

**Lösung:** Normal in Development - nur in Production aktiv ✅

## 📝 Development Workflow

### In Codespaces
```bash
# Normale Entwicklung
pnpm dev

# Features testen (außer PWA)
# - Calculator funktioniert
# - Ripple-Effekte funktionieren
# - Math.js funktioniert
# - Responsive Design funktioniert
```

### Lokale Entwicklung
```bash
# PWA kann getestet werden
pnpm dev

# oder Production Build
pnpm build && pnpm preview
```

## 🌐 Deployment Checklist

Für vollständige PWA-Funktionalität beim Deployment:

- [ ] HTTPS ist aktiviert (erforderlich für PWA)
- [ ] Icons sind im `public/` Verzeichnis
- [ ] Build mit `pnpm build` erstellt
- [ ] Service Worker wird registriert
- [ ] Manifest.json wird geladen
- [ ] Install-Prompt erscheint

### Empfohlene Plattformen
- **Vercel** - Automatische HTTPS, PWA-ready
- **Netlify** - PWA-Support out-of-the-box
- **GitHub Pages** - Mit HTTPS, PWA funktioniert
- **Cloudflare Pages** - Optimiert für PWA

## 💡 Tips

### Development in Codespaces
- PWA-Warnungen in Console ignorieren (normal)
- Alle Calculator-Features sind verfügbar
- Hot Reload funktioniert normal

### Production Testing
- `pnpm build && pnpm preview` für lokale PWA-Tests
- Deploy auf Test-Environment für echte PWA-Tests
- Browser DevTools → Application → Manifest prüfen

## 🐛 Troubleshooting

### Codespaces Port Forwarding
Codespaces nutzt Port Forwarding mit Authentifizierung:
- URLs werden umgeschrieben
- Service Worker kann nicht korrekt laden
- Manifest wird durch Login-Redirect blockiert

**Lösung:** PWA ist designed für Production, nicht für Codespaces Dev ✅

### React DevTools Warnung
```
Download the React DevTools for a better development experience
```

**Lösung:** [React DevTools installieren](https://react.dev/link/react-devtools)
- Chrome Extension
- Firefox Add-on
- Standalone App

## ✨ Features Status

| Feature | Codespaces Dev | Local Dev | Production |
|---------|----------------|-----------|------------|
| Calculator | ✅ | ✅ | ✅ |
| Math.js | ✅ | ✅ | ✅ |
| Ripple Effects | ✅ | ✅ | ✅ |
| Responsive | ✅ | ✅ | ✅ |
| React 19 | ✅ | ✅ | ✅ |
| Tailwind 4 | ✅ | ✅ | ✅ |
| **PWA** | ❌ | ✅ | ✅ |
| **Service Worker** | ❌ | ✅ | ✅ |
| **Offline Mode** | ❌ | ✅ | ✅ |
| **Install Prompt** | ❌ | ✅ | ✅ |

## 📚 Resources

- [Vite PWA Plugin Docs](https://vite-pwa-org.netlify.app/)
- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
- [PWA on Web.dev](https://web.dev/progressive-web-apps/)
