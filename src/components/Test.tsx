import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  reverseScored: boolean;
}

// Die vollständigen 50 Fragen des AQ-50 Tests
const questions: Question[] = [
  { id: 1, text: "Ich tue Dinge lieber mit anderen gemeinsam als alleine.", reverseScored: true },
  { id: 2, text: "Ich mache Dinge am liebsten immer wieder auf dieselbe Art und Weise.", reverseScored: false },
  { id: 3, text: "Wenn ich mir etwas vorzustellen versuche, fällt es mir leicht, mir ein Bild davon in meinem Kopf zu machen.", reverseScored: true },
  { id: 4, text: "Ich lasse mich oft so stark von einer Sache gefangen nehmen, dass ich andere Dinge aus den Augen verliere.", reverseScored: false },
  { id: 5, text: "Oft bemerke ich kleine Geräusche, wenn andere nichts hören.", reverseScored: false },
  { id: 6, text: "Ich achte häufig auf Auto- und Kennzeichen oder ähnliche Abfolgen von Informationen.", reverseScored: false },
  { id: 7, text: "Andere Leute sagen mir oft, dass das, was ich gesagt habe, unhöflich sei, obwohl ich selbst denke, dass es höflich ist.", reverseScored: false },
  { id: 8, text: "Wenn ich mir eine Geschichte ausdenke, kann ich mir leicht vorstellen, wie die Charaktere aussehen könnten und wie sie sich verhalten würden.", reverseScored: true },
  { id: 9, text: "Ich bin fasziniert von Datumsangaben.", reverseScored: false },
  { id: 10, text: "In einer Gruppe kann ich verschiedenen Unterhaltungen mehrerer Leute mühelos folgen.", reverseScored: true },
  { id: 11, text: "Ich kann gut mit sozialen Situationen umgehen.", reverseScored: true },
  { id: 12, text: "Ich neige dazu, Details zu bemerken, die anderen nicht auffallen.", reverseScored: false },
  { id: 13, text: "Ich würde lieber in eine Bibliothek als auf eine Party gehen.", reverseScored: false },
  { id: 14, text: "Ich kann mir leicht Geschichten ausdenken.", reverseScored: true },
  { id: 15, text: "Ich fühle mich stärker zu Menschen als zu Dingen hingezogen.", reverseScored: true },
  { id: 16, text: "Ich neige dazu, sehr starke Interessen zu haben, und bin aufgebracht, wenn ich diesen nicht nachgehen kann.", reverseScored: false },
  { id: 17, text: "Ich genieße Small Talk.", reverseScored: true },
  { id: 18, text: "Wenn ich rede, ist es für andere nicht immer leicht, zu Wort zu kommen.", reverseScored: false },
  { id: 19, text: "Zahlen faszinieren mich.", reverseScored: false },
  { id: 20, text: "Wenn ich mir eine Geschichte anhöre oder lese, finde ich es schwierig, mir die Absichten der Charaktere vorzustellen.", reverseScored: false },
  { id: 21, text: "Ich lese nicht gerne Literatur.", reverseScored: false },
  { id: 22, text: "Ich finde es schwierig, neue Freunde zu finden.", reverseScored: false },
  { id: 23, text: "Ich bemerke ständig Muster in verschiedenen Dingen.", reverseScored: false },
  { id: 24, text: "Ich würde lieber ins Theater als in ein Museum gehen.", reverseScored: true },
  { id: 25, text: "Es stört mich nicht, wenn meine tägliche Routine unterbrochen wird.", reverseScored: true },
  { id: 26, text: "Ich bemerke oft, dass ich nicht weiß, wie man ein Gespräch am Laufen hält.", reverseScored: false },
  { id: 27, text: "Ich finde es leicht, zwischen den Zeilen zu lesen wenn jemand mit mir spricht.", reverseScored: true },
  { id: 28, text: "Ich konzentriere mich normalerweise mehr auf das Gesamtbild als auf kleine Details.", reverseScored: true },
  { id: 29, text: "Ich bin nicht sehr gut darin, mir Telefonnummern zu merken.", reverseScored: true },
  { id: 30, text: "Ich bemerke gewöhnlich keine kleinen Veränderungen in einer Situation oder im Erscheinungsbild einer Person.", reverseScored: true },
  { id: 31, text: "Ich kann merken, ob jemand, der mir zuhört, gelangweilt ist.", reverseScored: true },
  { id: 32, text: "Ich finde es leicht, mehr als eine Sache gleichzeitig zu tun.", reverseScored: true },
  { id: 33, text: "Am Telefon bin ich mir nicht sicher, wann ich an der Reihe bin zu sprechen.", reverseScored: false },
  { id: 34, text: "Ich unternehme Dinge gerne spontan.", reverseScored: true },
  { id: 35, text: "Ich kann oft vorhersagen, was jemand gleich tun wird.", reverseScored: true },
  { id: 36, text: "Ich bin gut darin, Situationen zu meistern, in denen es um gesellschaftliche Zusammenkünfte oder soziale Interaktionen geht.", reverseScored: true },
  { id: 37, text: "Wenn ich mit jemandem rede, fällt es mir leicht zu verstehen, was sie statt meiner sagen könnten.", reverseScored: true },
  { id: 38, text: "Ich bin oft in Dinge vertieft, die ich tue, sodass ich vergesse, was um mich herum passiert.", reverseScored: false },
  { id: 39, text: "Leute sagen mir, dass ich immer wieder auf dasselbe Thema zurückkomme.", reverseScored: false },
  { id: 40, text: "Als Kind mochte ich gerne Spiele spielen, bei denen man so tut, als wäre man jemand anderes.", reverseScored: true },
  { id: 41, text: "Ich sammle gerne Informationen über Kategorien von Dingen (z.B. Autotypen, Vogelarten, Zugarten, Pflanzenarten).", reverseScored: false },
  { id: 42, text: "Ich finde es schwierig, mir vorzustellen, wie es wäre, jemand anderes zu sein.", reverseScored: false },
  { id: 43, text: "Ich plane sorgfältig alle Aktivitäten, die ich unternehme.", reverseScored: false },
  { id: 44, text: "Ich genieße soziale Anlässe.", reverseScored: true },
  { id: 45, text: "Ich finde es schwierig, die Absichten anderer Menschen zu erkennen.", reverseScored: false },
  { id: 46, text: "Neue Situationen machen mich ängstlich.", reverseScored: false },
  { id: 47, text: "Ich treffe gerne neue Menschen.", reverseScored: true },
  { id: 48, text: "Ich bin ein guter Diplomat.", reverseScored: true },
  { id: 49, text: "Ich bin nicht sehr gut darin, mich an Geburtsdaten zu erinnern.", reverseScored: true },
  { id: 50, text: "Ich finde es sehr leicht, mit Kindern Spiele zu spielen, bei denen man so tut, als wäre man jemand anderes.", reverseScored: true }
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
          // Bei umgekehrt bewerteten Fragen: 4 wird zu 0, 3 wird zu 1, etc.
          totalScore += 4 - answer;
        } else {
          // Bei normal bewerteten Fragen: Wert direkt hinzufügen
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