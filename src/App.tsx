import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './components/Test';
import Introduction from './components/Introduction';
import Results from './components/Results';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/AQ-50">
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-gray-100 p-8">
          <div className="max-w-2xl mx-auto">
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/test" element={<Test />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 