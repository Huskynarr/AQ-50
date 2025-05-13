import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  score: number;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state as LocationState;

  const getInterpretation = (score: number) => {
    if (score >= 32) {
      return "Ein Wert von 32 oder höher deutet auf eine hohe Wahrscheinlichkeit (80%) einer Autismus-Spektrum-Störung (ASS) hin.";
    } else if (score >= 26) {
      return "Ein Wert zwischen 26 und 31 deutet auf ein erhöhtes Maß autistischer Züge hin (ca. 62,5% Wahrscheinlichkeit).";
    } else if (score >= 20) {
      return "Ein Wert zwischen 20 und 25 deutet auf ein mittleres Maß autistischer Züge hin (ca. 50% Wahrscheinlichkeit).";
    } else {
      return "Ein Wert unter 20 deutet auf ein niedriges Maß autistischer Züge hin. Der statistische Mittelwert für Personen ohne ASS liegt bei 16,4 (41% Wahrscheinlichkeit).";
    }
  };

  const getPercentage = (score: number) => {
    // Berechnung der Wahrscheinlichkeit basierend auf den Angaben aus dem AQ-50 Dokument
    if (score >= 40) {
      return Math.min(100 + (score - 40) * 2.5, 125); // Kann über 100% gehen nach offizieller Tabelle
    } else if (score >= 32) {
      return 80 + (score - 32) * (20 / 8); // Linear zwischen 80% und 100%
    } else if (score >= 25) {
      return 62.5 + (score - 25) * (17.5 / 7); // Linear zwischen 62,5% und 80%
    } else if (score >= 20) {
      return 50 + (score - 20) * (12.5 / 5); // Linear zwischen 50% und 62,5%
    } else if (score >= 16.4) {
      return 41 + (score - 16.4) * (9 / 3.6); // Linear zwischen 41% und 50%
    } else {
      return score * (41 / 16.4); // Linear zwischen 0% und 41%
    }
  };

  const renderHelpResources = () => {
    if (score < 20) return null;

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Hilfreiche Ressourcen</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Selbsthilfegruppen</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="https://www.autismus.de" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    Bundesverband Autismus Deutschland e.V.
                  </a>
                </li>
                <li>
                  <a href="https://www.asperger-autismus.ch" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    Autismus Deutsche Schweiz
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Online-Ressourcen</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="https://www.autismus-kultur.de" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    Autismus-Kultur - Informationen und Hilfestellungen
                  </a>
                </li>
                <li>
                  <a href="https://www.asperger-welt.de" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    Asperger-Welt - Community und Austausch
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Beratungsstellen</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="https://www.autismus-berlin.de" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    Autismus-Beratung Berlin
                  </a>
                </li>
                <li>
                  <a href="https://www.autismus-hamburg.de" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    Autismus-Zentrum Hamburg
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Wichtige Hinweise</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Bitte beachten Sie, dass die Wartezeiten für eine professionelle Diagnose und Therapie 
              oft sehr lang sind. Während der Wartezeit können Selbsthilfegruppen und Online-Ressourcen 
              eine wichtige Unterstützung bieten.
            </p>
            <p className="text-gray-700">
              Für eine offizielle Diagnose und professionelle Unterstützung empfehlen wir:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Kontaktaufnahme mit dem Hausarzt für eine Überweisung</li>
              <li>Suche nach spezialisierten Autismus-Ambulanzen</li>
              <li>Kontakt mit örtlichen Autismus-Verbänden</li>
              <li>Anfrage bei der Krankenkasse nach spezialisierten Therapeuten</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Ihr Testergebnis</h1>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">Ihr AQ-50 Score:</p>
          <p className="text-4xl font-bold text-blue-600">{score}</p>
          <p className="text-lg mt-2">
            (entspricht ca. {getPercentage(score).toFixed(1)}% Wahrscheinlichkeit einer ASS)
          </p>
        </div>

        <div className="relative w-full h-6 bg-gray-200 rounded-full">
          <div 
            className="absolute h-6 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
            style={{ width: `${Math.min(getPercentage(score), 100)}%` }}
          ></div>
          <div className="absolute w-full h-full px-2 flex justify-between items-center text-xs">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Interpretation</h2>
          <p className="text-gray-700">{getInterpretation(score)}</p>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Referenzwerte nach AQ-50:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>16,4 Punkte: Statistischer Mittelwert bei Personen ohne ASS (41%)</li>
              <li>20 Punkte: 50% Wahrscheinlichkeit</li>
              <li>25 Punkte: 62,5% Wahrscheinlichkeit</li>
              <li>32 Punkte: 80% Wahrscheinlichkeit (Schwellwert für ASS)</li>
              <li>40 Punkte: 100% Wahrscheinlichkeit</li>
              <li>50 Punkte: 125% Wahrscheinlichkeit (maximaler Wert)</li>
            </ul>
          </div>
        </div>

        {renderHelpResources()}

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Wichtiger Hinweis</h2>
          <p className="text-gray-700">
            Bitte beachten Sie, dass dieser Test nur ein Screening-Instrument ist und keine 
            professionelle Diagnose ersetzt. Bei Fragen oder Bedenken wenden Sie sich bitte 
            an einen qualifizierten Facharzt oder Psychologen.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Zurück zum Start
        </button>
      </div>
    </div>
  );
};

export default Results; 