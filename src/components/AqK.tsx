import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aqkAnswerOptions, aqkQuestions, aqkSource, calculateAqkScore } from '../data/aqk';
import ProgressBar from './ProgressBar';

type Answers = Record<number, number>;
const progressKey = 'aqk-progress';
const resultKey = 'aqk-result';
const read = <T,>(key: string): T | null => { try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { localStorage.removeItem(key); return null; } };

export const AqKIntroduction = () => {
  const navigate = useNavigate();
  return <section className="card science test-intro"><div><p className="eyebrow">Empfohlene deutsche Kurzfassung</p><h1>AQ-k · 33 Fragen</h1><p>Die 2007 evaluierte deutsche Kurzfassung entfernt Items mit geringer Trennschärfe. Sie benötigt etwa 7–10 Minuten und ist für Personen ab 16 Jahren mit mindestens durchschnittlicher Intelligenz untersucht.</p><div className="notice"><b>Screening, keine Diagnose.</b> Der vorgeschlagene Schwellenwert von 17 ist nur ein Hinweis für mögliche weitere Abklärung.</div><button className="button button-primary button-large" onClick={() => navigate('/aq-k/test')}>AQ-k starten →</button></div><div className="source-list"><a href={aqkSource.questionnaireUrl} target="_blank" rel="noreferrer"><b>Offizieller AQ-k</b><span>Universitätsmedizin Frankfurt ↗</span></a><a href={aqkSource.studyUrl} target="_blank" rel="noreferrer"><b>Deutsche Evaluation</b><span>Freitag et al. (2007) ↗</span></a><button className="button button-secondary" onClick={() => navigate('/')}>← Andere Variante wählen</button></div></section>;
};

export const AqKTest = () => {
  const navigate = useNavigate();
  const saved = read<{ current: number; answers: Answers }>(progressKey);
  const [current, setCurrent] = useState(saved?.current ?? 0);
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? {});
  const question = aqkQuestions[current];
  useEffect(() => { if (Object.keys(answers).length) localStorage.setItem(progressKey, JSON.stringify({ current, answers })); }, [answers, current]);
  const select = (value: number) => { const next = { ...answers, [question.id]: value }; setAnswers(next); window.setTimeout(() => { if (current === aqkQuestions.length - 1) { const score = calculateAqkScore(next); localStorage.removeItem(progressKey); localStorage.setItem(resultKey, JSON.stringify({ score, answers: next })); navigate('/aq-k/results'); } else setCurrent(v => v + 1); }, 140); };
  return <section className="card test-card"><div className="test-topline"><button className="text-button" onClick={() => navigate('/aq-k')}>← Test verlassen</button><span className="autosave">✓ lokal gespeichert</span></div><ProgressBar current={current + 1} total={33} answered={Object.keys(answers).length}/><div className="question-block"><p className="eyebrow">AQ-k · Frage {current + 1}</p><h1>{question.text}</h1><p className="question-hint">Die Auswahl wird direkt übernommen. Mit „Zurück“ können Sie Antworten ändern.</p></div><fieldset className="answer-list"><legend className="sr-only">Antwortmöglichkeiten</legend>{aqkAnswerOptions.map((label, value) => <label className={`answer-option ${answers[question.id] === value ? 'is-selected' : ''}`} key={label}><input type="radio" name="answer" checked={answers[question.id] === value} onChange={() => select(value)}/><span className="key-hint">{value + 1}</span><span>{label}</span><span className="check">✓</span></label>)}</fieldset><div className="test-actions"><button className="button button-secondary" disabled={!current} onClick={() => setCurrent(v => v - 1)}>← Zurück</button><button className="button button-primary" disabled={answers[question.id] === undefined || current === 32} onClick={() => setCurrent(v => v + 1)}>Weiter →</button></div></section>;
};

export const AqKResults = () => {
  const navigate = useNavigate(); const result = read<{ score: number; answers: Answers }>(resultKey);
  if (!result) return <section className="card empty-state"><h1>Kein AQ-k-Ergebnis gespeichert</h1><button className="button button-primary" onClick={() => navigate('/aq-k/test')}>Test starten</button></section>;
  const reached = result.score >= 17;
  return <section className="results"><div className="results-heading"><div><p className="eyebrow">Deutsche Kurzfassung</p><h1>AQ-k Ergebnis</h1></div><button className="button button-secondary" onClick={() => navigate('/')}>← Startseite</button></div><div className="score-card"><div className="score-ring"><strong>{result.score}</strong><span>/ 33</span></div><div><span className={`result-badge ${reached ? 'badge-attention' : ''}`}>{reached ? 'Schwellenwert erreicht' : 'Unter dem Schwellenwert'}</span><h2>{reached ? 'Eine fachliche Abklärung kann sinnvoll sein.' : 'Das Ergebnis ist nicht diagnostisch.'}</h2><p>In der deutschen Evaluation wurde 17 als Screening-Schwellenwert vorgeschlagen. Das Ergebnis kann Autismus weder bestätigen noch ausschließen.</p></div></div><div className="card result-content sources"><h2>Wissenschaftliche Einordnung</h2><p>Freitag et al. untersuchten den AQ-k an 341 Personen, darunter 18 Personen der damaligen HFA/AS-Gruppe. Bei 17 Punkten lagen Sensitivität bei 88,9 % und Spezifität bei 91,6 %; die kleine klinische Stichprobe begrenzt die Übertragbarkeit.</p><ul><li><a href={aqkSource.questionnaireUrl} target="_blank" rel="noreferrer">Offizieller AQ-k-Fragebogen</a></li><li><a href={aqkSource.scoringUrl} target="_blank" rel="noreferrer">Offizieller Auswertungsbogen</a></li><li><a href={aqkSource.studyUrl} target="_blank" rel="noreferrer">Freitag et al. (2007), DOI</a></li></ul><div className="notice"><b>Keine Diagnose, keine Gewähr.</b> Bei Fragen oder Leidensdruck wenden Sie sich an qualifiziertes Fachpersonal.</div></div><div className="result-actions"><button className="button button-primary" onClick={() => { localStorage.removeItem(resultKey); navigate('/aq-k/test'); }}>AQ-k wiederholen</button><button className="button button-secondary" onClick={() => navigate('/')}>Varianten vergleichen</button></div></section>;
};
