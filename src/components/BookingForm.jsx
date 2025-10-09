import React, { useState } from 'react';
import Select, { components } from "react-select";
import { X, CirclePlus, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Plane from '@/assets/vectors/Plane.svg';
import Bed from '@/assets/vectors/Bed.svg';
import Car from '@/assets/vectors/Car.svg';
import Mic from '@/assets/vectors/Mic.svg';
import FlyingPlane from '@/assets/vectors/FlyingPlane.svg';
import Person from '@/assets/vectors/Person.svg';
import RipSide from '@/assets/imgs/ripSide.png';
import BookingFlightFormBg from "@/assets/imgs/bookingForm.png";
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm() {

    const navigate = useNavigate();
    const [tripType, setTripType] = useState('oneWay');
    const [fareType, setFareType] = useState('regular');
    const [isSwapping, setIsSwapping] = useState(false);
    const [rotation, setRotation] = useState(0);

    const [flightSearchInfo, setFlightSearchInfo] = useState({
        from: null,
        to: null,
        depart: null,
        coach: null,
        return: null,
        traveller: 1,
        Adult: 1,
        Child: 1,
        Infant: 1,
    });

    console.log(flightSearchInfo, 'see this info')

    const AirportOptions = [
        {
            airportCode: "BOM",
            airportName: "Chhatrapati Shivaji International Airport",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "DEL",
            airportName: "Indira Gandhi International Airport",
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "IATA",
            airportName: "Safdarjung Airport",
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "HDO",
            airportName: "Hindon Airport",
            city: "Ghaziabad",
            state: "Delhi",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "BLR",
            airportName: "Kempegowda International Airport",
            city: "Bengaluru",
            state: "Karnataka",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "MAA",
            airportName: "Chennai International Airport",
            city: "Chennai",
            state: "Tamil Nadu",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "CCU",
            airportName: "Netaji Subhas Chandra Bose International Airport",
            city: "Kolkata",
            state: "West Bengal",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "PQQ",
            airportName: "Lune Airport",
            city: "Tune",
            state: "Unknown",
            country: "India",
            countryCode: "IN"
        },
        {
            airportCode: "BKK",
            airportName: "Suvarnabhumi Airport",
            city: "Bangkok",
            state: "Bangkok",
            country: "Thailand",
            countryCode: "TH"
        },
        {
            airportCode: "LHR",
            airportName: "Heathrow Airport",
            city: "London",
            state: "England",
            country: "United Kingdom",
            countryCode: "GB"
        },
        {
            airportCode: "JFK",
            airportName: "John F. Kennedy International Airport",
            city: "New York",
            state: "New York",
            country: "USA",
            countryCode: "US"
        },
        {
            airportCode: "CDG",
            airportName: "Charles de Gaulle Airport",
            city: "Paris",
            state: "Île-de-France",
            country: "France",
            countryCode: "FR"
        },
        {
            airportCode: "DXB",
            airportName: "Dubai International Airport",
            city: "Dubai",
            state: "Dubai",
            country: "UAE",
            countryCode: "AE"
        },
        {
            airportCode: "SYD",
            airportName: "Sydney Kingsford Smith Airport",
            city: "Sydney",
            state: "New South Wales",
            country: "Australia",
            countryCode: "AU"
        },
        {
            airportCode: "HND",
            airportName: "Tokyo Haneda Airport",
            city: "Tokyo",
            state: "Tokyo",
            country: "Japan",
            countryCode: "JP"
        },
        {
            airportCode: "FRA",
            airportName: "Frankfurt am Main Airport",
            city: "Frankfurt",
            state: "Hesse",
            country: "Germany",
            countryCode: "DE"
        },
        {
            airportCode: "SIN",
            airportName: "Changi Airport",
            city: "Singapore",
            state: "Singapore",
            country: "Singapore",
            countryCode: "SG"
        }
    ];

    const CoachOptions = [
        { value: "Economy", label: "Economy" },
        { value: "Premium Economy", label: "Premium Economy" },
        { value: "Business", label: "Business" },
        { value: "First Class", label: "First Class" },
        { value: "Economy/Premium Economy", label: "Economy/Premium Economy" },
        { value: "Business/First Class", label: "Business/First Class" },
    ];

    const CustomOption = (props) => (
        <components.Option {...props}>
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-gray-900">{props.data.city}, {props.data.country}</span>
                    <span className="text-gray-400 text-sm">{props.data.airportName}</span>
                </div>
                <span className="font-medium text-gray-700">{props.data.airportCode}</span>
            </div>
        </components.Option>
    );

    const handleFlightInputChange = (field, value) => {
        setFlightSearchInfo(prev => {
            let updated = { ...prev, [field]: value };

            // Enforce logical consistency
            if (field === "depart" && updated.return && value && value > updated.return) {
                updated.return = null; // clear return if it’s before new depart
            }

            if (field === "return" && updated.depart && value && value < updated.depart) {
                updated.depart = null; // clear depart if it’s after new return (optional)
            }

            return updated;
        });
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

    const searchFlightResults = () => {

        const travelType = "000";

        const dataformat = {
            Travel_Type: 0,
            Booking_Type: 0,
            TripInfo: [
                {
                    Origin: "BOM",
                    Destination: "MAA",
                    TravelDate: "01/25/2022",
                    Trip_Id: 0
                }
            ],
            Adult_Count: 1,
            Child_Count: 0,
            Infant_Count: 0,
            Class_Of_Travel: 0,
            InventoryType: 0,
            Source_Type: 0,
            Filtered_Airline: [
                {
                    "Airline_Code": ""
                }
            ]
        }

        navigate('/search-results');
    };

    return (
        <div
            className="relative grid grid-cols-12 gap-8 bg-no-repeat bg-cover bg-center rounded-[45px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{ backgroundImage: `url(${BookingFlightFormBg})` }}
        >
            <img
                className="absolute -right-2 top-1/2 -translate-y-1/2 h-[77%] hidden lg:block"
                src={RipSide}
                alt="ribbon side"
            />

            <div className="col-span-12 p-6 sm:p-8 lg:p-10">
                {/* Tab Navigation */}
                <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 sm:space-x-3 mb-4 text-black text-lg font-semibold">
                    <button className="secondary-font flex items-center space-x-1 bg-[#D9D9D9] rounded-md px-3 sm:px-4 py-1 cursor-pointer text-black border-2 border-black">
                        <img src={Plane} alt="plane" className="w-5 h-5" />
                        <span className='ml-1'>Flights</span>
                    </button>

                    <button className="secondary-font flex items-center space-x-1 rounded-md px-3 sm:px-4 py-1 cursor-pointer border-2 border-transparent hover:bg-[#D9D9D9] hover:border-black hover:text-black">
                        <img src={Bed} alt="bed" className="w-6 h-6 sm:w-7 sm:h-7" />

                        <span className='ml-1'>Hotels</span>
                    </button>

                    <button className="secondary-font flex items-center space-x-1 rounded-md px-3 sm:px-4 py-1 cursor-pointer border-2 border-transparent hover:bg-[#D9D9D9] hover:border-black hover:text-black">
                        <img src={Car} alt="car" className="w-6 h-6 sm:w-7 sm:h-7" />
                        <span className='ml-1'>Cabs</span>
                    </button>

                    <button className="secondary-font flex items-center text-black font-medium cursor-pointer px-3 sm:px-4 py-2 border-2 border-transparent hover:text-gray-500 ml-auto">
                        <img src={Mic} alt="mic" className="w-5 h-5" />
                        <span className='ml-1'>Customer Support</span>
                    </button>
                </div>

                <div className='mb-3 grid grid-cols-12 gap-8 '> <div className="col-span-8 flex items-center relative" style={{ right: "40px" }} > <div className=" h-4 relative ribbon animate-ribbon mr-2"></div> <img src={FlyingPlane} alt="flyingplane" /> </div> </div>

                {/* Trip Type Selection */}
                <div className="flex filter-section flex-wrap gap-2 sm:gap-4 mb-4 text-lg secondary-font font-semibold">
                    {['oneWay', 'roundTrip', 'multiCity'].map(type => (
                        <label key={type} className="flex items-center cursor-pointer">
                            <div className={clsx(
                                'secondary-font px-4 py-2 flex items-center rounded-md',
                                tripType === type ? 'bg-black text-white' : 'text-black'
                            )}>
                                <input
                                    type="radio"
                                    name="tripType"
                                    value={type}
                                    checked={tripType === type}
                                    onChange={(e) => setTripType(e.target.value)}
                                    className="w-4 h-4 mr-2"
                                />
                                <span>{type === 'oneWay' ? 'One Way' : type === 'roundTrip' ? 'Round Trip' : 'Multi-City'}</span>
                            </div>
                        </label>
                    ))}

                    <div className="relative secondary-font font-semibold w-full sm:w-auto">
                        <Select
                            options={CoachOptions}
                            value={flightSearchInfo.coach || null}
                            onChange={(option) => handleFlightInputChange("coach", option || null)}
                            placeholder="Coach"
                            isSearchable
                            classNamePrefix="coach-select"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            getOptionLabel={(option) => option.label}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: "transparent",
                                    border: "none",
                                    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
                                    padding: "2px 4px",
                                    minHeight: "38px",
                                    color: "black",
                                    fontSize: '1.155rem',
                                    fontWeight: '600',
                                    fontFamily: "Poppins, sans-serif",
                                    "&:hover": { borderColor: "#000" },
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50,
                                    width: "300px",
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused ? "#f3f4f6" : "transparent",
                                    color: "black",
                                    cursor: "pointer",
                                    padding: "8px 12px",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "black",
                                    fontSize: '1.155rem',
                                    fontWeight: '600',
                                    fontFamily: "Poppins, sans-serif",
                                }),
                                dropdownIndicator: (base) => ({
                                    ...base,
                                    color: "black",
                                    padding: 4,
                                    svg: {
                                        fontSize: "1.155rem",
                                        fontWeight: "600",
                                    },
                                }),

                            }}
                        />

                    </div>
                </div>

                {/* Flight Search Form */}
                <div className="w-full max-w-6xl mx-auto p-2 sm:p-1">
                    <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end secondary-font font-semibold">

                        {/* From */}
                        <div className="col-span-12 sm:col-span-2">
                            <label className="block text-lg text-gray-700">From</label>
                            <Select
                                options={AirportOptions}
                                value={flightSearchInfo.from} // store full object
                                onChange={(option) => { handleFlightInputChange("from", option) }}
                                placeholder="Origin"
                                isSearchable
                                menuPlacement="top"
                                getOptionLabel={(option) => `${option.city} - ${option.airportName}`}
                                components={{
                                    Option: CustomOption,
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                }}
                                filterOption={(option, inputValue) => {
                                    const { airportCode, airportName, city, state, country, countryCode } = option.data;
                                    const search = inputValue.toLowerCase();
                                    return (
                                        airportCode.toLowerCase().includes(search) ||
                                        airportName.toLowerCase().includes(search) ||
                                        city.toLowerCase().includes(search) ||
                                        state.toLowerCase().includes(search) ||
                                        country.toLowerCase().includes(search) ||
                                        countryCode.toLowerCase().includes(search)
                                    );
                                }}
                                classNamePrefix="flight-select"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "1px solid",
                                        borderColor: state.isFocused ? "#3b82f6" : "#9ca3af",
                                        borderRadius: 0,
                                        boxShadow: "none",
                                        padding: "2px 0",
                                        fontSize: "1.25rem",
                                        color: "#525252",
                                        "&:hover": { borderColor: "#3b82f6" },
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused
                                            ? "#e5e7eb" // light gray on hover
                                            : "transparent", // keep selected option background transparent
                                        color: "#111827",
                                        cursor: "pointer",
                                        "&:active": { backgroundColor: "#d1d5db" },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 50,
                                        width: "400px",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        padding: 0,
                                    }),
                                }}
                            />

                        </div>

                        {/* Swap */}
                        <div className="col-span-12 sm:col-span-1 flex justify-center sm:justify-center my-2 sm:my-0">
                            <button
                                onClick={handleSwap}
                                className="p-2 cursor-pointer rounded-full transition-all duration-300"
                            >
                                <div
                                    className="relative w-6 h-6 transition-transform duration-500"
                                    style={{ transform: `rotate(${rotation}deg)` }}
                                >
                                    <svg className="absolute top-0 left-0 w-4 h-4 text-black transition-all duration-500" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translate(4px, -4px) rotate(90deg)' }}>
                                        <path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.526V18l-2 3h6l-2-3v-4.316L22 16.21z" />
                                    </svg>
                                    <svg className="absolute top-0 left-0 w-4 h-4 text-black transition-all duration-500" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translate(4px, 10px) rotate(-90deg)' }}>
                                        <path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.526V18l-2 3h6l-2-3v-4.316L22 16.21z" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* To */}
                        <div className="col-span-12 sm:col-span-2">
                            <label className="block text-lg text-gray-700">To</label>
                            <Select
                                options={AirportOptions}
                                value={flightSearchInfo.to || null} // store full object
                                onChange={(option) => { handleFlightInputChange("to", option || null) }}

                                placeholder="Destination"
                                isSearchable
                                menuPlacement="top"
                                getOptionLabel={(option) => `${option.city} - ${option.airportName}`} // display format
                                components={{
                                    Option: CustomOption,
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                }}
                                filterOption={(option, inputValue) => {
                                    const { airportCode, airportName, city, state, country, countryCode } = option.data;
                                    const search = inputValue.toLowerCase();
                                    return (
                                        airportCode.toLowerCase().includes(search) ||
                                        airportName.toLowerCase().includes(search) ||
                                        city.toLowerCase().includes(search) ||
                                        state.toLowerCase().includes(search) ||
                                        country.toLowerCase().includes(search) ||
                                        countryCode.toLowerCase().includes(search)
                                    );
                                }}
                                classNamePrefix="flight-select"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "1px solid",
                                        borderColor: state.isFocused ? "#3b82f6" : "#9ca3af",
                                        borderRadius: 0,
                                        boxShadow: "none",
                                        padding: "2px 0",
                                        fontSize: "1.25rem",
                                        color: "#525252",
                                        "&:hover": { borderColor: "#3b82f6" },
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? "#e5e7eb" : "transparent", // remove blue for selected
                                        color: "#111827",
                                        cursor: "pointer",
                                        "&:active": { backgroundColor: "#d1d5db" },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 50,
                                        width: "400px",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        padding: 0,
                                    }),
                                }}
                            />
                        </div>

                        {/* Depart */}
                        <div className="col-span-2" >
                            <label className="block text-lg text-gray-700 flex items-center gap-2">Depart</label>
                            
                            <DatePicker
                                selected={flightSearchInfo.depart}
                                onChange={(date) => handleFlightInputChange('depart', date)}
                                minDate={new Date()}
                                maxDate={flightSearchInfo.return || null}
                                monthsShown={2}
                                placeholderText="Select Depart"
                                className="w-full text-xl text-[#525252] border-b focus:outline-none placeholder-[#808080] p-2"
                            />
                        </div >

                        {/* Return */}
                        <div className="col-span-2">
                            <div className='flex items-center justify-between'>
                                <label className="block text-lg text-gray-700 flex items-center gap-2">Return</label>
                                {flightSearchInfo.return && (
                                    <div
                                        className="bg-[#0a223d] rounded-full w-4 h-4 flex justify-center items-center cursor-pointer hover:bg-[#12345a]"
                                        onClick={() => handleFlightInputChange('return', null)}
                                    >
                                        <X className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <DatePicker
                                    selected={flightSearchInfo.return}

                                    onChange={(date) => {
                                        if (!date) return handleFlightInputChange('return', null);

                                        const formattedDate = date.toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            weekday: 'long',
                                        });
                                        handleFlightInputChange('return', formattedDate);
                                    }}
                                    minDate={flightSearchInfo.depart || new Date()} // must 
                                    monthsShown={2}
                                    placeholderText="Select Return"
                                    className="w-full text-xl text-[#525252] border-b focus:outline-none placeholder-[#808080] p-2"
                                />

                            </div>
                        </div>

                        {/* Traveler */}
                        <div className="col-span-12 sm:col-span-2 flex items-center gap-3">
                            <img src={Person} alt="traveler" className="w-6 h-6" />
                            <div className="flex flex-col">
                                <label className="block text-lg text-gray-700 flex items-center gap-2">Traveler</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="1"
                                    value={flightSearchInfo.traveller}
                                    onChange={(e) => handleFlightInputChange('traveller', e.target.value)}
                                    className="w-16 text-xl border text-[#525252] border-gray-400 rounded-md text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none[appearance:textfield]"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="col-span-12 sm:col-span-1 flex justify-center">
                            <button className="cursor-pointer bg-black hover:bg-gray-800 text-white p-4 rounded-xl transition flex items-center justify-center" onClick={() => { searchFlightResults() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="fare-filter-section pt-3 flex flex-wrap sm:flex-nowrap items-center justify-between secondary-font font-semibold gap-4">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="fareType" value="regular" checked={fareType === 'regular'} onChange={(e) => setFareType(e.target.value)} className="w-4 h-4 cursor-pointer" />
                            <span className="text-gray-700">Regular Fare</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="fareType" value="student" checked={fareType === 'student'} onChange={(e) => setFareType(e.target.value)} className="w-4 h-4 cursor-pointer" />
                            <span className="text-gray-700">Student Fare</span>
                        </label>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-black hover:border-black border-b border-b-2 pb-1 border-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">My Booking</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
                            <CirclePlus className="w-4 h-4" />
                            <span className="text-sm">Flight Status</span>
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default BookingForm;
