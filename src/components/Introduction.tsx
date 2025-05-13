import React from 'react';
import { useNavigate } from 'react-router-dom';

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">AQ-50 Test</h1>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Willkommen zum AQ-50 Test. Dieser Test besteht aus 50 Fragen und dient zur Erfassung des Autismus-Spektrum-Quotienten.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h2 className="font-semibold mb-2">Wichtige Hinweise:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Der Test dauert etwa 10-15 Minuten</li>
            <li>Bitte beantworten Sie alle Fragen</li>
            <li>Es gibt keine richtigen oder falschen Antworten</li>
            <li>Wählen Sie die Antwort, die am besten zu Ihnen passt</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-sm">
            Hinweis: Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. 
            Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen.
          </p>
        </div>

        <button
          onClick={() => navigate('/test')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Test starten
        </button>
      </div>
    </div>
  );
};

export default Introduction; 