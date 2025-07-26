import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';

interface Answer {
  questionId: number;
  answer: string;
  question: string;
}

interface LocationState {
  score: number;
  answers?: { [key: number]: number };
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers } = location.state as LocationState;

  // Die vollständigen 50 Fragen des AQ-50 Tests
  const questions = [
    "Ich tue Dinge lieber mit anderen gemeinsam als alleine.",
    "Ich mache Dinge am liebsten immer wieder auf dieselbe Art und Weise.",
    "Wenn ich mir etwas vorzustellen versuche, fällt es mir leicht, mir ein Bild davon in meinem Kopf zu machen.",
    "Ich lasse mich oft so stark von einer Sache gefangen nehmen, dass ich andere Dinge aus den Augen verliere.",
    "Oft bemerke ich kleine Geräusche, wenn andere nichts hören.",
    "Ich achte häufig auf Auto- und Kennzeichen oder ähnliche Abfolgen von Informationen.",
    "Andere Leute sagen mir oft, dass das, was ich gesagt habe, unhöflich sei, obwohl ich selbst denke, dass es höflich ist.",
    "Wenn ich mir eine Geschichte ausdenke, kann ich mir leicht vorstellen, wie die Charaktere aussehen könnten und wie sie sich verhalten würden.",
    "Ich bin fasziniert von Datumsangaben.",
    "In einer Gruppe kann ich verschiedenen Unterhaltungen mehrerer Leute mühelos folgen.",
    "Ich kann gut mit sozialen Situationen umgehen.",
    "Ich neige dazu, Details zu bemerken, die anderen nicht auffallen.",
    "Ich würde lieber in eine Bibliothek als auf eine Party gehen.",
    "Ich kann mir leicht Geschichten ausdenken.",
    "Ich fühle mich stärker zu Menschen als zu Dingen hingezogen.",
    "Ich neige dazu, sehr starke Interessen zu haben, und bin aufgebracht, wenn ich diesen nicht nachgehen kann.",
    "Ich genieße Small Talk.",
    "Wenn ich rede, ist es für andere nicht immer leicht, zu Wort zu kommen.",
    "Zahlen faszinieren mich.",
    "Wenn ich mir eine Geschichte anhöre oder lese, finde ich es schwierig, mir die Absichten der Charaktere vorzustellen.",
    "Ich lese nicht gerne Literatur.",
    "Ich finde es schwierig, neue Freunde zu finden.",
    "Ich bemerke ständig Muster in verschiedenen Dingen.",
    "Ich würde lieber ins Theater als in ein Museum gehen.",
    "Es stört mich nicht, wenn meine tägliche Routine unterbrochen wird.",
    "Ich bemerke oft, dass ich nicht weiß, wie man ein Gespräch am Laufen hält.",
    "Ich finde es leicht, zwischen den Zeilen zu lesen wenn jemand mit mir spricht.",
    "Ich konzentriere mich normalerweise mehr auf das Gesamtbild als auf kleine Details.",
    "Ich bin nicht sehr gut darin, mir Telefonnummern zu merken.",
    "Ich bemerke gewöhnlich keine kleinen Veränderungen in einer Situation oder im Erscheinungsbild einer Person.",
    "Ich kann merken, ob jemand, der mir zuhört, gelangweilt ist.",
    "Ich finde es leicht, mehr als eine Sache gleichzeitig zu tun.",
    "Am Telefon bin ich mir nicht sicher, wann ich an der Reihe bin zu sprechen.",
    "Ich unternehme Dinge gerne spontan.",
    "Ich kann oft vorhersagen, was jemand gleich tun wird.",
    "Ich bin gut darin, Situationen zu meistern, in denen es um gesellschaftliche Zusammenkünfte oder soziale Interaktionen geht.",
    "Wenn ich mit jemandem rede, fällt es mir leicht zu verstehen, was sie statt meiner sagen könnten.",
    "Ich bin oft in Dinge vertieft, die ich tue, sodass ich vergesse, was um mich herum passiert.",
    "Leute sagen mir, dass ich immer wieder auf dasselbe Thema zurückkomme.",
    "Als Kind mochte ich gerne Spiele spielen, bei denen man so tut, als wäre man jemand anderes.",
    "Ich sammle gerne Informationen über Kategorien von Dingen (z.B. Autotypen, Vogelarten, Zugarten, Pflanzenarten).",
    "Ich finde es schwierig, mir vorzustellen, wie es wäre, jemand anderes zu sein.",
    "Ich plane sorgfältig alle Aktivitäten, die ich unternehme.",
    "Ich genieße soziale Anlässe.",
    "Ich finde es schwierig, die Absichten anderer Menschen zu erkennen.",
    "Neue Situationen machen mich ängstlich.",
    "Ich treffe gerne neue Menschen.",
    "Ich bin ein guter Diplomat.",
    "Ich bin nicht sehr gut darin, mich an Geburtsdaten zu erinnern.",
    "Ich finde es sehr leicht, mit Kindern Spiele zu spielen, bei denen man so tut, als wäre man jemand anderes."
  ];

  const getAnswerLabel = (value: number) => {
    switch(value) {
      case 0: return "Ich stimme nicht zu";
      case 1: return "Ich stimme eher nicht zu";
      case 2: return "Ich stimme eher zu";
      case 3: return "Ich stimme zu";
      default: return "Keine Antwort";
    }
  };

  const handleDownloadPDF = () => {
    if (!answers) {
      alert('Keine Antwortdaten verfügbar für PDF-Export.');
      return;
    }

    const formattedAnswers: Answer[] = Object.entries(answers).map(([questionIdStr, answerValue]) => {
      const questionId = parseInt(questionIdStr);
      return {
        questionId,
        answer: getAnswerLabel(answerValue),
        question: questions[questionId - 1] || `Frage ${questionId}`
      };
    });

    const pdfData = {
      score,
      answers: formattedAnswers,
      date: new Date().toLocaleDateString('de-DE')
    };

    generatePDF(pdfData);
  };

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

        <div className="flex gap-4">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF-Auswertung herunterladen
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Zurück zum Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results; 