// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<FlightResults />} />
      </Routes>
    </Router>
  );
}

export default App;