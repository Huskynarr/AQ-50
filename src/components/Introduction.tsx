import { useNavigate } from "react-router-dom";
import { loadProgress } from "../utils/storage";

const Introduction = () => {
  const navigate = useNavigate();
  const progress = loadProgress();
  const showComparison = () => {
    const comparison = document.getElementById("testvergleich");
    comparison?.scrollIntoView({ behavior: "smooth", block: "start" });
    comparison?.focus({ preventScroll: true });
  };

  return (
    <div className="landing">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Autismus-Selbsttest für Erwachsene</p>
          <h1 id="page-title">Autistische Merkmale besser verstehen.</h1>
          <p className="hero-lead">
            Der Autismus-Spektrum-Quotient (AQ) hilft Ihnen, eigene Denk-,
            Wahrnehmungs- und Verhaltensmuster einzuordnen. Wissenschaftlich
            basiert, anonym und ohne Anmeldung – als Orientierung, nicht als
            Diagnose.
          </p>
          <div className="hero-actions">
            <button
              className="button button-primary button-large"
              onClick={() => navigate("/aq-k")}
            >
              Kurztest starten <span aria-hidden="true">→</span>
            </button>
            <button
              className="button button-secondary button-large"
              onClick={showComparison}
            >
              Tests vergleichen <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="trust-row" aria-label="Eigenschaften des Tests">
            <span>
              <b>ab 16</b> Jahren
            </span>
            <span>
              <b>7–10</b> Minuten
            </span>
            <span>
              <b>100 %</b> lokal
            </span>
          </div>
        </div>
        {/* KI-generiertes Projekt-Asset; Herkunft und Prompt: /ASSET_PROVENANCE.md */}
        <figure className="hero-visual">
          <img
            src="/AQ-50/images/aq-welcome-illustration.jpg"
            alt="Ruhige Illustration einer Person mit Tasse und Notizbuch"
          />
          <figcaption>
            <b>In Ihrem Tempo.</b>
            <span>Sie können jederzeit pausieren und später weitermachen.</span>
          </figcaption>
        </figure>
      </section>

      <section
        className="variant-grid"
        id="testvergleich"
        aria-label="Testvarianten vergleichen"
        tabIndex={-1}
      >
        <article className="card recommended">
          <h2>
            Kurzer Selbsttest <small>AQ-k · empfohlen für den Einstieg</small>
          </h2>
          <p>
            33 gezielt ausgewählte Aussagen, etwa 7–10 Minuten. Eine gute Wahl,
            wenn Sie sich zunächst unkompliziert orientieren möchten.
          </p>
          <ul>
            <li>In Deutschland wissenschaftlich untersucht</li>
            <li>Kürzer und weniger belastend</li>
            <li>Klare Einordnung des Ergebnisses</li>
          </ul>
          <div className="variant-actions">
            <button
              className="button button-primary"
              onClick={() => navigate("/aq-k")}
            >
              Kurztest ansehen →
            </button>
          </div>
        </article>
        <article className="card">
          <h2>
            Ausführlicher Selbsttest{" "}
            <small>AQ-50 · mehr Zeit und Details</small>
          </h2>
          <p>
            50 Aussagen, etwa 10–15 Minuten. Sinnvoll, wenn Sie mehr
            Antwortbereiche betrachten oder mit der ursprünglichen Studie
            vergleichen möchten.
          </p>
          <ul>
            <li>Ausführlichere Selbsteinschätzung</li>
            <li>Fünf beschreibende Bereiche</li>
            <li>Vergleich mit der Studie von 2001</li>
          </ul>
          <div className="variant-actions">
            <button
              className="button button-secondary"
              onClick={() => navigate("/test")}
            >
              {progress ? "Test fortsetzen →" : "Test starten →"}
            </button>
          </div>
        </article>
      </section>

      <section className="info-grid" aria-label="So funktioniert der Test">
        <article>
          <span className="step">01</span>
          <h2>Intuitiv antworten</h2>
          <p>
            Es gibt kein Richtig oder Falsch. Wählen Sie, was im Allgemeinen am
            ehesten passt.
          </p>
        </article>
        <article>
          <span className="step">02</span>
          <h2>Lokal fortsetzen</h2>
          <p>
            Ihr Fortschritt bleibt ausschließlich in diesem Browser und kann
            jederzeit gelöscht werden.
          </p>
        </article>
        <article>
          <span className="step">03</span>
          <h2>Besonnen einordnen</h2>
          <p>
            Sie erhalten Gesamtwert und Subskalen samt Quellen, Grenzen und
            optionalem PDF.
          </p>
        </article>
      </section>

      <section className="reassurance">
        <div>
          <p className="eyebrow">Gut zu wissen</p>
          <h2>Ein geschützter Raum für Ihre Selbsteinschätzung.</h2>
        </div>
        <div className="reassurance-points">
          <p>
            <b>Privat</b>
            <span>Ihre Antworten verlassen dieses Gerät nicht.</span>
          </p>
          <p>
            <b>Ohne Druck</b>
            <span>Keine Zeitbegrenzung, kein Richtig oder Falsch.</span>
          </p>
          <p>
            <b>Ehrlich eingeordnet</b>
            <span>Quellen und Grenzen stehen direkt beim Ergebnis.</span>
          </p>
        </div>
      </section>

      <section className="science card" id="wissenschaft">
        <div>
          <p className="eyebrow">Herkunft & Evidenz</p>
          <h2>Die wissenschaftliche Grundlage</h2>
          <p>
            Der Autism-Spectrum Quotient wurde 2001 von Baron-Cohen und
            Kolleg:innen als Selbstbeurteilungsinstrument entwickelt. Der AQ-50
            folgt der deutschen Fassung des Autism Research Centre.
          </p>
          <p className="fine-print">
            Freitag et al. untersuchten die deutsche Fassung und entwickelten
            daraus den trennschärferen AQ-k mit 33 Aussagen. Beide Varianten sind
            Screenings und ersetzen keine individuelle klinische Beurteilung.
            Angaben ohne Gewähr.
          </p>
        </div>
        <div className="source-list">
          <a
            href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <b>Offizieller AQ-50</b>
            <span>Deutsche Fassung (PDF) ↗</span>
          </a>
          <a
            href="https://www.unimedizin-ffm.de/fileadmin/redakteure/Fachkliniken/Kinder-Jugendmedizin/Psychiatrie_I/AQ_Erwachsene.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <b>Offizieller AQ-k</b>
            <span>Deutsche Kurzfassung (PDF) ↗</span>
          </a>
          <a
            href="https://doi.org/10.1023/A:1005653411471"
            target="_blank"
            rel="noreferrer"
          >
            <b>Originalstudie, 2001</b>
            <span>Baron-Cohen et al., JADD ↗</span>
          </a>
          <a
            href="https://doi.org/10.1026/1616-3443.36.4.280"
            target="_blank"
            rel="noreferrer"
          >
            <b>Deutsche Evaluation, 2007</b>
            <span>Freitag et al., ZKPP ↗</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
