import { lazy, Suspense } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";

const Test = lazy(() => import("./components/Test"));
const Results = lazy(() => import("./components/Results"));
const AqKIntroduction = lazy(() =>
  import("./components/AqK").then((module) => ({
    default: module.AqKIntroduction,
  })),
);
const AqKTest = lazy(() =>
  import("./components/AqK").then((module) => ({ default: module.AqKTest })),
);
const AqKResults = lazy(() =>
  import("./components/AqK").then((module) => ({ default: module.AqKResults })),
);

const App = () => (
  <ThemeProvider>
    <HashRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="AQ-50 Startseite">
            <span>AQ</span>
            <b>50</b>
          </Link>
          <div className="header-tools">
            <span className="local-note">
              <span aria-hidden="true">✓</span> Antworten bleiben lokal
            </span>
            <ThemeToggle />
          </div>
        </header>
        <main className="site-main">
          <Suspense
            fallback={
              <div className="route-loading" role="status">
                Inhalt wird geladen …
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/test" element={<Test />} />
              <Route path="/results" element={<Results />} />
              <Route path="/aq-k" element={<AqKIntroduction />} />
              <Route path="/aq-k/test" element={<AqKTest />} />
              <Route path="/aq-k/results" element={<AqKResults />} />
              <Route path="*" element={<Introduction />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  </ThemeProvider>
);

export default App;
