import { beforeEach, describe, expect, it } from 'vitest';
import { loadProgress, loadResult, PROGRESS_KEY, RESULT_KEY, saveProgress, saveResult } from '../storage';

describe('local storage validation', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips valid progress', () => {
    saveProgress({ currentQuestion: 2, answers: { 1: 0, 2: 3 } });
    expect(loadProgress()).toEqual({ currentQuestion: 2, answers: { 1: 0, 2: 3 } });
  });

  it('removes malformed progress instead of crashing', () => {
    localStorage.setItem(PROGRESS_KEY, '{broken');
    expect(loadProgress()).toBeNull();
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
  });

  it('rejects an incomplete result', () => {
    localStorage.setItem(RESULT_KEY, JSON.stringify({ score: 1, answers: { 1: 0 } }));
    expect(loadResult()).toBeNull();
  });

  it('round-trips a complete result', () => {
    const answers = Object.fromEntries(Array.from({ length: 50 }, (_, index) => [index + 1, index % 4]));
    saveResult({ score: 25, answers });
    expect(loadResult()?.score).toBe(25);
  });
});
