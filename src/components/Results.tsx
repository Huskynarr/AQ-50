import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';
import { calculateDetailedScore, subscales, normValues } from '../utils/scoring';

interface LocationState {
  score: number;
  answers?: { [key: number]: number };
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers } = location.state as LocationState;
  const [activeTab, setActiveTab] = useState<'overview' | 'subscales' | 'comparison'>('overview');

  // Berechne detaillierte Auswertung
  const detailedScore = answers ? calculateDetailedScore(answers) : null;

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
      default: return "";
    }
  };

  const handleDownloadPDF = async () => {
    if (!answers) return;
    
    const answersArray = Object.entries(answers).map(([questionId, answerValue]) => ({
      questionId: parseInt(questionId),
      answer: getAnswerLabel(answerValue),
      question: questions[parseInt(questionId) - 1]
    }));

    await generatePDF(score, answersArray, detailedScore);
  };

  const getScoreColor = (score: number) => {
    if (score >= 32) return 'text-red-600 dark:text-red-400';
    if (score >= 26) return 'text-orange-600 dark:text-orange-400';
    if (score >= 22) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 32) return 'bg-red-100 dark:bg-red-900';
    if (score >= 26) return 'bg-orange-100 dark:bg-orange-900';
    if (score >= 22) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-green-100 dark:bg-green-900';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Ihre AQ-50 Testergebnisse
      </h1>

      {/* Score Overview */}
      <div className={`text-center p-6 rounded-lg mb-8 ${getScoreBackground(score)}`}>
        <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          von 50 möglichen Punkten
        </div>
        {detailedScore && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {detailedScore.interpretation}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Übersicht
        </button>
        <button
          onClick={() => setActiveTab('subscales')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'subscales'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Subskalen
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'comparison'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Vergleich
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Interpretation Ihres Ergebnisses
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>0-21 Punkte:</strong> Normaler Bereich - Keine auffälligen autistischen Züge</p>
              <p><strong>22-25 Punkte:</strong> Grenzbereich - Einige autistische Züge können vorhanden sein</p>
              <p><strong>26-31 Punkte:</strong> Erhöhter Bereich - Möglicherweise liegen autistische Züge vor</p>
              <p><strong>32-50 Punkte:</strong> Hoher Bereich - Professionelle Beratung wird empfohlen</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Wichtiger Hinweis
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. 
              Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'subscales' && detailedScore && (
        <div className="space-y-6">
          {subscales.map((subscale) => {
            const subscaleScore = detailedScore.subscaleScores[subscale.name];
            return (
              <div key={subscale.name} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {subscale.name}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {subscaleScore.score}/{subscaleScore.maxScore}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {subscale.description}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${subscaleScore.percentage}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {subscaleScore.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Vergleich mit Normwerten
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Ihr Ergebnis:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{score} Punkte</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Allgemeinbevölkerung (Durchschnitt):</span>
                <span className="text-gray-600 dark:text-gray-400">{normValues.general.mean} Punkte</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Studierende (Durchschnitt):</span>
                <span className="text-gray-600 dark:text-gray-400">{normValues.students.mean} Punkte</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Personen mit Autismus (Durchschnitt):</span>
                <span className="text-gray-600 dark:text-gray-400">{normValues.autism.mean} Punkte</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          📄 Ergebnisse als PDF herunterladen
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          🔄 Test erneut durchführen
        </button>
      </div>
    </div>
  );
};

export default Results;
