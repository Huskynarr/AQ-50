// Accessibility utilities for the AQ-50 test

export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const focusElement = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

export const getAriaLabel = (questionNumber: number, totalQuestions: number, questionText: string) => {
  return `Frage ${questionNumber} von ${totalQuestions}: ${questionText}`;
};

export const getAnswerAriaLabel = (answerText: string, questionNumber: number, isSelected: boolean) => {
  const selectedText = isSelected ? 'ausgewählt' : '';
  return `${answerText} für Frage ${questionNumber} ${selectedText}`;
};
