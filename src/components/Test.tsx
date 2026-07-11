import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { questions, getAnswerLabel } from '../data/questions';
import { calculateDetailedScore } from '../utils/scoring';
import { clearProgress, loadProgress, saveProgress, saveResult, type Answers } from '../utils/storage';

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(() => loadProgress()?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<Answers>(() => loadProgress()?.answers ?? {});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (answeredCount > 0) saveProgress({ currentQuestion, answers });
  }, [answeredCount, answers, currentQuestion]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentQuestion]);

  const finish = useCallback((completedAnswers: Answers) => {
    const score = calculateDetailedScore(completedAnswers).totalScore;
    clearProgress();
    saveResult({ score, answers: completedAnswers });
    navigate('/results', { state: { score, answers: completedAnswers } });
  }, [navigate]);

  const handleAnswer = useCallback((value: number) => {
    const updatedAnswers = { ...answers, [question.id]: value };
    setAnswers(updatedAnswers);

    window.setTimeout(() => {
      if (currentQuestion === questions.length - 1) finish(updatedAnswers);
      else setCurrentQuestion(previous => previous + 1);
    }, 140);
  }, [answers, currentQuestion, finish, question.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (/^[1-4]$/.test(event.key)) handleAnswer(Number(event.key) - 1);
      if (event.key === 'ArrowLeft' && currentQuestion > 0) setCurrentQuestion(value => value - 1);
      if (event.key === 'ArrowRight' && answers[question.id] !== undefined && currentQuestion < questions.length - 1) {
        setCurrentQuestion(value => value + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answers, currentQuestion, handleAnswer, question.id]);

  return (
    <section className="card test-card" aria-labelledby="question-heading">
      <div className="test-topline">
        <button className="text-button" onClick={() => navigate('/')} aria-label="Test verlassen und zur Startseite">
          <span aria-hidden="true">←</span> Test verlassen
        </button>
        <span className="autosave"><span aria-hidden="true">✓</span> lokal gespeichert</span>
      </div>

      <ProgressBar current={currentQuestion + 1} total={questions.length} answered={answeredCount} />

      <div className="question-block">
        <p className="eyebrow">Frage {currentQuestion + 1}</p>
        <h1 id="question-heading" ref={headingRef} tabIndex={-1}>{question.text}</h1>
        <p className="question-hint">Die Auswahl wird direkt übernommen. Mit „Zurück“ können Sie Antworten jederzeit ändern.</p>
      </div>

      <fieldset className="answer-list">
        <legend className="sr-only">Antwortmöglichkeiten</legend>
        {[0, 1, 2, 3].map(value => {
          const selected = answers[question.id] === value;
          return (
            <label key={value} className={`answer-option ${selected ? 'is-selected' : ''}`}>
              <input type="radio" name={`question-${question.id}`} checked={selected} onChange={() => handleAnswer(value)} />
              <span className="key-hint" aria-hidden="true">{value + 1}</span>
              <span>{getAnswerLabel(value)}</span>
              <span className="check" aria-hidden="true">✓</span>
            </label>
          );
        })}
      </fieldset>

      <div className="test-actions">
        <button className="button button-secondary" onClick={() => setCurrentQuestion(value => value - 1)} disabled={currentQuestion === 0}>
          ← Zurück
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button className="button button-primary" onClick={() => finish(answers)} disabled={answers[question.id] === undefined}>
            Ergebnis anzeigen
          </button>
        ) : (
          <button className="button button-primary" onClick={() => setCurrentQuestion(value => value + 1)} disabled={answers[question.id] === undefined}>
            Weiter →
          </button>
        )}
      </div>
      <p className="keyboard-note">Tastatur: <kbd>1</kbd>–<kbd>4</kbd> antworten · <kbd>←</kbd><kbd>→</kbd> navigieren</p>
    </section>
  );
};

export default Test;
