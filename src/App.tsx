import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './components/Test';
import Introduction from './components/Introduction';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/test" element={<Test />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 