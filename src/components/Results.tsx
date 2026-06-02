import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';
import { calculateDetailedScore, subscales, normValues } from '../utils/scoring';
import { questions, getAnswerLabel } from '../data/questions';

interface LocationState {
  score: number;
  answers?: { [key: number]: number };
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [activeTab, setActiveTab] = useState<'overview' | 'subscales' | 'comparison'>('overview');

  // Bei direktem Aufruf ohne Testergebnis zurück zur Startseite leiten
  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { score, answers } = state;

  // Berechne detaillierte Auswertung
  const detailedScore = answers ? calculateDetailedScore(answers) : null;

  const handleDownloadPDF = async () => {
    if (!answers) return;

    const answersArray = Object.entries(answers).map(([questionId, answerValue]) => ({
      questionId: parseInt(questionId),
      answer: getAnswerLabel(answerValue),
      question: questions[parseInt(questionId) - 1].text
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
