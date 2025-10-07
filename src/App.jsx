// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';
import CompareFlights from './pages/CompareFlights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<FlightResults />} />
        <Route path="/compare-flights" element={<CompareFlights />} />
      </Routes>
    </Router>
  );
}

export default App;