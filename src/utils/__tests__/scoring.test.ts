import { describe, it, expect } from 'vitest';
import { calculateDetailedScore, subscales } from '../scoring';

describe('Scoring Utility', () => {
  describe('calculateDetailedScore', () => {
    it('should calculate correct total score for all agree answers', () => {
      // Create answers where all questions are answered with "agree" (value 3)
      const answers: { [key: number]: number } = {};
      for (let i = 1; i <= 50; i++) {
        answers[i] = 3;
      }

      const result = calculateDetailedScore(answers);
      
      // Should get points for all "agree point" questions
      const expectedScore = subscales.reduce((total, subscale) => {
        return total + subscale.agreePoints.length;
      }, 0);
      
      expect(result.totalScore).toBe(expectedScore);
    });

    it('should calculate correct total score for all disagree answers', () => {
      // Create answers where all questions are answered with "disagree" (value 0)
      const answers: { [key: number]: number } = {};
      for (let i = 1; i <= 50; i++) {
        answers[i] = 0;
      }

      const result = calculateDetailedScore(answers);
      
      // Should get points for all "disagree point" questions
      const expectedScore = subscales.reduce((total, subscale) => {
        return total + subscale.disagreePoints.length;
      }, 0);
      
      expect(result.totalScore).toBe(expectedScore);
    });

    it('should calculate correct subscale scores', () => {
      const answers: { [key: number]: number } = {};
      
      // Answer all questions with neutral values (1 or 2)
      for (let i = 1; i <= 50; i++) {
        answers[i] = 1; // "Ich stimme eher nicht zu"
      }

      const result = calculateDetailedScore(answers);
      
      // Check that subscale scores are calculated correctly
      subscales.forEach(subscale => {
        const subscaleResult = result.subscaleScores[subscale.name];
        expect(subscaleResult.maxScore).toBe(subscale.questions.length);
        expect(subscaleResult.score).toBe(subscale.disagreePoints.length);
        expect(subscaleResult.percentage).toBe(
          Math.round((subscale.disagreePoints.length / subscale.questions.length) * 100)
        );
      });
    });

    it('should provide correct interpretation for different score ranges', () => {
      // Test high score (>= 32) - need to create answers that actually result in high score
      const highScoreAnswers: { [key: number]: number } = {};
      
      // Answer agree questions with agree (3) and disagree questions with disagree (0)
      subscales.forEach(subscale => {
        subscale.agreePoints.forEach(q => highScoreAnswers[q] = 3);
        subscale.disagreePoints.forEach(q => highScoreAnswers[q] = 0);
      });
      
      const highResult = calculateDetailedScore(highScoreAnswers);
      expect(highResult.totalScore).toBeGreaterThanOrEqual(32);
      expect(highResult.interpretation).toContain('professionelle Beratung');

      // Test low score - answer in ways that don't score points
      const lowScoreAnswers: { [key: number]: number } = {};
      subscales.forEach(subscale => {
        subscale.agreePoints.forEach(q => lowScoreAnswers[q] = 0); // Don't agree
        subscale.disagreePoints.forEach(q => lowScoreAnswers[q] = 3); // Don't disagree
      });
      
      const lowResult = calculateDetailedScore(lowScoreAnswers);
      expect(lowResult.interpretation).toContain('Normaler AQ-Score');
    });

    it('should handle missing answers gracefully', () => {
      const partialAnswers: { [key: number]: number } = {
        1: 3,
        2: 0,
        3: 1
      };

      const result = calculateDetailedScore(partialAnswers);
      
      expect(result.totalScore).toBeGreaterThanOrEqual(0);
      expect(result.subscaleScores).toBeDefined();
      expect(result.interpretation).toBeDefined();
    });
  });

  describe('subscales configuration', () => {
    it('should have 5 subscales', () => {
      expect(subscales).toHaveLength(5);
    });

    it('should cover all 50 questions exactly once', () => {
      const allQuestions = new Set<number>();
      
      subscales.forEach(subscale => {
        subscale.questions.forEach(q => {
          expect(allQuestions.has(q)).toBe(false); // No duplicates
          allQuestions.add(q);
        });
      });

      expect(allQuestions.size).toBe(50);
      
      // Check that questions 1-50 are all covered
      for (let i = 1; i <= 50; i++) {
        expect(allQuestions.has(i)).toBe(true);
      }
    });

    it('should have consistent agree/disagree point assignments', () => {
      subscales.forEach(subscale => {
        const allPoints = [...subscale.agreePoints, ...subscale.disagreePoints];
        const uniquePoints = new Set(allPoints);
        
        // No overlap between agree and disagree points
        expect(uniquePoints.size).toBe(allPoints.length);
        
        // All points should be in the subscale's questions
        allPoints.forEach(point => {
          expect(subscale.questions).toContain(point);
        });
        
        // All questions should have either agree or disagree points
        expect(allPoints.length).toBe(subscale.questions.length);
      });
    });
  });
});
