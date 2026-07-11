import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';
import { calculateDetailedScore, normValues, subscales } from '../utils/scoring';
import { getAnswerLabel, questions } from '../data/questions';
import { clearResult, loadResult, type SavedResult } from '../utils/storage';

type Tab = 'overview' | 'subscales' | 'science';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const result = ((location.state as SavedResult | null) ?? loadResult());
  const detailed = useMemo(() => result ? calculateDetailedScore(result.answers) : null, [result]);

  if (!result || !detailed) {
    return (
      <section className="card empty-state">
        <p className="eyebrow">Kein Ergebnis gespeichert</p><h1>Führen Sie zuerst den Test durch.</h1>
        <button className="button button-primary" onClick={() => navigate('/test')}>Test starten</button>
      </section>
    );
  }

  const download = () => generatePDF(result.score, questions.map(question => ({
    questionId: question.id,
    question: question.text,
    answer: getAnswerLabel(result.answers[question.id]),
  })), detailed);

  const restart = () => {
    clearResult();
    navigate('/test');
  };

  return (
    <section className="results" aria-labelledby="result-title">
      <div className="results-heading">
        <div><p className="eyebrow">Ihre Auswertung</p><h1 id="result-title">AQ-50 Ergebnis</h1></div>
        <button className="button button-secondary" onClick={() => navigate('/')}>← Startseite</button>
      </div>

      <div className="score-card">
        <div className="score-ring" aria-label={`${result.score} von 50 Punkten`}><strong>{result.score}</strong><span>/ 50</span></div>
        <div><span className={`result-badge ${result.score >= 32 ? 'badge-attention' : ''}`}>{result.score >= 32 ? 'Schwellenwert erreicht' : 'Unter dem Schwellenwert'}</span>
          <h2>{result.score >= 32 ? 'Eine fachliche Abklärung kann sinnvoll sein.' : 'Das Ergebnis ist nicht diagnostisch.'}</h2>
          <p>{detailed.interpretation}</p>
        </div>
      </div>

      <nav className="tabs" aria-label="Ergebnisbereiche">
        {([['overview', 'Übersicht'], ['subscales', 'Subskalen'], ['science', 'Quellen & Grenzen']] as const).map(([id, label]) => (
          <button key={id} className={activeTab === id ? 'active' : ''} aria-current={activeTab === id ? 'page' : undefined} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </nav>

      <div className="result-content card">
        {activeTab === 'overview' && <div className="overview-grid">
          <div><h2>So ist der Wert einzuordnen</h2><p>In der Originalstudie wurde <b>32 oder mehr</b> als nützlicher Schwellenwert für klinisch bedeutsame autistische Merkmale vorgeschlagen. 80 % der untersuchten autistischen Erwachsenen und 2 % der Kontrollgruppe lagen dort oder darüber.</p><p>Diese Zahlen stammen aus bestimmten Studiengruppen und sind keine persönliche Wahrscheinlichkeit oder Diagnose.</p></div>
          <aside className="reference-box"><span>Referenzwerte der Originalstudie</span><dl><div><dt>Kontrollgruppe</dt><dd>{normValues.general.mean} ± {normValues.general.sd}</dd></div><div><dt>Studierende</dt><dd>{normValues.students.mean} ± {normValues.students.sd}</dd></div><div><dt>AS/HFA-Gruppe*</dt><dd>{normValues.autism.mean} ± {normValues.autism.sd}</dd></div></dl><small>*Historische Bezeichnung der Studie von 2001; Mittelwert ± Standardabweichung.</small></aside>
        </div>}

        {activeTab === 'subscales' && <div><div className="section-intro"><h2>Fünf Merkmalsbereiche</h2><p>Subskalen zeigen Antwortmuster, haben aber keine eigenen diagnostischen Grenzwerte.</p></div><div className="subscale-list">{subscales.map(subscale => { const value = detailed.subscaleScores[subscale.name]; return <article key={subscale.name}><div><h3>{subscale.name}</h3><p>{subscale.description}</p></div><div className="subscale-value"><b>{value.score}/10</b><div><span style={{ width: `${value.percentage}%` }} /></div></div></article>; })}</div></div>}

        {activeTab === 'science' && <div className="sources"><h2>Quellen und wissenschaftliche Grenzen</h2><p>Verwendet werden die offizielle deutsche AQ-50-Fassung und der Originalschlüssel. Der AQ misst selbstberichtete Merkmale. Antworten können unter anderem durch Situation, Selbsteinschätzung und andere psychische oder neurologische Faktoren beeinflusst sein.</p><ul><li><a href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf" target="_blank" rel="noreferrer">Autism Research Centre: AQ Adult German (Fragebogen)</a></li><li><a href="https://doi.org/10.1023/A:1005653411471" target="_blank" rel="noreferrer">Baron-Cohen et al. (2001): Entwicklung und Originalstudie</a></li><li><a href="https://doi.org/10.1026/1616-3443.36.4.280" target="_blank" rel="noreferrer">Freitag et al. (2007): Evaluation der deutschen Fassung / AQ-k</a></li></ul><div className="notice"><b>Keine Diagnose, keine Gewähr.</b> Ein Ergebnis kann Autismus weder belegen noch ausschließen. Bei Fragen oder Leidensdruck wenden Sie sich an qualifiziertes Fachpersonal.</div></div>}
      </div>

      <div className="result-actions"><button className="button button-primary" onClick={download}>Ergebnis als PDF</button><button className="button button-secondary" onClick={restart}>Test neu starten</button></div>
    </section>
  );
};

export default Results;
