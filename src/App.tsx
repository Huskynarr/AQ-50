import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Introduction from './components/Introduction';
import Test from './components/Test';
import Results from './components/Results';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => (
  <ThemeProvider>
    <HashRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="AQ-50 Startseite"><span>AQ</span><b>50</b></Link>
          <nav aria-label="Hauptnavigation"><a href="/#wissenschaft">Wissenschaft</a><a href="https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf" target="_blank" rel="noreferrer">Originalfragebogen</a><ThemeToggle /></nav>
        </header>
        <main className="site-main">
          <Routes><Route path="/" element={<Introduction />} /><Route path="/test" element={<Test />} /><Route path="/results" element={<Results />} /><Route path="*" element={<Introduction />} /></Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  </ThemeProvider>
);

export default App;
