import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 pb-4 border-b border-gray-700">
            <p className="text-center mb-2">
              Basierend auf dem offiziellen AQ-50 Fragebogen des 
              <a 
                href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 ml-1"
              >
                Autism Research Centre
              </a>
            </p>
            <p className="text-center text-gray-400 text-sm">
              Dieser Test dient lediglich zur Selbsteinschätzung und ersetzt keine professionelle Diagnose.
              Alle Angaben sind ohne Gewähr und müssen von Fachpersonal bestätigt werden.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              Open Source auf 
              <a 
                href="https://github.com/Huskynarr/AQ-50" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 ml-1"
              >
                GitHub
              </a>
            </p>
            <p className="text-gray-400">
              Made with <span className="text-red-500">❤</span> by 
              <a 
                href="https://huskynarr.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 ml-1"
              >
                Huskynarr
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 