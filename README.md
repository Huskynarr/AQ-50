# AQ-50 Online Test

Ein professioneller webbasierter Test zur Erfassung des Autismus-Spektrum-Quotienten (AQ-50) basierend auf dem offiziellen Fragebogen des Autism Research Centre.

## 🎯 Features

### ✨ Benutzerfreundlichkeit
- **Dark Mode Support** - Automatische Systemerkennung + manueller Toggle
- **Responsive Design** - Optimiert für Desktop, Tablet und Mobile
- **Keyboard Navigation** - Schnelle Antworten mit Tasten 1-4
- **Auto-Save Funktion** - Automatische Zwischenspeicherung des Fortschritts
- **Visueller Fortschrittsbalken** - Echtzeit-Anzeige des Testfortschritts
- **Navigation Controls** - Vor/Zurück-Buttons für flexible Testdurchführung

### 📊 Erweiterte Auswertung
- **Detaillierte Subskalen-Analyse** - 5 Kategorien mit individueller Bewertung:
  - Soziale Fertigkeiten
  - Aufmerksamkeitswechsel  
  - Aufmerksamkeit für Details
  - Kommunikation
  - Vorstellungskraft
- **Normwert-Vergleiche** - Vergleich mit Referenzpopulationen
- **Professionelle Interpretation** - Evidenzbasierte Bewertungsrichtlinien
- **Visuelle Datenrepräsentation** - Fortschrittsbalken und Prozentanzeigen

### 📄 PDF-Export
- **Umfassende Berichte** - Detaillierte Auswertung mit allen Subskalen
- **Professionelles Layout** - Druckoptimierte Formatierung
- **Vollständige Antwortdokumentation** - Alle Fragen und Antworten im Detail
- **Interpretationshilfen** - Bewertungsskalen und Referenzwerte

### ♿ Barrierefreiheit
- **ARIA-Labels** - Vollständige Screen Reader Unterstützung
- **Keyboard-Only Navigation** - Komplette Bedienung ohne Maus möglich
- **Hohe Kontraste** - WCAG 2.1 AA konforme Farbgebung
- **Focus Management** - Klare visuelle Fokusindikatoren

### 🧪 Qualitätssicherung
- **Unit Tests** - Umfassende Testabdeckung
- **CI/CD Pipeline** - Automatisierte Tests und Deployment
- **TypeScript** - Typsichere Entwicklung
- **Performance Optimiert** - Schnelle Ladezeiten und flüssige Interaktionen

## 🚀 Technologien

- **React.js 18** - Moderne UI-Bibliothek
- **TypeScript** - Typsichere Entwicklung
- **Vite** - Schnelles Build-Tool
- **Tailwind CSS** - Utility-First CSS Framework
- **Vitest** - Modernes Testing Framework
- **jsPDF + html2canvas** - PDF-Generierung
- **GitHub Actions** - CI/CD Pipeline

## 📦 Installation

1. Repository klonen:
```bash
git clone git@github.com:Huskynarr/AQ-50.git
cd AQ-50
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm run dev
```

## 🛠️ Verfügbare Scripts

```bash
# Entwicklung
npm run dev          # Entwicklungsserver starten
npm run build        # Produktions-Build erstellen
npm run preview      # Build-Vorschau lokal testen

# Testing
npm run test         # Tests im Watch-Modus
npm run test:run     # Tests einmalig ausführen
npm run test:ui      # Test-UI öffnen
npm run test:coverage # Test-Coverage generieren

# Code-Qualität
npm run lint         # ESLint ausführen

# Deployment
npm run deploy       # Auf GitHub Pages deployen
```

## 🚀 Deployment

### GitHub Pages (Automatisch)
Das Projekt wird automatisch auf GitHub Pages deployed bei:
- Push auf `main` Branch
- Erstellung eines neuen Releases

### Manuelles Deployment
```bash
npm run build
npm run deploy
```

## 🧪 Testing

Das Projekt verwendet Vitest für Unit Tests:

```bash
# Tests ausführen
npm run test

# Tests mit Coverage
npm run test:coverage

# Test UI öffnen
npm run test:ui
```

## 📊 Scoring-System

Der AQ-50 Test verwendet ein wissenschaftlich validiertes Bewertungssystem:

- **0-21 Punkte**: Normaler Bereich
- **22-25 Punkte**: Grenzbereich  
- **26-31 Punkte**: Erhöhter Bereich
- **32-50 Punkte**: Hoher Bereich (professionelle Beratung empfohlen)

### Subskalen
1. **Soziale Fertigkeiten** (10 Fragen)
2. **Aufmerksamkeitswechsel** (10 Fragen)
3. **Aufmerksamkeit für Details** (10 Fragen)
4. **Kommunikation** (10 Fragen)
5. **Vorstellungskraft** (10 Fragen)

## 🔧 Konfiguration

### Vite Konfiguration
Die Anwendung ist für GitHub Pages optimiert konfiguriert.

### Tailwind CSS
Dark Mode ist über die `class` Strategie aktiviert.

### TypeScript
Strict Mode ist aktiviert für maximale Typsicherheit.

## 🤝 Contributing

1. Fork des Repositories erstellen
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📝 Changelog

### v2.0.0 (2025-01-26)
- ✨ Dark Mode Support mit System-Präferenz-Erkennung
- ✨ Erweiterte Subskalen-Analyse mit 5 Kategorien
- ✨ Keyboard Navigation (Tasten 1-4)
- ✨ Auto-Save Funktionalität
- ✨ Verbesserte PDF-Exports mit detaillierter Auswertung
- ✨ Responsive Design Verbesserungen
- ✨ Accessibility Enhancements
- ✨ Unit Testing Suite
- ✨ CI/CD Pipeline
- ✨ Navigation Controls (Vor/Zurück)

### v1.2.0 (2025-01-26)
- ✨ PDF-Export Funktionalität
- 🐛 Verschiedene Bugfixes

### v1.0.0 (Initial Release)
- ✨ Grundlegende AQ-50 Test Funktionalität
- ✨ 50 Fragen basierend auf offiziellem Fragebogen
- ✨ Einfache Auswertung

## ⚠️ Wichtiger Hinweis

Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- [Autism Research Centre](https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf) für den offiziellen AQ-50 Fragebogen
- React.js Community für das großartige Framework
- Tailwind CSS Team für das utility-first CSS Framework

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- [Website](https://huskynarr.de) besuchen
- [Live Demo](https://huskynarr.github.io/AQ-50) testen

---

**Made with ❤️ by [Huskynarr](https://huskynarr.de)** 