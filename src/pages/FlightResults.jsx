// src/pages/FlightResults.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';

// Mock data for demonstration
const mockFlights = [
    {
        id: 1,
        airline: 'SkyVoo Airlines',
        flightNumber: 'SV101',
        departure: { time: '08:00 AM', airport: 'JFK' },
        arrival: { time: '11:00 AM', airport: 'LAX' },
        duration: '6h 00m',
        price: 2999,
        stops: 0
    },
    {
        id: 2,
        airline: 'Global Airways',
        flightNumber: 'GA205',
        departure: { time: '10:30 AM', airport: 'JFK' },
        arrival: { time: '02:45 PM', airport: 'LAX' },
        duration: '5h 15m',
        price: 4349,
        stops: 1
    },
    {
        id: 3,
        airline: 'Oceanic Airlines',
        flightNumber: 'OA307',
        departure: { time: '01:15 PM', airport: 'JFK' },
        arrival: { time: '04:30 PM', airport: 'LAX' },
        duration: '6h 15m',
        price: 5279,
        stops: 0
    },
    {
        id: 4,
        airline: 'Continental',
        flightNumber: 'CT409',
        departure: { time: '05:45 PM', airport: 'JFK' },
        arrival: { time: '09:00 PM', airport: 'LAX' },
        duration: '6h 15m',
        price: 3119,
        stops: 1
    },
];

const FlightResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        sortBy: 'price',
        maxStops: 2,
        minPrice: 0,
        maxPrice: 4000
    });

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        const timer = setTimeout(() => {
            // In a real app, you would fetch from an actual API
            // For demo purposes, we're using mock data
            setFlights(mockFlights);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredFlights = flights.filter(flight => {
        return flight.stops <= filters.maxStops &&
            flight.price >= filters.minPrice &&
            flight.price <= filters.maxPrice;
    }).sort((a, b) => {
        if (filters.sortBy === 'price') return a.price - b.price;
        if (filters.sortBy === 'duration') {
            const aDuration = parseInt(a.duration);
            const bDuration = parseInt(b.duration);
            return aDuration - bDuration;
        }
        return 0;
    });

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-blue-600 mb-6 cursor-pointer"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>x``
                    Back to Search
                </button>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Flights from {searchParams.get('from')} to {searchParams.get('to')}
                    </h1>   
                    <p className="text-gray-600">
                        {searchParams.get('depart')} • {searchParams.get('travelers')} Travelers    
                        {searchParams.get('return') && ` • Return: ${searchParams.get('return')}`}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filters sidebar */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow p-4 mb-4">
                            <h2 className="font-semibold text-lg mb-4">Filters</h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                <select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="price">Price (Low to High)</option>
                                    <option value="duration">Duration (Shortest)</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Stops</label>
                                <select
                                    name="maxStops"
                                    value={filters.maxStops}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value={0}>Non-stop</option>
                                    <option value={1}>1 stop max</option>
                                    <option value={2}>Any number of stops</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results list */}
                    <div className="md:w-3/4">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : filteredFlights.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFlights.map(flight => (
                                    <FlightCard key={flight.id} flight={flight} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
                                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightResults;