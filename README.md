# AQ-50 Online-Selbsttest

Eine datensparsame, barrierearme Web-Umsetzung des Autism-Spectrum Quotient (AQ-50) für Erwachsene ab 16 Jahren. Die Anwendung nutzt die offizielle deutsche 50-Item-Fassung und den binären Original-Auswertungsschlüssel.

> Der AQ-50 ist ein Selbstbeurteilungs- und Screening-Instrument, keine Diagnose. Das Ergebnis kann Autismus weder bestätigen noch ausschließen. Angaben ohne Gewähr.

## Wissenschaftliche Grundlage

- **Fragebogen:** [Autism Research Centre – AQ Adult German (PDF)](https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf)
- **Entwicklung und Originalstudie:** Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J. & Clubley, E. (2001). *The Autism-Spectrum Quotient (AQ): Evidence from Asperger Syndrome/High-Functioning Autism, Males and Females, Scientists and Mathematicians.* Journal of Autism and Developmental Disorders, 31, 5–17. [doi:10.1023/A:1005653411471](https://doi.org/10.1023/A:1005653411471)
- **Deutsche Evaluation und Ableitung des AQ-k:** Freitag, C. M. et al. (2007). *Evaluation der deutschen Version des Autismus-Spektrum-Quotienten (AQ) – die Kurzversion AQ-k.* Zeitschrift für Klinische Psychologie und Psychotherapie, 36(4), 280–289. [doi:10.1026/1616-3443.36.4.280](https://doi.org/10.1026/1616-3443.36.4.280)

Die Originalstudie schlug 32 Punkte als nützlichen Schwellenwert für klinisch bedeutsame autistische Merkmale vor. In ihrer Stichprobe erreichten 80 % der 58 Erwachsenen der damaligen AS/HFA-Gruppe und 2 % der 174 Kontrollpersonen mindestens 32 Punkte. Das ist keine individuelle Diagnosewahrscheinlichkeit. Bezeichnungen und Vergleichswerte werden in der App als historischer Studienkontext kenntlich gemacht.

## Funktionen

- 50 offizielle deutsche Aussagen und offizieller Auswertungsschlüssel
- Gesamtwert und fünf deskriptive Subskalen
- Quellen und methodische Grenzen direkt in der Auswertung
- lokales Autosave und wiederherstellbares Ergebnis ohne Serverübertragung
- Tastaturbedienung, Fokusmanagement, Dark Mode und Reduced-Motion-Unterstützung
- PDF-Bericht mit Antworten, Quellen und Disclaimer
- responsive Oberfläche ohne externes UI-Framework

## Entwicklung

Voraussetzung: Node.js 22 oder neuer.

```bash
npm ci
npm run dev
```

Qualitätsprüfung:

```bash
npm run lint
npm run test:run
npm run test:e2e
npm run build
npm audit
```

Der Stack verwendet React 19, React Router 7, Vite 8, TypeScript 5.9, ESLint 10, Vitest 4 und Playwright. `npm run check` führt Linting, Unit-/Komponententests, Desktop- und Mobile-E2E-Tests sowie den Produktions-Build aus. Das Deployment nach GitHub Pages erfolgt erst nach erfolgreichen Prüfungen über einen einzelnen GitHub-Actions-Workflow.

## Datenschutz

Fortschritt, Ergebnis und Theme-Einstellung werden ausschließlich im `localStorage` des Browsers gespeichert. Die Anwendung besitzt kein Backend, bindet keine externen Schriftarten ein und überträgt keine Antworten. Erst das bewusste Öffnen eines externen Quellenlinks stellt eine Verbindung zu dessen Anbieter her.

## Lizenz

Quellcode: [MIT](LICENSE). Rechte und Nutzungsbedingungen des Fragebogens verbleiben bei dessen Autor:innen beziehungsweise Herausgebern.
