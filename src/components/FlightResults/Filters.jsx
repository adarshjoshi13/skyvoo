import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Sunrise from '@/assets/vectors/sunrise.svg';
import Sunnyday from '@/assets/vectors/sunnyday.svg';
import Afternoon from '@/assets/vectors/afternoon.svg';
import Night from '@/assets/vectors/night.svg';
import { useFlightFilters } from '../../contexts/FlightFilterContext';

const PopularFilters = [
    { label: 'Non Stop', price: 5500 },
    { label: 'Hide Nearby Airports', price: 4200 },
    { label: 'Refundable Fares', price: 4240 },
    { label: 'Indigo', price: 7500 },
    { label: 'Morning Flights', price: 4800 },
    { label: 'Evening Flights', price: 4600 },
    { label: 'Direct Airlines Only', price: 5300 },
    { label: 'Extra Legroom', price: 6000 },
    { label: 'Free Meal Included', price: 5800 },
];

const DepartureAirports = [
    { label: 'Indira Gandhi (Delhi)', price: 5500 },
    { label: 'Indira Gandhi International Airport', price: 7500 },
];

const Stops = [
    { label: 'Non Stop', price: 8900 },
    { label: '1 Stop', price: 7900 },
];

const Airlines = ['Indigo', 'Air India', 'Air India Express', 'Akasa Air', 'SpiceJet'];

const AircraftSize = [
    { label: 'Small / Mid - Size Aircraft', price: 5010 },
    { label: 'Large Aircraft', price: 9478 },
];

function Filters() {
    const {
        selectedStops,
        setSelectedStops,
        selectedAirlines,
        setSelectedAirlines,
        selectedAircraftSizes,
        setSelectedAircraftSizes,
        selectedPriceRange,
        setSelectedPriceRange,
    } = useFlightFilters();

    const [showAll, setShowAll] = useState(false);
    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState(null);

    const visibleFilters = showAll ? PopularFilters : PopularFilters.slice(0, 4);
    const remainingCount = PopularFilters.length - 4;

    const [value, setValue] = useState(selectedPriceRange[0]);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const minValue = 5900;
    const maxValue = 21900;
    const [prevValue, setPrevValue] = useState(18500);

    const updateValue = (clientX) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newValue = Math.round(minValue + (maxValue - minValue) * percentage);

        setPrevValue(value);
        setValue(newValue);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        updateValue(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) updateValue(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

    const toggleStopFilter = (label) => {
        setSelectedStops(prev =>
            prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
        );
    };

    const toggleAirlineFilter = (label) => {
        setSelectedAirlines(prev =>
            prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
        );
    };

    const toggleAircraftFilter = (label) => {
        setSelectedAircraftSizes(prev =>
            prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
        );
    };

    const clearAllFilters = () => {
        setSelectedStops([]);
        setSelectedAirlines([]);
        setSelectedAircraftSizes([]);
        setSelectedPriceRange([0, maxValue]);
        setDeparture(null);
        setArrival(null);
    };

    const selected = [
        ...selectedStops,
        ...selectedAirlines,
        ...selectedAircraftSizes,
        departure,
        arrival
    ].filter(Boolean);

    const removeFilter = (filter) => {
        if (selectedStops.includes(filter)) setSelectedStops(prev => prev.filter(f => f !== filter));
        else if (selectedAirlines.includes(filter)) setSelectedAirlines(prev => prev.filter(f => f !== filter));
        else if (selectedAircraftSizes.includes(filter)) setSelectedAircraftSizes(prev => prev.filter(f => f !== filter));
        else if (departure === filter) setDeparture(null);
        else if (arrival === filter) setArrival(null);
    };


    return (
        <div className="w-80 bg-[#D5D5D5] rounded-lg shadow-sm px-6 pb-6 pt-3 h-fit filters"
            style={{ boxShadow: '0px 3px 22.3px 10px rgba(0,0,0,0.2),0px 4px 6.1px 4px rgba(0,0,0,0.25)' }}>

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold secondary-font">Applied Filters</h3>
                <button className="cursor-pointer text-[#78080B] text-sm font-medium hover:underline" onClick={clearAllFilters}>CLEAR ALL</button>
            </div>

            {/* Applied Filter Tags */}
            {selected.length > 0 && (
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selected.map((filter) => (
                            <span
                                key={filter}
                                className="bg-white text-black px-3 py-1 rounded-full font-medium text-xs flex items-center"
                                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                            >
                                {filter}
                                <button
                                    onClick={() => removeFilter(filter)}
                                    className="cursor-pointer ml-2 text-white bg-[#910E0E] w-4 h-4 rounded-full flex items-center justify-center"
                                >
                                    <X size={12} strokeWidth={3} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}


            {/* Popular Filters */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Popular Filters</h4>
                <div className="space-y-3 text-sm">
                    {visibleFilters.map(({ label, price }) => (
                        <label key={label} className="flex items-center justify-between">
                            <span className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedStops.includes(label) || selectedAirlines.includes(label)}
                                    onChange={() => {
                                        if (Stops.some(s => s.label === label)) toggleStopFilter(label);
                                        else toggleAirlineFilter(label);
                                    }}
                                    className="mr-3 cursor-pointer accent-red-600"
                                />
                                {label}
                            </span>
                            {price && <span>₹ {price.toLocaleString()}</span>}
                        </label>
                    ))}
                    {!showAll && remainingCount > 0 && (
                        <button onClick={() => setShowAll(true)}
                            className="cursor-pointer text-[#78080B] font-medium hover:underline">
                            + {remainingCount} more
                        </button>
                    )}
                </div>
            </div>

            {/* Departure Airports */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Departure Airports</h4>
                <div className="space-y-3 text-sm">
                    {DepartureAirports.map(({ label, price }) => (
                        <div key={label} className="flex justify-between items-start w-full">
                            <label className="flex items-start gap-3 flex-1">
                                <input
                                    type="checkbox"
                                    checked={selectedStops.includes(label)} // use context state
                                    onChange={() => {
                                        setSelectedStops(prev =>
                                            prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
                                        );
                                    }}
                                    className="mt-1 cursor-pointer accent-red-600"
                                />
                                <span>{label}</span>
                            </label>
                            {price && <span className="ml-3 flex-shrink-0">₹ {price.toLocaleString()}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Slider */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">One Way Price</h4>
                <div
                    className="relative h-1 bg-[#B9B9B9] rounded-sm cursor-pointer select-none"
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                >
                    {/* Red Progress Track */}
                    <div
                        className="absolute left-0 top-0 h-full bg-[#920000] rounded-sm"
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Popup Tooltip - Only show when dragging */}
                    {isDragging && (
                        <div
                            className="absolute -top-12 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap"
                            style={{ left: `${percentage}%` }}
                        >
                            ₹ {value.toLocaleString()}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                        </div>
                    )}

                </div>
                <div className="flex justify-between text-sm text-gray-700 mt-1">
                    <span>₹ {minValue.toLocaleString()}</span>
                    <span>₹ {maxValue.toLocaleString()}</span>
                </div>
            </div>

            {/* Stops */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Stops From New Delhi</h4>
                <div className="space-y-3 text-sm">
                    {Stops.map(({ label }) => (
                        <label key={label} className="flex items-center justify-between">
                            <span className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedStops.includes(label)}
                                    onChange={() => toggleStopFilter(label)}
                                    className="mr-3 cursor-pointer accent-red-600"
                                />
                                {label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>


            {/* Departure */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Departure From New Delhi</h4>
                <div className="flex flex-row justify-around gap-1 flex-wrap">
                    {[
                        { label: "Early Morning", icon: Sunrise, lines: ["Before", "6 AM"] },
                        { label: "Morning", icon: Sunnyday, lines: ["6 AM", "to 12 PM"] },
                        { label: "Afternoon", icon: Afternoon, lines: ["12 PM", "to 6 PM"] },
                        { label: "Night", icon: Night, lines: ["After", "6 PM"] }
                    ].map(({ label, icon, lines }) => (
                        <div
                            key={label}
                            onClick={() => setDeparture(label)}
                            className="cursor-pointer text-center flex flex-col items-center"
                        >
                            <div className={`w-10 h-10 rounded-full p-2 flex items-center justify-center mb-2 transition-colors duration-200 ${departure === label ? 'bg-[#78080B]' : 'border-[#B5B5B5] border-2 border-solid'}`}>
                                <img
                                    src={icon}
                                    alt={label}
                                    className={departure === label ? 'filter invert brightness-0' : ''}
                                />
                            </div>
                            <div className="text-xs font-medium text-center">
                                {lines.map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Arrival */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Arrival</h4>
                <div className="flex flex-row justify-start gap-1 flex-wrap">
                    {[
                        { label: "Early Morning", icon: Sunrise, lines: ["Before", "6 AM"] },
                        { label: "Night", icon: Night, lines: ["After", "6 PM"] }
                    ].map(({ label, icon, lines }) => (
                        <div
                            key={label}
                            onClick={() => setArrival(label)}
                            className="mx-3 cursor-pointer text-center flex flex-col items-center"
                        >
                            <div className={`w-10 h-10 rounded-full p-2 flex items-center justify-center mb-2 transition-colors duration-200 ${arrival === label ? 'bg-[#78080B]' : 'border-[#B5B5B5] border-2 border-solid'}`}>
                                <img
                                    src={icon}
                                    alt={label}
                                    className={arrival === label ? 'filter invert brightness-0' : ''}
                                />
                            </div>
                            <div className="text-xs font-medium text-center">
                                {lines.map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Airlines */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Airlines</h4>
                <div className="space-y-3 text-sm">
                    {Airlines.map((airline) => (
                        <label key={airline} className="flex items-center justify-between">
                            <span className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedAirlines.includes(airline)}
                                    onChange={() => toggleAirlineFilter(airline)}
                                    className="mr-3 cursor-pointer accent-red-600"
                                />
                                {airline}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Aircraft Size */}
            <div className="mb-8">
                <h4 className="font-semibold mb-4">Aircraft Size</h4>
                <div className="space-y-3 text-sm">
                    {AircraftSize.map(({ label, price }) => (
                        <div key={label} className="flex justify-between items-start w-full">
                            <label className="flex items-start gap-3 flex-1">
                                <input
                                    type="checkbox"
                                    checked={selectedAircraftSizes.includes(label)} // using context for selected airlines/facility
                                    onChange={() => toggleAircraftFilter(label)}
                                    className="mt-1 cursor-pointer accent-red-600"
                                />
                                <span>{label}</span>
                            </label>
                            {price && <span className="ml-3 flex-shrink-0">₹ {price.toLocaleString()}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filters