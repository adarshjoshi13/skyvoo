import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightResultsHeader from '../components/FlightResults/FlightResultsHeader';
import Filters from '../components/FlightResults/Filters';
import FlightPriceDetailsModal from '../components/Modals/FlightPriceDetailsModal';
import SignInModal from '../components/Modals/SignInModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Search } from 'lucide-react';
import GrayFadedBg from '@/assets/imgs/grayfadedbg.png'
import AirlineLogo from '@/assets/imgs/airlinelogo.png'
import RipSide from '@/assets/imgs/ripSide.png'
import Stopwatch from '@/assets/vectors/stopwatch.svg'
import Cheapest from '@/assets/vectors/Cheapest.svg'
import Nonstop from '@/assets/vectors/Nonstop.svg'
import Other from '@/assets/vectors/Other.svg'
import Preference from '@/assets/vectors/Preference.svg'
import Lock from '@/assets/vectors/lock.svg'
import FlightDetails from '../components/FlightResults/FlightDetails'
import BookingFlightFormBg from "@/assets/imgs/bookingForm.png";

export default function FlightResults() {
    const navigate = useNavigate();
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [isFlightDetailsModalOpen, setIsFlightDetailsModalOpen] = useState(false);
    const [isSignInModal, setIsSignInModal] = useState(false);
    const [isSwapping, setIsSwapping] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedSort, setSelectedSort] = useState('CHEAPEST');
    const [rotation, setRotation] = useState(0);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const [tripType, setTripType] = useState('roundTrip');

    const travellerBoxRef = useRef(null);
    const [flightSearchInfo, setFlightSearchInfo] = useState({
        from: '',
        to: '',
        depart: null,
        return: null,
        traveller: 1,
    });

    const [travellers, setTravellers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        classType: 'Economy/Premium Economy',
    });

    const [showTravellerBox, setShowTravellerBox] = useState(false);

    const handleFlightInputChange = (field, value) => {
        setFlightSearchInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSwap = () => {
        setRotation(prevRotation => prevRotation + 180);
        setIsSwapping(prev => !prev);

        setFlightSearchInfo(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    const validateTravellers = () => {
        // Interpret '>9' as 10, '>6' as 7 for validation and totals
        setShowTravellerBox(!showTravellerBox)
        const adultsVal = travellers.adults === '>9' ? 10 : travellers.adults;
        const childrenVal = travellers.children === '>6' ? 7 : travellers.children;
        const infantsVal = travellers.infants === '>6' ? 7 : travellers.infants;

        // 1️⃣ At least one adult
        if (adultsVal < 1) {
            alert('Please select at least one adult.');
            return false;
        }

        // 2️⃣ Infants cannot exceed adults
        if (infantsVal > adultsVal) {
            alert('Infants cannot exceed the number of adults.');
            return false;
        }

        // 3️⃣ Optional overall cap (adjust if needed)
        const total = adultsVal + childrenVal + infantsVal;
        if (total > 20) {
            alert('Total passengers cannot exceed 20.');
            return false;
        }

        return true;
    };

    // Sample flight data
    const flights = [
        {
            id: 1,
            airline: "Vistara",
            flightNumber: "UK 850",
            departure: {
                time: "00:45",
                city: "New Delhi",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            arrival: {
                time: "03:45",
                city: "Mumbai",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            duration: "2h 50m",
            stops: "Non Stop",
            price: 7500,
            departure_info: "1hr 30m before departure",
            highlighted: true,
            fareSummary: {
                base: "₹6,200",
                taxes: "₹1,300",
                total: "₹7,500",
            },
            cancellation:
                "Full refund if cancelled at least 24 hours before departure. 50% refund within 24 hours of departure.",
            dateChange:
                "Date changes allowed up to 2 hours before departure with a ₹2,000 fee plus fare difference.",
        },
        {
            id: 2,
            airline: "Vistara",
            flightNumber: "UK 860",
            departure: {
                time: "05:20",
                city: "New Delhi",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            arrival: {
                time: "08:15",
                city: "Mumbai",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            duration: "2h 55m",
            stops: "2 Stops",
            price: 6800,
            departure_info: "1hr 30m before departure",
            fareSummary: {
                base: "₹5,600",
                taxes: "₹1,200",
                total: "₹6,800",
            },
            cancellation:
                "Free cancellation up to 48 hours before departure. After that, ₹1,000 fee applies.",
            dateChange:
                "Change allowed up to 4 hours before departure with ₹1,500 fee plus fare difference.",
        },
        {
            id: 3,
            airline: "Vistara",
            flightNumber: "UK 870",
            departure: {
                time: "11:00",
                city: "New Delhi",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            arrival: {
                time: "14:00",
                city: "Mumbai",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            duration: "3h 00m",
            stops: "2 Stops",
            price: 7200,
            departure_info: "1hr 30m before departure",
            highlighted: true,
            fareSummary: {
                base: "₹6,000",
                taxes: "₹1,200",
                total: "₹7,200",
            },
            cancellation:
                "Full refund if cancelled at least 24 hours before departure. 50% refund within 24 hours.",
            dateChange:
                "Date change allowed until 3 hours before departure with ₹1,800 fee plus fare difference.",
        },
        {
            id: 4,
            airline: "Vistara",
            flightNumber: "UK 880",
            departure: {
                time: "18:30",
                city: "New Delhi",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            arrival: {
                time: "21:20",
                city: "Mumbai",
                date: "15",
                day: "Mon",
                month: "Oct"
            },
            duration: "2h 50m",
            stops: "2 Stops",
            price: 6900,
            departure_info: "1hr 30m before departure",
            fareSummary: {
                base: "₹5,700",
                taxes: "₹1,200",
                total: "₹6,900",
            },
            cancellation:
                "Cancel up to 24 hours before departure for a ₹1,000 fee. No refund after that.",
            dateChange:
                "Date change allowed up to 1 hour before departure with ₹2,000 fee plus fare difference.",
        },
    ];

    useEffect(() => {
        function handleDocClick(e) {
            if (travellerBoxRef.current && !travellerBoxRef.current.contains(e.target)) {
                setShowTravellerBox(false);
            }
        }
        function handleEsc(e) {
            if (e.key === 'Escape') setShowTravellerBox(false);
        }
        document.addEventListener('mousedown', handleDocClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleDocClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);


    return (
        <>
            {selectedFlights.length > 0 && (
                <>
                    <div className='fixed cursor-pointer bottom-20 right-5 text-white z-1 bg-[#78080B] h-12 w-12 rounded-full flex justify-center items-center' onClick={() => setCollapsed(prev => !prev)}><Search className="h-8 w-8" /></div>

                    <div className={`fixed bottom-20 right-5 bg-white shadow-lg rounded-lg overflow-hidden z-9999 border border-gray-200 secondary-font`}>
                        <div className='relative'>

                            <div id="FlightComparisonsSection" className={`${collapsed ? 'collapsed' : ''}`}>

                                {/* Header */}
                                <div className="bg-[#0A2B4E] text-white px-4 py-2 flex justify-between items-center">
                                    <h4 className="font-semibold">Selected flights</h4>
                                    <button className="text-white cursor-pointer" onClick={() => setCollapsed(prev => !prev)}> — </button>
                                </div>

                                {/* Flight list */}
                                <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
                                    {selectedFlights.map(f => (
                                        <li
                                            key={f.id}
                                            className="flex items-center justify-between px-4 py-3"
                                        >
                                            {/* Left side: Logo + Airline */}
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={f.logoUrl || AirlineLogo}
                                                    alt={f.airline}
                                                    className="w-6 h-6 rounded"
                                                />
                                                <span className="font-medium text-gray-800">{f.airline}</span>
                                            </div>

                                            {/* Middle: Times + Progress */}
                                            <div className="flex items-center ">
                                                <div className="text-sm font-medium mr-4">{f.departure.time}</div>
                                                <div className="h-1 w-16 bg-green-400 mx-auto my-1 rounded" />
                                                <div className="text-sm font-medium ml-4">{f.arrival.time}</div>
                                            </div>

                                            {/* Remove button */}
                                            <button
                                                className="text-gray-400 hover:text-red-500 ml-3"
                                                onClick={() =>
                                                    setSelectedFlights(prev =>
                                                        prev.filter(flight => flight.id !== f.id)
                                                    )
                                                }
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Footer button */}
                                <div className="p-3 bg-[#0A2B4E] border-t border-gray-200 flex justify-end">
                                    <button className="w-[60%] cursor-pointer bg-blue-600 text-white font-bold py-2 rounded-full shadow hover:bg-blue-700 transition-colors" onClick={() => { navigate('/compare-flights') }}>
                                        COMPARE FLIGHTS
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>

            )}

            {isFlightDetailsModalOpen && <FlightPriceDetailsModal onClose={() => setIsFlightDetailsModalOpen(false)} />}
            {isSignInModal && <SignInModal onClose={() => setIsSignInModal(false)} />}
            <div className="relative min-h-screen bg-gray-100">

                <img
                    className="absolute right-0 z-1 max-w-full h-auto object-cover"
                    src={GrayFadedBg}
                    alt="gray faded background"
                />
                <FlightResultsHeader onOpen={() => setIsSignInModal(true)} />

                {/* Search Header */}
                <div className="relative bg-[#78080B] text-white px-4 py-5 z-999" style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>

                    {/* Flight Filter */}
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Main Search Grid */}
                        <div className="grid grid-cols-15 gap-4 sm:gap-6 items-end secondary-font font-semibold">

                            {/* Trip Type */}
                            <div className="col-span-2">
                                <label className="block text-base text-white">Trip Type</label>
                                <select
                                    value={tripType}
                                    onChange={(e) => setTripType(e.target.value)}
                                    className="w-full font-medium text-lg border-b border-white text-white placeholder-white focus:outline-none"
                                >
                                    <option value="oneWay" className='text-black font-medium'>One Way</option>
                                    <option value="roundTrip" className='text-black font-medium'>Round Trip</option>
                                    <option value="multiCity" className='text-black font-medium'>Multi City</option>
                                </select>
                            </div>
                            {tripType === 'multiCity' ? (
                                <div className="col-span-12 sm:col-span-11 flex flex-col items-start">
                                    <label className="block text-base text-white">From (Multi City)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter multiple destinations"
                                        value={flightSearchInfo.from}
                                        onChange={(e) => handleFlightInputChange('from', e.target.value)}
                                        className="w-full font-medium text-lg border-b border-white text-white placeholder-white focus:outline-none"
                                    />
                                </div>
                            ) : (
                                <>
                                    {/* From */}
                                    < div className="col-span-2">
                                        <label className="block text-base text-white">From</label>
                                        <input
                                            type="text"
                                            placeholder="Origin"
                                            value={flightSearchInfo.from}
                                            onChange={(e) => handleFlightInputChange('from', e.target.value)}
                                            className="w-full font-medium text-lg border-b border-white text-white placeholder-white focus:outline-none"
                                        />
                                    </div>

                                    {/* Swap */}
                                    <div className="col-span-1 flex justify-center my-2 sm:my-0">
                                        <button
                                            type="button"
                                            onClick={handleSwap}
                                            aria-label="Swap origin and destination"
                                            className="cursor-pointer p-2 rounded-full transition-transform duration-300"
                                        >
                                            <div
                                                className="relative w-6 h-6 transition-transform duration-500"
                                                style={{ transform: `rotate(${rotation}deg)` }}
                                            >
                                                <svg className="absolute top-0 left-0 w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translate(4px,-4px) rotate(90deg)' }}>
                                                    <path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.526V18l-2 3h6l-2-3v-4.316L22 16.21z" />
                                                </svg>
                                                <svg className="absolute top-0 left-0 w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translate(4px,10px) rotate(-90deg)' }}>
                                                    <path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.526V18l-2 3h6l-2-3v-4.316L22 16.21z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div >

                                    {/* To */}
                                    < div className="col-span-2" >
                                        <label className="block text-base text-white">To</label>
                                        <input
                                            type="text"
                                            placeholder="Destination"
                                            value={flightSearchInfo.to}
                                            onChange={(e) => handleFlightInputChange('to', e.target.value)}
                                            className="w-full text-lg font-medium border-b border-white text-white focus:outline-none placeholder-white"
                                        />
                                    </div >

                                    {/* Depart */}
                                    < div className="col-span-2" >
                                        <label className="block text-base text-white">Depart</label>
                                        <DatePicker
                                            selected={flightSearchInfo.depart}
                                            onChange={(date) => handleFlightInputChange('depart', date)}
                                            minDate={new Date()}
                                            monthsShown={2}
                                            placeholderText="Select Depart"
                                            className="w-full font-medium text-lg text-white border-b border-white focus:outline-none placeholder-white react-datepicker-popper"
                                        />
                                    </div >

                                    {/* Return (conditionally rendered) */}
                                    {
                                        tripType === 'roundTrip' && (
                                            <div className="col-span-2">
                                                <label className="block text-base text-white">Return</label>
                                                <div className="flex items-center justify-between">
                                                    <DatePicker
                                                        selected={flightSearchInfo.return}
                                                        onChange={(date) => handleFlightInputChange('return', date)}
                                                        minDate={flightSearchInfo.depart ?? new Date()}
                                                        monthsShown={2}
                                                        placeholderText="Select Return"
                                                        className="w-full font-medium text-lg text-white border-b border-white focus:outline-none placeholder-white react-datepicker-popper"
                                                    />
                                                    {flightSearchInfo.return && (
                                                        <div
                                                            className="bg-[#0a223d] rounded-full w-4 h-4 flex justify-center items-center cursor-pointer hover:bg-[#12345a]"
                                                            onClick={() => handleFlightInputChange('return', null)}
                                                        >
                                                            <X className="h-3 w-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/* Traveler */}
                                    <div className="col-span-2 relative">
                                        <label className="block text-base">Travelers & Class</label>

                                        <div onClick={() => setShowTravellerBox(!showTravellerBox)} className="cursor-pointer border-b border-white text-white font-medium text-lg flex justify-between items-center"
                                        >
                                            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                                {(() => {
                                                    // Helper to convert a value that may be ">n" to a number
                                                    const toNumber = v => {
                                                        if (typeof v === 'string' && v.startsWith('>')) {
                                                            // return the numeric part (e.g. '>9' -> 9) or treat as a large number if you prefer
                                                            const parsed = parseInt(v.slice(1), 10);
                                                            return Number.isNaN(parsed) ? 0 : parsed;
                                                        }
                                                        const n = Number(v);
                                                        return Number.isNaN(n) ? 0 : n;
                                                    };

                                                    const totalTravellers = [travellers.adults, travellers.children, travellers.infants].reduce((acc, v) => acc + toNumber(v), 0);

                                                    return `${totalTravellers} Traveller${totalTravellers > 1 ? 's' : ''} • ${travellers.classType}`;
                                                })()}
                                            </span>
                                        </div>

                                        {showTravellerBox && (
                                            <div ref={travellerBoxRef} className="absolute right-0 z-999 mt-2 w-[45rem] bg-white rounded-md shadow-lg px-6 py-5 space-y-6 text-black">
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-gray-800 text-base">
                                                        ADULTS (12y+) <br /> <span className='text-sm font-medium'> on the day of travel </span>
                                                    </p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex border rounded-md overflow-hidden">
                                                            {Array.from({ length: 9 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    onClick={() =>
                                                                        setTravellers(t => ({ ...t, adults: i + 1 }))
                                                                    }
                                                                    className={`px-3 py-2 text-sm cursor-pointer border-r last:border-r-0
                 ${travellers.adults === i + 1 ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}
              `}
                                                                >
                                                                    {i + 1}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                setTravellers(t => ({ ...t, adults: '>9' }))
                                                            }
                                                            className={`px-4 py-2 text-sm cursor-pointer border rounded-md
             ${travellers.adults === '>9' ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}
          `}
                                                        >
                                                            &gt;9
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CHILDREN & INFANTS side by side */}
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between items-start gap-6">
                                                        {/* Children */}
                                                        <div className='flex flex-col'>
                                                            <p className="font-semibold text-gray-800 text-base">
                                                                CHILDREN (2y - 12y) <br /> <span className='text-sm font-medium'>on the day of travel</span>
                                                            </p>
                                                            <div className='flex justify-between items-start mt-2'>
                                                                <div className="flex border rounded-md overflow-hidden">
                                                                    {Array.from({ length: 6 }).map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            onClick={() =>
                                                                                setTravellers(t => ({ ...t, children: i }))
                                                                            }
                                                                            className={`px-3 py-2 text-sm cursor-pointer border-r last:border-r-0
                 ${travellers.children === i ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}
              `}
                                                                        >
                                                                            {i}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div
                                                                    onClick={() => setTravellers(t => ({ ...t, children: '>6' }))
                                                                    }
                                                                    className={`ml-4 px-4 py-2 text-sm cursor-pointer border rounded-md ${travellers.children === '>6' ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}`} >
                                                                    &gt;6
                                                                </div>
                                                            </div>

                                                        </div>

                                                        {/* Infants */}
                                                        <div className='flex flex-col items-start'>
                                                            <p className="font-semibold text-gray-800 text-base">
                                                                INFANTS (below 2y) <br />  <span className='text-sm font-medium'> on the day of travel </span>
                                                            </p>

                                                            <div className='flex justify-between items-start mt-2'>
                                                                <div className="mr-4 flex border rounded-md overflow-hidden">
                                                                    {Array.from({ length: 6 }).map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            onClick={() =>
                                                                                setTravellers(t => ({ ...t, infants: i }))
                                                                            }
                                                                            className={`px-3 py-2 text-sm cursor-pointer border-r last:border-r-0
                 ${travellers.infants === i ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}
              `}
                                                                        >
                                                                            {i}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        setTravellers(t => ({ ...t, infants: '>6' }))
                                                                    }
                                                                    className={`px-4 py-2 text-sm cursor-pointer border rounded-md
             ${travellers.infants === '>6' ? 'bg-[#78080B] text-white' : 'hover:bg-gray-100'}
          `}
                                                                >
                                                                    &gt;6
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <hr className="border-gray-200" />

                                                {/* CLASS SELECTOR */}
                                                <div>
                                                    <p className="font-semibold text-gray-800 mb-3 uppercase tracking-wide text-base">
                                                        Choose Travel Class
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Economy/Premium Economy', 'Premium Economy', 'Business', 'First Class']
                                                            .map(cls => (
                                                                <button
                                                                    key={cls}
                                                                    onClick={() => setTravellers(t => ({ ...t, classType: cls }))}
                                                                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors 
                ${travellers.classType === cls
                                                                            ? 'bg-[#78080B] text-white'
                                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
              `}
                                                                >
                                                                    {cls}
                                                                </button>
                                                            ))}
                                                    </div>
                                                </div>

                                                {/* Search Button */}
                                                <div onClick={validateTravellers} className="cursor-pointer col-span-12 sm:col-span-2 flex justify-center bg-[#78080B] rounded-sm p-1">
                                                    <button className='btn '>
                                                        <span className="cursor-pointer button-text text-white secondary-font">D O N E</span>
                                                    </button>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </>
                            )
                            }

                            {/* Search Button */}
                            <div className="col-span-2 flex justify-center relative">
                                <a href="#" id='ModifySearchButton'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    MODIFY SEARCH</a>
                            </div>

                        </div >
                    </div >

                    {/* Fare Type */}
                    < div className="filter-section max-w-7xl mx-auto mt-4 font-medium" >
                        <div className="flex items-center justify-start space-x-6">
                            {/* Label */}
                            <span className="text-base">Fare Type</span>

                            {/* Glass effect wrapper */}
                            <div className="flex flex-row space-x-6 rounded-xl filterglasseffect px-4 ">
                                {[
                                    { value: "regular", label: "Regular", checked: true },
                                    { value: "student", label: "Student" },
                                    { value: "senior", label: "Senior Citizen" },
                                    { value: "armed", label: "Armed Forces" },
                                    { value: "doctor", label: "Doctor and Nurses" },
                                ].map(({ value, label, checked }, i) => (
                                    <div
                                        key={value}
                                        className={`${i !== 0 ? "border-l border-white" : ""}`}
                                    >
                                        <label className="flex py-2 ml-2 items-center space-x-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="fareType"
                                                value={value}
                                                defaultChecked={checked}
                                                className="mr-2 text-red-600 focus:ring-0"
                                            />
                                            <span>{label}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div >

                </div >

                {/* Main Content */}
                < div className="relative max-w-7xl mx-auto px-4 py-6 z-50" >
                    <div className="flex gap-6">
                        {/* Filters Sidebar */}
                        <Filters />

                        {/* Results Area */}
                        <div className="flex-1">
                            {/* Sorting Options */}
                            <div className="glasseffect rounded-lg shadow-sm px-8 py-3 mb-4 secondary-font">
                                <div className="grid grid-cols-4 gap-4">
                                    <button
                                        className={`cursor-pointer px-4 py-2 rounded flex items-center justify-start ${selectedSort === 'CHEAPEST' ? 'bg-white ' : 'bg-gray-100'}`}
                                        style={{ boxShadow: "3px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
                                        onClick={() => setSelectedSort('CHEAPEST')}
                                    >
                                        <div className='mr-4 border-1 border-solid border-[#A8A8A8] bg-[#D9D9D9] p-1 rounded-md'>
                                            <img src={Cheapest} alt="cheapest" />
                                        </div>
                                        <div className='text-start'>
                                            <div className="text-base font-medium">CHEAPEST</div>
                                            <div className="text-xs">₹ 5,500 | 2h 50m</div>
                                        </div>
                                    </button>

                                    <button
                                        className={`cursor-pointer px-4 py-2 rounded flex items-center justify-start ${selectedSort === 'CHEAPEST' ? 'bg-white ' : 'bg-gray-100'}`}
                                        style={{ boxShadow: "3px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
                                        onClick={() => setSelectedSort('CHEAPEST')}
                                    >
                                        <div className='mr-3 border-1 border-solid border-[#A8A8A8] bg-[#D9D9D9] p-1 rounded-md'>
                                            <img src={Nonstop} alt="Nonstop" />
                                        </div>
                                        <div className='text-start'>
                                            <div className="text-base font-medium">NON STOP FIRST</div>
                                            <div className="text-xs">₹ 9,900 | 02h 20m</div>
                                        </div>
                                    </button>

                                    <button
                                        className={`cursor-pointer px-4 py-2 rounded flex items-center justify-start ${selectedSort === 'CHEAPEST' ? 'bg-white ' : 'bg-gray-100'}`}
                                        style={{ boxShadow: "3px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
                                        onClick={() => setSelectedSort('CHEAPEST')}
                                    >
                                        <div className='mr-4 border-1 border-solid border-[#A8A8A8] bg-[#D9D9D9] p-1 rounded-md'>
                                            <img src={Preference} alt="Preference" />
                                        </div>
                                        <div className='text-start'>
                                            <div className="text-lg font-medium">BEST PICK</div>
                                            <div className="text-xs">₹ 7,900 | 01 h 20m</div>
                                        </div>
                                    </button>

                                    <button
                                        className={`cursor-pointer px-4 py-2 rounded flex items-center justify-start ${selectedSort === 'CHEAPEST' ? 'bg-white ' : 'bg-gray-100'}`}
                                        style={{ boxShadow: "3px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
                                        onClick={() => setSelectedSort('CHEAPEST')}
                                    >
                                        <div className='mr-4 border-1 border-solid border-[#A8A8A8] bg-[#D9D9D9] p-1 rounded-md'>
                                            <img src={Other} alt="Other" />
                                        </div>
                                        <div className='text-start'>
                                            <div className="text-lg font-medium">OTHER</div>
                                            <div className="text-xs">Sort</div>
                                        </div>
                                    </button>

                                </div>

                                <h2 className="text-xl font-bold mt-4">
                                    Flights from New Delhi to Mumbai
                                </h2>
                            </div>


                            {/* Flight Results */}
                            <div className="space-y-4">
                                {flights.map((flight) => (
                                    <div key={flight.id} className={`rounded-2xl`}>

                                        <div className={`py-4 relative bg-cover bg-center rounded-xl shadow-sm hover:shadow-md transition-shadow secondary-font  ${flight.highlighted ? "" : ""}`}
                                            style={{ backgroundImage: `url(${BookingFlightFormBg})`, boxShadow: "-3px 4px 20px -2px rgba(0, 0, 0, 0.25)" }}>
                                            <img
                                                className="absolute -right-[0.330rem] top-1/2 -translate-y-1/2 h-[90%] hidden lg:block"
                                                src={RipSide}
                                                alt="ribbon side"
                                            />
                                            {/* ---- Top Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                {/* Left section */}
                                                <div className='pl-5 pr-40 relative' style={{ position: 'relative' }}>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(90deg, rgba(196,36,36,0.5) 0%, rgba(255,255,255,0.5) 100%)',
                                                            pointerEvents: 'none', // ensures text is clickable/selectable
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                    {/* Content */}
                                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                                        <p className='text-xs'>Free Seat With VISA Card*</p>
                                                    </div>
                                                </div>

                                                {/* Right section with gradient */}
                                                <div className="pr-5 flex items-center px-3 py-1 rounded">
                                                    <img src={Stopwatch} alt="stopwatch" className="w-4 h-4 mr-2" />
                                                    <span className="text-gray-800 font-medium">96% on Time</span>
                                                </div>
                                            </div>

                                            {/* ---- Main Row ---- */}
                                            <div className="py-5 px-3 flex items-center justify-between space-x-6">
                                                {/* Airline info */}
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                                        <img src={AirlineLogo} alt="airline logo" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{flight.airline}</div>
                                                        <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                                                    </div>
                                                </div>

                                                {/* Departure */}
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold">{flight.departure.time}</div>
                                                    <div className="text-sm text-gray-500">{flight.departure.city}</div>
                                                </div>

                                                {/* Flight duration and stops */}
                                                <div className="flex flex-col items-center font-semibold">
                                                    <div className="text-sm text-gray-500 mb-2">{flight.duration}</div>
                                                    <div className="relative w-24 h-0.5 rounded-xl bg-[#920000]">
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-2">{flight.stops}</div>
                                                </div>

                                                {/* Arrival */}
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold">{flight.arrival.time}</div>
                                                    <div className="text-sm text-gray-500">{flight.arrival.city}</div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">₹ {flight.price.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-500">Per Adult</div>
                                                </div>

                                                {/* Button */}
                                                <button className="cursor-pointer bg-[#811919] hover:bg-[#741111] text-white px-4 py-1 rounded-full font-medium text-sm" onClick={() => setIsFlightDetailsModalOpen(true)}>
                                                    VIEW PRICES
                                                </button>
                                            </div>


                                            {/* ---- Mid Bottom Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                {/* Left section */}
                                                <div className="ml-2 pr-3 flex items-center px-3 py-1 rounded hover:bg-red-200 transition-colors duration-300 ease-in-out">
                                                    {selectedFlights.some(f => f.id === flight.id) ? (
                                                        // When flight is selected → show "Added" + remove button
                                                        <span className="flex items-center">
                                                            <span>Added</span>
                                                            <span
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // prevent parent click
                                                                    setSelectedFlights(prev => prev.filter(f => f.id !== flight.id));
                                                                }}
                                                                className="ml-2 text-[#910E0E] font-bold w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                                                            >
                                                                <X size={12} strokeWidth={3} />
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        // When flight is not selected → show add text
                                                        <span
                                                            className="text-[#811919] font-semibold cursor-pointer"
                                                            onClick={() => {
                                                                if (selectedFlights.length < 3) {
                                                                    setSelectedFlights(prev => [...prev, flight]);
                                                                } else {
                                                                    alert("You can only select up to 3 flights to compare.");
                                                                }
                                                            }}
                                                        >
                                                            Add Compare More +
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Right section with gradient */}
                                                <div className='pr-25 relative rounded-full' style={{ position: 'relative' }}>
                                                    <div className='rounded-l-full'
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(90deg, rgba(205 205 205) 0%, rgba(255,255,255,0.5) 100%)',
                                                            pointerEvents: 'none',
                                                            zIndex: 0,
                                                        }}
                                                    />

                                                    {/* Content */}
                                                    <div className='flex flex-row' style={{ position: 'relative', zIndex: 1 }}>
                                                        <img src={Lock} alt="LOCK" className='px-2' />
                                                        <p className='text-xs'>Lock this price starting from ₹ 413</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ---- Bottom Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                {/* Left section */}
                                                <div className='pl-5 pr-55 relative' style={{ position: 'relative' }}>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(90deg, rgba(205 205 205) 0%, rgba(255,255,255,0.5) 100%)',
                                                            pointerEvents: 'none', // ensures text is clickable/selectable
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                    {/* Content */}
                                                    <div style={{ position: 'relative', zIndex: 1 }} className='flex flex-row items-center'>
                                                        <div className='bg-[#720E0E] w-2 h-2 rounded-full mr-2'></div>
                                                        <p className='text-xs'>FLAT ₹177 OFF using  MMTSUPER</p>
                                                    </div>
                                                </div>

                                                {/* Right section with gradient */}
                                                <div className="pr-5 flex items-center px-3 py-1 rounded">
                                                    <button className="text-[#811919] cursor-pointer hover:underline text-sm"
                                                        onClick={() =>
                                                            setSelectedFlightId(
                                                                selectedFlightId === flight.id ? null : flight.id
                                                            )
                                                        }
                                                    >
                                                        {selectedFlightId === flight.id ? "Hide" : "View"} Flight Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ---- Slide-Down Details ---- */}
                                        <div
                                            className={`shadow-2xl mt-5 overflow-hidden transition-[max-height] duration-900 ease-in-out ${selectedFlightId === flight.id ? "max-h-96" : "max-h-0"}`}
                                        >
                                            {selectedFlightId === flight.id && (
                                                <FlightDetails flight={flight} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}