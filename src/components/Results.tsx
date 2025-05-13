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
      return "Ein Wert von 32 oder höher deutet auf ein erhöhtes Maß an autistischen Zügen hin.";
    } else if (score >= 26) {
      return "Ein Wert zwischen 26 und 31 deutet auf ein mittleres Maß an autistischen Zügen hin.";
    } else {
      return "Ein Wert unter 26 deutet auf ein niedriges Maß an autistischen Zügen hin.";
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
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Interpretation</h2>
          <p className="text-gray-700">{getInterpretation(score)}</p>
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