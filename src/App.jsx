// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';
import CompareFlights from './pages/CompareFlights';
import ReviewDetails from './pages/ReviewDetails';
import FlightSeatMap from './pages/FlightSeatMap.jsx';
import { FlightFilterProvider } from './contexts/FlightFilterContext.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/flight-results"
          element={
            <FlightFilterProvider>
              <FlightResults />
            </FlightFilterProvider>
          }
        />
        <Route path="/compare-flights" element={<CompareFlights />} />
        <Route path="/review-details" element={<ReviewDetails />} />
        <Route path="/flight-seat-map" element={<FlightSeatMap />} />
      </Routes>

    </Router>
  );
}

export default App;