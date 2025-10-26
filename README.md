# Calculator PWA 🧮

A modern, installable calculator Progressive Web App built with React 19, TypeScript, Tailwind CSS 4, and math.js.

![Calculator](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8)
![PWA](https://img.shields.io/badge/PWA-Ready-success)

## ✨ Features

### 🎯 Core Features
- ✅ **Accurate Calculations**: Uses math.js to prevent binary floating point errors
- ✅ **Material Design**: Google-style ripple effects on buttons
- ✅ **German Formatting**: Numbers with comma decimals (1.234,56)
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Touch Optimized**: Perfect for mobile devices

### 📱 PWA Features
- ✅ **Installable**: Add to home screen on any device
- ✅ **Offline Support**: Works without internet connection
- ✅ **Auto-Updates**: New versions install automatically
- ✅ **Fast Loading**: Assets cached for instant startup

### ⚛️ React 19
- ✅ **Automatic Memoization**: React Compiler optimizations
- ✅ **Better Performance**: Reduced re-renders
- ✅ **Modern Hooks**: Latest React features

### 🎨 Tailwind CSS 4
- ✅ **No Config Files**: Just `@import "tailwindcss"`
- ✅ **Faster Builds**: Modern architecture
- ✅ **Better DX**: Improved developer experience

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build (with PWA)
pnpm preview
```

> **Note for Codespaces:** PWA is disabled in development mode to avoid CORS issues. See [CODESPACES.md](CODESPACES.md) for details. All other features work normally!

## 📁 Project Structure

```
src/
├── components/
│   └── calculator/
│       ├── Calculator.tsx       # Main component
│       ├── Display.tsx         # Number display
│       ├── CalculatorButton.tsx # Button component
│       ├── types.ts            # TypeScript types
│       ├── utils.ts            # math.js calculations
│       ├── useCalculator.ts    # Calculator logic hook
│       ├── useRipple.ts        # Ripple effect hook
│       └── README.md           # Component docs
├── App.tsx                     # App wrapper
├── main.tsx                    # Entry point + PWA registration
└── index.css                   # Global styles
```

## 🔢 Math.js Integration

Prevents floating point errors:

```typescript
// Native JavaScript (incorrect)
0.1 + 0.2 // = 0.30000000000000004 ❌

// With math.js (correct)
calculate(0.1, 0.2, '+') // = 0.3 ✅
```

## 📱 Installing as PWA

### Desktop (Chrome/Edge)
1. Click the ⊕ icon in address bar
2. Click "Install"

### Mobile (Android)
1. Open in Chrome
2. Menu → "Add to Home screen"

### Mobile (iOS)
1. Open in Safari
2. Share → "Add to Home Screen"

## 🎨 Generating PWA Icons

1. Open `generate-icons.html` in browser
2. Download all generated icons
3. Place in `public/` directory

Required icons:
- `pwa-64x64.png`
- `pwa-192x192.png`
- `pwa-512x512.png`
- `maskable-icon-512x512.png`
- `favicon.ico`
- `apple-touch-icon.png`

## 🛠️ Tech Stack

- **React** 19.1 - UI framework with compiler
- **TypeScript** 5.9 - Type safety
- **Vite** 7.1 - Fast build tool
- **Tailwind CSS** 4.1 - Utility-first CSS
- **math.js** 15.0 - Accurate calculations
- **Vite PWA** 1.1 - PWA support

## 📚 Documentation

- [Component Documentation](src/components/calculator/README.md)
- [Technical Documentation](TECHNICAL.md)
- [PWA Setup Guide](PWA-SETUP.md)

## 🎯 Key Improvements

### Binary Floating Point Fix
- All calculations use math.js
- Accurate decimal arithmetic
- No rounding errors

### React 19 Benefits
- Automatic component memoization
- Optimized re-renders
- Cleaner code (less manual optimization)

### PWA Benefits
- Native app experience
- Offline functionality
- Instant loading (caching)
- No app store needed

### Mobile Optimizations
- `interactive-widget` meta tag prevents scrolling
- Touch-optimized buttons
- Ripple feedback on interactions
- Fixed viewport (no zooming)

## 🔧 Development

```bash
# Development mode
pnpm dev              # Start dev server

# Production
pnpm build            # Build for production
pnpm preview          # Test production build

# Utilities
pnpm lint             # Run ESLint
pnpm generate-icons   # Icon generation info
pnpm pwa-assets       # PWA asset generation help
```

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/nilsreich/calcu/issues).
