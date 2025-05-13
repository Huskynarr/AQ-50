# AQ-50 Online Test

Ein webbasierter Test zur Erfassung des Autismus-Spektrum-Quotienten (AQ-50) basierend auf dem offiziellen Fragebogen des Autism Research Centre.

## Beschreibung

Diese Anwendung ermöglicht es Benutzern, den AQ-50 Test online durchzuführen. Der Test besteht aus 50 Fragen, die verschiedene Aspekte des Autismus-Spektrums erfassen. Die Fragen basieren auf dem offiziellen deutschen AQ-50 Fragebogen.

## Technologien

- React.js
- TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)

## Installation

1. Klonen Sie das Repository:
```bash
git clone git@github.com:Huskynarr/AQ-50.git
```

2. Installieren Sie die Abhängigkeiten:
```bash
npm install
```

3. Starten Sie den Entwicklungsserver:
```bash
npm run dev
```

## Build-Prozess

1. Für die Produktionsversion bauen:
```bash
npm run build
```
Dies erstellt einen optimierten Build im `dist` Verzeichnis.

2. Vorschau der Produktionsversion lokal testen:
```bash
npm run preview
```

3. Deployment:
- Der Build kann auf jedem statischen Webhosting-Dienst deployed werden
- Die Dateien im `dist` Verzeichnis müssen auf den Webserver hochgeladen werden
- Für optimale Performance wird ein CDN empfohlen

### Deployment auf GitHub Pages

1. Fügen Sie die `homepage`-Eigenschaft in `package.json` hinzu:
```json
{
  "homepage": "https://huskynarr.github.io/AQ-50"
}
```

2. Installieren Sie das GitHub Pages Deployment-Paket:
```bash
npm install gh-pages --save-dev
```

3. Fügen Sie die Deployment-Skripte in `package.json` hinzu:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deployment durchführen:
```bash
npm run deploy
```

5. GitHub Repository-Einstellungen:
   - Gehen Sie zu "Settings" > "Pages"
   - Wählen Sie unter "Source" den Branch "gh-pages"
   - Wählen Sie den Ordner "/ (root)"
   - Klicken Sie auf "Save"

Die Anwendung ist nun unter `https://huskynarr.github.io/AQ-50` verfügbar.

## Verwendung

1. Öffnen Sie die Anwendung in Ihrem Browser
2. Lesen Sie die Einleitung und Anweisungen
3. Beantworten Sie alle 50 Fragen
4. Am Ende erhalten Sie eine Zusammenfassung Ihrer Antworten

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## Hinweis

Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen. 