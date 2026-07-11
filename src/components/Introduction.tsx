import { useNavigate } from 'react-router-dom';
import { clearProgress, loadProgress } from '../utils/storage';

const Introduction = () => {
  const navigate = useNavigate();
  const progress = loadProgress();

  const restart = () => {
    clearProgress();
    navigate('/test');
  };

  return (
    <div className="landing">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Wissenschaftlich fundierte Selbsteinschätzung</p>
          <h1 id="page-title">Autistische Merkmale besser einordnen.</h1>
          <p className="hero-lead">
            Der AQ-50 erfasst autistische Merkmale bei Erwachsenen ab 16 Jahren. Kostenlos, anonym und direkt im Browser ausgewertet.
          </p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => navigate('/test')}>
              {progress ? 'Test fortsetzen' : 'Selbsttest starten'} <span aria-hidden="true">→</span>
            </button>
            {progress && <button className="button button-secondary button-large" onClick={restart}>Neu beginnen</button>}
          </div>
          <div className="trust-row" aria-label="Eigenschaften des Tests">
            <span><b>50</b> Aussagen</span><span><b>10–15</b> Minuten</span><span><b>100 %</b> lokal</span>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Wichtige Einordnung">
          <span className="panel-icon" aria-hidden="true">◇</span>
          <h2>Ein Screening, keine Diagnose</h2>
          <p>Das Ergebnis beschreibt Selbstauskünfte. Es kann eine fachliche Diagnostik weder bestätigen noch ausschließen.</p>
          <ul className="check-list">
            <li>Keine Anmeldung</li>
            <li>Keine Datenübertragung</li>
            <li>Offizieller 4-stufiger AQ-Schlüssel</li>
          </ul>
        </aside>
      </section>

      <section className="info-grid" aria-label="So funktioniert der Test">
        <article><span className="step">01</span><h2>Intuitiv antworten</h2><p>Es gibt kein Richtig oder Falsch. Wählen Sie, was im Allgemeinen am ehesten passt.</p></article>
        <article><span className="step">02</span><h2>Lokal fortsetzen</h2><p>Ihr Fortschritt bleibt ausschließlich in diesem Browser und kann jederzeit gelöscht werden.</p></article>
        <article><span className="step">03</span><h2>Besonnen einordnen</h2><p>Sie erhalten Gesamtwert und Subskalen samt Quellen, Grenzen und optionalem PDF.</p></article>
      </section>

      <section className="science card" id="wissenschaft">
        <div>
          <p className="eyebrow">Herkunft & Evidenz</p>
          <h2>Was hinter dem AQ-50 steht</h2>
          <p>Der Autism-Spectrum Quotient wurde 2001 von Baron-Cohen und Kolleg:innen als Selbstbeurteilungsinstrument entwickelt. Diese Umsetzung verwendet die deutsche 50-Item-Fassung des Autism Research Centre und den binären Original-Auswertungsschlüssel.</p>
          <p className="fine-print">Die deutsche Validierungsstudie von Freitag et al. untersuchte zudem den AQ und leitete daraus die Kurzfassung AQ-k ab. Sie ersetzt keine individuelle klinische Beurteilung. Angaben ohne Gewähr.</p>
        </div>
        <div className="source-list">
          <a href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf" target="_blank" rel="noreferrer"><b>Offizieller Fragebogen</b><span>Deutsche AQ-50-Fassung (PDF) ↗</span></a>
          <a href="https://doi.org/10.1023/A:1005653411471" target="_blank" rel="noreferrer"><b>Originalstudie, 2001</b><span>Baron-Cohen et al., JADD ↗</span></a>
          <a href="https://doi.org/10.1026/1616-3443.36.4.280" target="_blank" rel="noreferrer"><b>Deutsche Evaluation, 2007</b><span>Freitag et al., ZKPP ↗</span></a>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
