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
          <p className="eyebrow">Zwei wissenschaftlich belegte Varianten</p>
          <h1 id="page-title">Welcher AQ-Test passt zu Ihnen?</h1>
          <p className="hero-lead">
            Wählen Sie zwischen der in Deutschland evaluierten Kurzfassung AQ-k und der ausführlichen historischen AQ-50-Fassung. Beide sind anonym und lokal.
          </p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => navigate('/aq-k')}>Mit dem empfohlenen Kurztest beginnen <span aria-hidden="true">→</span></button>
            <button className="hero-alternative" onClick={() => navigate('/test')}>{progress ? 'Gespeicherten ausführlichen Test fortsetzen' : 'Mehr Zeit? Zur ausführlichen 50-Fragen-Version'} <span aria-hidden="true">→</span></button>
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

      <section className="variant-grid" aria-label="Testvarianten vergleichen">
        <article className="card recommended"><span className="result-badge">Empfohlen für den Einstieg</span><h2>AQ-k · Deutsche Kurzfassung</h2><p>33 trennschärfere Items, drei Faktoren, etwa 7–10 Minuten. 2007 als deutschsprachiges Screening-Instrument evaluiert.</p><ul><li>Deutsche klinische Evaluation</li><li>Schwellenwert 17</li><li>Geringere Belastung</li></ul><button className="button button-primary" onClick={() => navigate('/aq-k')}>Details zum AQ-k →</button></article>
        <article className="card"><span className="result-badge">Ausführliche Fassung</span><h2>AQ-50 · Originalinstrument</h2><p>50 Items, fünf theoretische Subskalen, etwa 10–15 Minuten. Für historische Vergleichbarkeit und detailliertere Antwortmuster.</p><ul><li>Originalstudie von 2001</li><li>Schwellenwert 32</li><li>Fünf deskriptive Subskalen</li></ul><button className="button button-secondary" onClick={() => navigate('/test')}>{progress ? 'AQ-50 fortsetzen →' : 'AQ-50 starten →'}</button>{progress && <button className="text-button" onClick={restart}>Gespeicherten AQ-50 neu beginnen</button>}</article>
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
