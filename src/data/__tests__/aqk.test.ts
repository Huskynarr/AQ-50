import { describe, expect, it } from 'vitest';
import { aqkQuestions, aqkSource, calculateAqkScore } from '../aqk';

describe('official German AQ-k', () => {
  it('contains the 33 official items and source documents', () => {
    expect(aqkQuestions).toHaveLength(33);
    expect(aqkQuestions.map(item => item.id)).toEqual(Array.from({ length: 33 }, (_, index) => index + 1));
    expect(aqkSource.questionnaireUrl).toContain('AQ_Erwachsene.pdf');
    expect(aqkSource.scoringUrl).toContain('AUTISMUS_SPEKTRUM_QUOTIENT-KURZVERSION_AQ-K.pdf');
  });

  it('matches both halves of the official scoring key', () => {
    const highAnswers = Object.fromEntries(Array.from({ length: 33 }, (_, index) => [index + 1, 0]));
    [2, 4, 8, 12, 13, 15, 19, 21, 25, 27, 29, 30].forEach(id => { highAnswers[id] = 3; });
    expect(calculateAqkScore(highAnswers)).toBe(33);
    const inverse = Object.fromEntries(Object.entries(highAnswers).map(([id, value]) => [id, value === 3 ? 0 : 3]));
    expect(calculateAqkScore(inverse)).toBe(0);
  });
});
