import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Introduction from "./components/Introduction";
import Test from "./components/Test";
import Results from "./components/Results";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AqKIntroduction, AqKResults, AqKTest } from "./components/AqK";

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
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/test" element={<Test />} />
            <Route path="/results" element={<Results />} />
            <Route path="/aq-k" element={<AqKIntroduction />} />
            <Route path="/aq-k/test" element={<AqKTest />} />
            <Route path="/aq-k/results" element={<AqKResults />} />
            <Route path="*" element={<Introduction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  </ThemeProvider>
);

export default App;
