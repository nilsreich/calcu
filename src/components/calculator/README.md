# Calculator Component

Ein modularer, typsicherer Calculator, gebaut mit React, TypeScript und Tailwind CSS 4.

## 📁 Struktur

```
src/components/calculator/
├── Calculator.tsx          # Haupt-Komponente
├── Display.tsx            # Anzeige-Komponente
├── CalculatorButton.tsx   # Wiederverwendbare Button-Komponente
├── types.ts               # TypeScript Type Definitionen
├── utils.ts               # Hilfsfunktionen (calculate, formatForDisplay)
├── useCalculator.ts       # Custom Hook für Calculator-Logik
├── useRipple.ts          # Custom Hook für Material Design Ripple-Effekt
└── index.ts              # Barrel Export
```

## 🎯 Features

- ✅ **Modulare Architektur**: Jede Komponente hat eine klare Verantwortung
- ✅ **Type Safety**: Vollständig typisiert mit TypeScript
- ✅ **Custom Hook**: Business-Logik in `useCalculator` ausgelagert
- ✅ **Wiederverwendbare Komponenten**: `CalculatorButton` mit Varianten
- ✅ **Deutsche Formatierung**: Zahlen mit Komma und Tausendertrennzeichen
- ✅ **Performance**: Optimiert mit `useCallback`
- ✅ **Tailwind CSS 4**: Ohne Config-Dateien (nur `@import "tailwindcss"`)
- ✅ **Material Design Ripple**: Google-typischer Touch-Feedback-Effekt
- ✅ **Mobile-Optimiert**: Interactive Widget, kein Scrollen auf Smartphones
- ✅ **Touch-Optimiert**: Tap-Highlighting deaktiviert, optimale Touch-Targets

## 🚀 Verwendung

```tsx
import { Calculator } from './components/calculator';

function App() {
  return <Calculator />;
}
```

## 📦 Komponenten

### Calculator.tsx
Die Haupt-Komponente, die alle Teile zusammenführt.

### Display.tsx
Zeigt History und aktuelle Eingabe an.

**Props:**
- `history: string` - Berechnungsverlauf
- `currentInput: string` - Aktuelle Eingabe

### CalculatorButton.tsx
Wiederverwendbare Button-Komponente mit verschiedenen Varianten.

**Props:**
- `onClick: () => void` - Click-Handler
- `variant: ButtonVariant` - Stil-Variante
- `className?: string` - Zusätzliche CSS-Klassen
- `children: ReactNode` - Button-Inhalt

**Varianten:**
- `number` - Zahlen-Buttons (0-9)
- `function` - Funktions-Buttons (AC, ±, %)
- `operator` - Operator-Buttons (+, -, ×, ÷)
- `operator-active` - Aktiver Operator
- `equals` - Gleichheitszeichen

### useCalculator.ts
Custom Hook mit der gesamten Calculator-Logik.

**Returns:**
- `handleNumber(num: string)` - Zahlen-Eingabe
- `handleOperator(op: Operator)` - Operator-Auswahl
- `handleEquals()` - Berechnung durchführen
- `handleFunction(func)` - Spezielle Funktionen (AC, ±, %)

## 🛠️ Types

```typescript
type Operator = '+' | '-' | '*' | '/' | null;

interface CalculatorState {
  currentInput: string;
  operator: Operator;
  operand1: number | null;
  isNewInput: boolean;
  history: string;
}
```

## 📐 Utilities

### calculate()
Führt die mathematische Berechnung durch.

### formatForDisplay()
Formatiert Zahlen für die deutsche Anzeige (z.B. `1.234,56`).

### getDisplayOperator()
Konvertiert interne Operatoren zu Anzeige-Symbolen (z.B. `*` → `×`).

## 🎨 Tailwind CSS 4 Setup

In Tailwind 4 wird nur noch `@import "tailwindcss"` in der CSS-Datei benötigt:

```css
@import "tailwindcss";
```

Keine `tailwind.config.js` oder `postcss.config.js` mehr erforderlich! 🎉

## 📱 Mobile Optimierung

### Interactive Widget Meta-Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content" />
```

Dies verhindert Scrollen und sorgt dafür, dass die Tastatur den Content nicht verdrängt.

### Material Design Ripple-Effekt
Der `useRipple`-Hook implementiert den typischen Google-Ripple-Effekt:

```tsx
const createRipple = useRipple('rgba(255, 255, 255, 0.4)');

<button onClick={(e) => {
  createRipple(e);
  onClick();
}}>
  Click me
</button>
```

**Features:**
- 🎨 Anpassbare Farbe pro Button-Variante
- ⚡ Performante Animation mit CSS
- 📱 Touch-optimiert für Smartphones
- ♻️ Automatisches Cleanup nach Animation
