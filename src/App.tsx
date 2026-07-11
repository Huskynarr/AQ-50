import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Introduction from './components/Introduction';
import Test from './components/Test';
import Results from './components/Results';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { AqKIntroduction, AqKResults, AqKTest } from './components/AqK';

const App = () => (
  <ThemeProvider>
    <HashRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="AQ-50 Startseite"><span>AQ</span><b>50</b></Link>
          <nav aria-label="Seiteneinstellungen und externe Quelle"><a href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf" target="_blank" rel="noreferrer">Originalfragebogen <span aria-hidden="true">↗</span></a><ThemeToggle /></nav>
        </header>
        <main className="site-main">
          <Routes><Route path="/" element={<Introduction />} /><Route path="/test" element={<Test />} /><Route path="/results" element={<Results />} /><Route path="/aq-k" element={<AqKIntroduction />} /><Route path="/aq-k/test" element={<AqKTest />} /><Route path="/aq-k/results" element={<AqKResults />} /><Route path="*" element={<Introduction />} /></Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  </ThemeProvider>
);

export default App;
