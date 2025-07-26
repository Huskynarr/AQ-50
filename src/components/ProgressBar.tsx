import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 ${className}`}>
      <div 
        className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      >
      </div>
      <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        Frage {current} von {total} ({percentage}%)
      </div>
    </div>
  );
};

export default ProgressBar;
