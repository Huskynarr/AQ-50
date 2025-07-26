import React from 'react';
import { useNavigate } from 'react-router-dom';

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  const clearSavedProgress = () => {
    localStorage.removeItem('aq50-progress');
    navigate('/test');
  };

  const hasSavedProgress = localStorage.getItem('aq50-progress') !== null;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">AQ-50 Test</h1>
      
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          Willkommen zum AQ-50 Test. Dieser Test besteht aus 50 Fragen und dient zur Erfassung des Autismus-Spektrum-Quotienten.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
          <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">Wichtige Hinweise:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Der Test dauert etwa 10-15 Minuten</li>
            <li>Bitte beantworten Sie alle Fragen</li>
            <li>Es gibt keine richtigen oder falschen Antworten</li>
            <li>Wählen Sie die Antwort, die am besten zu Ihnen passt</li>
            <li>Ihr Fortschritt wird automatisch gespeichert</li>
            <li>Verwenden Sie die Tasten 1-4 für schnelle Navigation</li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Hinweis: Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. 
            Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen.
          </p>
        </div>

        {hasSavedProgress && (
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Es wurde ein gespeicherter Fortschritt gefunden. Möchten Sie fortfahren oder neu beginnen?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/test')}
                className="flex-1 bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm"
              >
                Fortfahren
              </button>
              <button
                onClick={clearSavedProgress}
                className="flex-1 bg-gray-600 dark:bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Neu beginnen
              </button>
            </div>
          </div>
        )}

        {!hasSavedProgress && (
          <button
            onClick={() => navigate('/test')}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Test starten
          </button>
        )}
      </div>
    </div>
  );
};

export default Introduction; 