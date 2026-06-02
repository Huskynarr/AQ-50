import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { questions, getAnswerLabel } from '../data/questions';
import { calculateDetailedScore } from '../utils/scoring';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('aq50-progress');
    if (savedProgress) {
      const { currentQuestion: savedQuestion, answers: savedAnswers } = JSON.parse(savedProgress);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save progress to localStorage whenever answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('aq50-progress', JSON.stringify({
        currentQuestion,
        answers
      }));
    }
  }, [currentQuestion, answers]);

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && answers[questions[currentQuestion].id] !== undefined) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleAnswer = useCallback((value: number) => {
    const questionId = questions[currentQuestion].id;
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Score über die zentrale Auswertungslogik berechnen (einzige Quelle der Wahrheit)
      const score = calculateDetailedScore(updatedAnswers).totalScore;
      // Gespeicherten Fortschritt nach Abschluss entfernen
      localStorage.removeItem('aq50-progress');
      navigate('/results', { state: { score, answers: updatedAnswers } });
    }
  }, [answers, currentQuestion, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key >= '1' && event.key <= '4') {
        const value = parseInt(event.key) - 1;
        handleAnswer(value);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAnswer]);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-md">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      <div 
        role="main"
        aria-live="polite"
        aria-label={`Frage ${currentQuestion + 1} von ${questions.length}`}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {questions[currentQuestion].text}
        </h2>

        <fieldset className="space-y-3">
          <legend className="sr-only">
            Antwortmöglichkeiten für Frage {currentQuestion + 1}
          </legend>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Tipp: Verwenden Sie die Tasten 1-4 für schnelle Antworten
          </div>
          
          {[0, 1, 2, 3].map((value) => (
            <label
              key={value}
              className={`block w-full p-3 text-left border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus-within:bg-blue-50 dark:focus-within:bg-blue-900 focus-within:border-blue-500 transition-colors cursor-pointer text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                answers[questions[currentQuestion].id] === value ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''
              }`}
            >
              <input
                type="radio"
                name={`question-${questions[currentQuestion].id}`}
                value={value}
                checked={answers[questions[currentQuestion].id] === value}
                onChange={() => handleAnswer(value)}
                className="sr-only"
                aria-describedby={`answer-${value}-description`}
              />
              <div className="flex items-center">
                <span className="flex-shrink-0 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-3">
                  {value + 1}
                </span>
                <span className="flex-1" id={`answer-${value}-description`}>
                  {getAnswerLabel(value)}
                </span>
                {answers[questions[currentQuestion].id] === value && (
                  <span className="flex-shrink-0 text-blue-600 dark:text-blue-400 ml-2" aria-hidden="true">
                    ✓
                  </span>
                )}
              </div>
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zur vorherigen Frage"
          >
            ← Zurück
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestion === questions.length - 1 || answers[questions[currentQuestion].id] === undefined}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zur nächsten Frage"
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test; 