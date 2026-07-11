import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { answerOptions, questionnaireSource, questions } from '../questions';

describe('official German AQ-50 questionnaire', () => {
  it('pins the verified source document', () => {
    expect(questionnaireSource.url).toBe('https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf');
    expect(questionnaireSource.verifiedOn).toBe('2026-07-11');
  });

  it('contains exactly 50 sequential, non-empty items', () => {
    expect(questions).toHaveLength(50);
    expect(questions.map(question => question.id)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    expect(questions.every(question => question.text.trim().length > 0)).toBe(true);
  });

  it('keeps the official response labels', () => {
    expect(answerOptions).toEqual([
      'Ich stimme nicht zu',
      'Ich stimme eher nicht zu',
      'Ich stimme eher zu',
      'Ich stimme zu',
    ]);
  });

  it('detects any future wording deviation from the verified PDF transcription', () => {
    const fingerprint = createHash('sha256')
      .update(questions.map(({ id, text }) => `${id.toString().padStart(2, '0')}. ${text}`).join('\n'))
      .digest('hex');

    expect(fingerprint).toBe('b8d5d6bfe45aaf8fcc51a21bdd9e54b2bf8307f0500235438669fc1e1a0c2e90');
  });
});
