// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';
import CompareFlights from './pages/CompareFlights';
import ReviewDetails from './pages/ReviewDetails';
import BookSeat from './pages/BookSeat.jsx';
import { FlightFilterProvider } from './contexts/FlightFilterContext.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search-results"
          element={
            <FlightFilterProvider>
              <FlightResults />
            </FlightFilterProvider>
          }
        />
        <Route path="/compare-flights" element={<CompareFlights />} />
        <Route path="/review-details" element={<ReviewDetails />} />
        <Route path="/book-seat" element={<BookSeat />} />
      </Routes>

    </Router>
  );
}

export default App;