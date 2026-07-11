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
            Nehmen Sie sich einen ruhigen Moment für eine erste, wissenschaftlich fundierte Selbsteinschätzung. Kostenlos, anonym und ohne Weitergabe Ihrer Antworten.
          </p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => navigate('/aq-k')}>Kurztest starten <span aria-hidden="true">→</span></button>
            <button className="button button-secondary button-large" onClick={() => document.getElementById('testvergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Tests vergleichen <span aria-hidden="true">↓</span></button>
          </div>
          <div className="trust-row" aria-label="Eigenschaften des Tests">
            <span><b>ab 16</b> Jahren</span><span><b>7–10</b> Minuten</span><span><b>100 %</b> lokal</span>
          </div>
        </div>
        <figure className="hero-visual"><img src="/AQ-50/images/aq-welcome-illustration.jpg" alt="Ruhige Illustration einer Person mit Tasse und Notizbuch"/><figcaption><b>In Ihrem Tempo.</b><span>Sie können jederzeit pausieren und später weitermachen.</span></figcaption></figure>
      </section>

      <section className="variant-grid" id="testvergleich" aria-label="Testvarianten vergleichen" tabIndex={-1}>
        <article className="card recommended"><span className="result-badge">Empfohlen für den Einstieg</span><h2>Kurzer Selbsttest <small>AQ-k</small></h2><p>33 gezielt ausgewählte Aussagen, etwa 7–10 Minuten. Eine gute Wahl, wenn Sie sich zunächst unkompliziert orientieren möchten.</p><ul><li>In Deutschland wissenschaftlich untersucht</li><li>Kürzer und weniger belastend</li><li>Klare Einordnung des Ergebnisses</li></ul><button className="button button-primary" onClick={() => navigate('/aq-k')}>Kurztest ansehen →</button></article>
        <article className="card"><span className="result-badge">Mehr Zeit und Details</span><h2>Ausführlicher Selbsttest <small>AQ-50</small></h2><p>50 Aussagen, etwa 10–15 Minuten. Sinnvoll, wenn Sie mehr Antwortbereiche betrachten oder mit der ursprünglichen Studie vergleichen möchten.</p><ul><li>Ausführlichere Selbsteinschätzung</li><li>Fünf beschreibende Bereiche</li><li>Vergleich mit der Studie von 2001</li></ul><button className="button button-secondary" onClick={() => navigate('/test')}>{progress ? 'Ausführlichen Test fortsetzen →' : 'Ausführlichen Test starten →'}</button>{progress && <button className="text-button" onClick={restart}>Gespeicherten Fortschritt löschen</button>}</article>
      </section>

      <section className="info-grid" aria-label="So funktioniert der Test">
        <article><span className="step">01</span><h2>Intuitiv antworten</h2><p>Es gibt kein Richtig oder Falsch. Wählen Sie, was im Allgemeinen am ehesten passt.</p></article>
        <article><span className="step">02</span><h2>Lokal fortsetzen</h2><p>Ihr Fortschritt bleibt ausschließlich in diesem Browser und kann jederzeit gelöscht werden.</p></article>
        <article><span className="step">03</span><h2>Besonnen einordnen</h2><p>Sie erhalten Gesamtwert und Subskalen samt Quellen, Grenzen und optionalem PDF.</p></article>
      </section>

      <section className="reassurance"><div><p className="eyebrow">Gut zu wissen</p><h2>Ein geschützter Raum für Ihre Selbsteinschätzung.</h2></div><div className="reassurance-points"><p><b>Privat</b><span>Ihre Antworten verlassen dieses Gerät nicht.</span></p><p><b>Ohne Druck</b><span>Keine Zeitbegrenzung, kein Richtig oder Falsch.</span></p><p><b>Ehrlich eingeordnet</b><span>Quellen und Grenzen stehen direkt beim Ergebnis.</span></p></div></section>

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
