import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  // reverseScored ist nicht mehr nötig, da wir eine spezifischere Auswertungslogik implementieren
}

// Die vollständigen 50 Fragen des AQ-50 Tests
const questions: Question[] = [
  { id: 1, text: "Ich tue Dinge lieber mit anderen gemeinsam als alleine." },
  { id: 2, text: "Ich mache Dinge am liebsten immer wieder auf dieselbe Art und Weise." },
  { id: 3, text: "Wenn ich mir etwas vorzustellen versuche, fällt es mir leicht, mir ein Bild davon in meinem Kopf zu machen." },
  { id: 4, text: "Ich lasse mich oft so stark von einer Sache gefangen nehmen, dass ich andere Dinge aus den Augen verliere." },
  { id: 5, text: "Oft bemerke ich kleine Geräusche, wenn andere nichts hören." },
  { id: 6, text: "Ich achte häufig auf Auto- und Kennzeichen oder ähnliche Abfolgen von Informationen." },
  { id: 7, text: "Andere Leute sagen mir oft, dass das, was ich gesagt habe, unhöflich sei, obwohl ich selbst denke, dass es höflich ist." },
  { id: 8, text: "Wenn ich mir eine Geschichte ausdenke, kann ich mir leicht vorstellen, wie die Charaktere aussehen könnten und wie sie sich verhalten würden." },
  { id: 9, text: "Ich bin fasziniert von Datumsangaben." },
  { id: 10, text: "In einer Gruppe kann ich verschiedenen Unterhaltungen mehrerer Leute mühelos folgen." },
  { id: 11, text: "Ich kann gut mit sozialen Situationen umgehen." },
  { id: 12, text: "Ich neige dazu, Details zu bemerken, die anderen nicht auffallen." },
  { id: 13, text: "Ich würde lieber in eine Bibliothek als auf eine Party gehen." },
  { id: 14, text: "Ich kann mir leicht Geschichten ausdenken." },
  { id: 15, text: "Ich fühle mich stärker zu Menschen als zu Dingen hingezogen." },
  { id: 16, text: "Ich neige dazu, sehr starke Interessen zu haben, und bin aufgebracht, wenn ich diesen nicht nachgehen kann." },
  { id: 17, text: "Ich genieße Small Talk." },
  { id: 18, text: "Wenn ich rede, ist es für andere nicht immer leicht, zu Wort zu kommen." },
  { id: 19, text: "Zahlen faszinieren mich." },
  { id: 20, text: "Wenn ich mir eine Geschichte anhöre oder lese, finde ich es schwierig, mir die Absichten der Charaktere vorzustellen." },
  { id: 21, text: "Ich lese nicht gerne Literatur." },
  { id: 22, text: "Ich finde es schwierig, neue Freunde zu finden." },
  { id: 23, text: "Ich bemerke ständig Muster in verschiedenen Dingen." },
  { id: 24, text: "Ich würde lieber ins Theater als in ein Museum gehen." },
  { id: 25, text: "Es stört mich nicht, wenn meine tägliche Routine unterbrochen wird." },
  { id: 26, text: "Ich bemerke oft, dass ich nicht weiß, wie man ein Gespräch am Laufen hält." },
  { id: 27, text: "Ich finde es leicht, zwischen den Zeilen zu lesen wenn jemand mit mir spricht." },
  { id: 28, text: "Ich konzentriere mich normalerweise mehr auf das Gesamtbild als auf kleine Details." },
  { id: 29, text: "Ich bin nicht sehr gut darin, mir Telefonnummern zu merken." },
  { id: 30, text: "Ich bemerke gewöhnlich keine kleinen Veränderungen in einer Situation oder im Erscheinungsbild einer Person." },
  { id: 31, text: "Ich kann merken, ob jemand, der mir zuhört, gelangweilt ist." },
  { id: 32, text: "Ich finde es leicht, mehr als eine Sache gleichzeitig zu tun." },
  { id: 33, text: "Am Telefon bin ich mir nicht sicher, wann ich an der Reihe bin zu sprechen." },
  { id: 34, text: "Ich unternehme Dinge gerne spontan." },
  { id: 35, text: "Ich kann oft vorhersagen, was jemand gleich tun wird." },
  { id: 36, text: "Ich bin gut darin, Situationen zu meistern, in denen es um gesellschaftliche Zusammenkünfte oder soziale Interaktionen geht." },
  { id: 37, text: "Wenn ich mit jemandem rede, fällt es mir leicht zu verstehen, was sie statt meiner sagen könnten." },
  { id: 38, text: "Ich bin oft in Dinge vertieft, die ich tue, sodass ich vergesse, was um mich herum passiert." },
  { id: 39, text: "Leute sagen mir, dass ich immer wieder auf dasselbe Thema zurückkomme." },
  { id: 40, text: "Als Kind mochte ich gerne Spiele spielen, bei denen man so tut, als wäre man jemand anderes." },
  { id: 41, text: "Ich sammle gerne Informationen über Kategorien von Dingen (z.B. Autotypen, Vogelarten, Zugarten, Pflanzenarten)." },
  { id: 42, text: "Ich finde es schwierig, mir vorzustellen, wie es wäre, jemand anderes zu sein." },
  { id: 43, text: "Ich plane sorgfältig alle Aktivitäten, die ich unternehme." },
  { id: 44, text: "Ich genieße soziale Anlässe." },
  { id: 45, text: "Ich finde es schwierig, die Absichten anderer Menschen zu erkennen." },
  { id: 46, text: "Neue Situationen machen mich ängstlich." },
  { id: 47, text: "Ich treffe gerne neue Menschen." },
  { id: 48, text: "Ich bin ein guter Diplomat." },
  { id: 49, text: "Ich bin nicht sehr gut darin, mich an Geburtsdaten zu erinnern." },
  { id: 50, text: "Ich finde es sehr leicht, mit Kindern Spiele zu spielen, bei denen man so tut, als wäre man jemand anderes." }
];

// Fragen, bei denen "Ich stimme zu"/"Ich stimme eher zu" einen Punkt ergibt
const agreePointQuestions = [2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46];

// Fragen, bei denen "Ich stimme nicht zu"/"Ich stimme eher nicht zu" einen Punkt ergibt
const disagreePointQuestions = [1, 3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 40, 44, 47, 48, 49, 50];

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
    
    Object.entries(answers).forEach(([questionIdStr, answer]) => {
      const questionId = parseInt(questionIdStr);
      const answerValue = answer;
      
      // Überprüfen, ob die Frage zu den Punktefragen gehört
      if (agreePointQuestions.includes(questionId)) {
        // Bei diesen Fragen gibt es Punkte für "Stimme zu" (3,4) und "Stimme eher zu" (2)
        if (answerValue >= 2) {
          totalScore += 1;
        }
      } else if (disagreePointQuestions.includes(questionId)) {
        // Bei diesen Fragen gibt es Punkte für "Stimme nicht zu" (0) und "Stimme eher nicht zu" (1)
        if (answerValue <= 1) {
          totalScore += 1;
        }
      }
    });
    
    return totalScore;
  };

  const getAnswerLabel = (value: number) => {
    switch(value) {
      case 0: return "Ich stimme nicht zu";
      case 1: return "Ich stimme eher nicht zu";
      case 2: return "Ich stimme eher zu";
      case 3: return "Ich stimme zu";
      default: return "";
    }
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
        {[0, 1, 2, 3].map((value) => (
          <button
            key={value}
            onClick={() => handleAnswer(value)}
            className="w-full p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
          >
            {getAnswerLabel(value)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Test; 