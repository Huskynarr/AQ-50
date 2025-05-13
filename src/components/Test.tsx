import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  reverseScored: boolean;
}

const questions: Question[] = [
  { id: 1, text: "Ich finde es leichter, mich mit anderen Menschen zu unterhalten als mit Gegenständen.", reverseScored: true },
  { id: 2, text: "Ich neige dazu, mich auf das Ganze zu konzentrieren, anstatt auf die Details.", reverseScored: true },
  { id: 3, text: "Ich finde es schwierig, ein Gespräch zu führen.", reverseScored: false },
  // ... Add all 50 questions here
];

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score and navigate to results
      const score = calculateScore();
      navigate('/results', { state: { score } });
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        if (question.reverseScored) {
          totalScore += 4 - answer;
        } else {
          totalScore += answer;
        }
      }
    });
    return totalScore;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Frage {currentQuestion + 1} von {questions.length}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {questions[currentQuestion].text}
      </h2>

      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map((value) => (
          <button
            key={value}
            onClick={() => handleAnswer(value)}
            className="w-full p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
          >
            {value === 0 && "Trifft überhaupt nicht zu"}
            {value === 1 && "Trifft eher nicht zu"}
            {value === 2 && "Teils/teils"}
            {value === 3 && "Trifft eher zu"}
            {value === 4 && "Trifft voll und ganz zu"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Test; 