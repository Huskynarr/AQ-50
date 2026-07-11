// AQ-50 Subskalen-Definitionen
export interface Subscale {
  name: string;
  description: string;
  questions: number[];
  agreePoints: number[];
  disagreePoints: number[];
}

export const subscales: Subscale[] = [
  {
    name: "Soziale Fertigkeiten",
    description: "Schwierigkeiten in sozialen Situationen und zwischenmenschlichen Beziehungen",
    questions: [1, 11, 13, 15, 22, 36, 44, 45, 47, 48],
    agreePoints: [13, 22, 45],
    disagreePoints: [1, 11, 15, 36, 44, 47, 48]
  },
  {
    name: "Aufmerksamkeitswechsel",
    description: "Schwierigkeiten beim Wechsel der Aufmerksamkeit zwischen verschiedenen Aktivitäten",
    questions: [2, 4, 10, 16, 25, 32, 34, 37, 43, 46],
    agreePoints: [2, 4, 16, 43, 46],
    disagreePoints: [10, 25, 32, 34, 37]
  },
  {
    name: "Aufmerksamkeit für Details",
    description: "Starke Fokussierung auf Details und Muster",
    questions: [5, 6, 9, 12, 19, 23, 28, 29, 30, 49],
    agreePoints: [5, 6, 9, 12, 19, 23],
    disagreePoints: [28, 29, 30, 49]
  },
  {
    name: "Kommunikation",
    description: "Schwierigkeiten in der verbalen und nonverbalen Kommunikation",
    questions: [7, 17, 18, 26, 27, 31, 33, 35, 38, 39],
    // Item 35 ist im offiziellen AQ-50-Schlüssel ein "Zustimmung gibt Punkt"-Item.
    agreePoints: [7, 18, 26, 33, 35, 39],
    disagreePoints: [17, 27, 31, 38]
  },
  {
    name: "Vorstellungskraft",
    description: "Schwierigkeiten mit Fantasie und Vorstellungskraft",
    questions: [3, 8, 14, 20, 21, 24, 40, 41, 42, 50],
    agreePoints: [20, 21, 41, 42],
    disagreePoints: [3, 8, 14, 24, 40, 50]
  }
];

export interface DetailedScore {
  totalScore: number;
  subscaleScores: {
    [key: string]: {
      score: number;
      maxScore: number;
      percentage: number;
    };
  };
  interpretation: string;
}

const getInterpretation = (score: number): string => {
  if (score >= 32) {
    return "Der Wert liegt über dem in der Originalstudie vorgeschlagenen Schwellenwert von 32. Das ist keine Diagnose; bei Leidensdruck kann eine fachliche Abklärung sinnvoll sein.";
  }
  return "Der Wert liegt unter dem in der Originalstudie vorgeschlagenen Schwellenwert von 32. Auch ein niedrigerer Wert kann Autismus nicht ausschließen.";
};

export function calculateDetailedScore(answers: { [key: number]: number }): DetailedScore {
  let totalScore = 0;
  const subscaleScores: { [key: string]: { score: number; maxScore: number; percentage: number } } = {};

  // Berechne Subskalen-Scores
  subscales.forEach(subscale => {
    let subscaleScore = 0;
    
    subscale.questions.forEach(questionId => {
      const answer = answers[questionId];
      if (answer !== undefined) {
        if (subscale.agreePoints.includes(questionId)) {
          // Punkte für "Stimme zu" (2,3) und "Stimme eher zu" (1)
          if (answer >= 2) {
            subscaleScore += 1;
          }
        } else if (subscale.disagreePoints.includes(questionId)) {
          // Punkte für "Stimme nicht zu" (0) und "Stimme eher nicht zu" (1)
          if (answer <= 1) {
            subscaleScore += 1;
          }
        }
      }
    });

    subscaleScores[subscale.name] = {
      score: subscaleScore,
      maxScore: subscale.questions.length,
      percentage: Math.round((subscaleScore / subscale.questions.length) * 100)
    };

    totalScore += subscaleScore;
  });

  return {
    totalScore,
    subscaleScores,
    interpretation: getInterpretation(totalScore)
  };
}

// Normwerte für Vergleich
export const normValues = {
  general: { mean: 16.4, sd: 6.3 },
  autism: { mean: 35.8, sd: 6.5 },
  students: { mean: 17.6, sd: 6.4 }
};
