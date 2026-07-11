import { questions } from '../data/questions';

export type Answers = Record<number, number>;

export interface SavedProgress {
  currentQuestion: number;
  answers: Answers;
}

export interface SavedResult {
  score: number;
  answers: Answers;
}

export const PROGRESS_KEY = 'aq50-progress';
export const RESULT_KEY = 'aq50-result';

const isAnswers = (value: unknown): value is Answers => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  return Object.entries(value).every(([id, answer]) => {
    const questionId = Number(id);
    return Number.isInteger(questionId)
      && questionId >= 1
      && questionId <= questions.length
      && Number.isInteger(answer)
      && Number(answer) >= 0
      && Number(answer) <= 3;
  });
};

const readJson = (key: string): unknown => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const loadProgress = (): SavedProgress | null => {
  const value = readJson(PROGRESS_KEY);
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Partial<SavedProgress>;
  if (!Number.isInteger(candidate.currentQuestion)
    || Number(candidate.currentQuestion) < 0
    || Number(candidate.currentQuestion) >= questions.length
    || !isAnswers(candidate.answers)) {
    localStorage.removeItem(PROGRESS_KEY);
    return null;
  }

  return candidate as SavedProgress;
};

export const saveProgress = (progress: SavedProgress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const clearProgress = () => localStorage.removeItem(PROGRESS_KEY);

export const loadResult = (): SavedResult | null => {
  const value = readJson(RESULT_KEY);
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Partial<SavedResult>;
  if (!Number.isInteger(candidate.score)
    || Number(candidate.score) < 0
    || Number(candidate.score) > questions.length
    || !isAnswers(candidate.answers)
    || Object.keys(candidate.answers).length !== questions.length) {
    localStorage.removeItem(RESULT_KEY);
    return null;
  }

  return candidate as SavedResult;
};

export const saveResult = (result: SavedResult) => {
  localStorage.setItem(RESULT_KEY, JSON.stringify(result));
};

export const clearResult = () => localStorage.removeItem(RESULT_KEY);
