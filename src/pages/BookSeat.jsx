import React, { useState, useMemo } from 'react';
import SeatMapData from '../Data/SeatMapData.js';
import { Plus, LogOut, Plane } from 'lucide-react';

import AirlineLogo from '@/assets/imgs/airlinelogo.webp'
import { useNavigate } from 'react-router-dom';

const FlightSeatMap = () => {
    
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const seatData = SeatMapData.AirSeatMaps[0].Seat_Segments[0].Seat_Row;
    const navigate = useNavigate();

    const SSRTypes = ['Baggage', 'Meals', 'Complimentary Meals', 'Seat', 'Sports', 'BagOutFirst', 'Lounge', 'Celebration', 'CarryMore', 'FastForward', 'Wheelchair', 'FrequentFlyer', 'Others'];

    const legendItems = [
        { label: "Available", color: "border-2 border-[#16a249] bg-white" },
        { label: "Selected", color: "bg-indigo-600 border-indigo-600 text-white shadow-md" },
        { label: "Booked", color: "bg-[#ef434333] border-2 border-[#ef434366]" },
        { label: "Blocked", color: "bg-gray-300 text-gray-500" },
        {
            label: "Extra Legroom",
            color: "border-2 border-[#16a249] bg-white relative",
            icon: <Plus className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
        },
        {
            label: "Exit Row",
            color: "border-2 border-[#16a249] bg-white relative",
            icon: <LogOut className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
        },
    ];

    const TotalTravellers = { Adults: 1, Childs: 1, Infants: 0 }
    const { Adults, Childs } = TotalTravellers;

    const { processedRows, seatMap } = useMemo(() => {
        const rows = seatData.map((row, idx) => {
            const seats = row.Seat_Details.map(seat => {
                const isAvailable = seat.SSR_Status === 1;
                const isBlocked = seat.SSR_Status === 2;
                const isBooked = seat.SSR_Status === 3;
                const isIsle = seat.SSR_Status === 0;
                const isExtraLegroom = seat.SSR_TypeName.includes("XL");
                const isExitRow = seat.SSR_TypeName.includes("EXIT");
                const seatLetter = seat.SSR_TypeName.match(/[A-Z]+/i)?.[0] || seat.SSR_TypeName;
                return {
                    number: seat.SSR_TypeName,
                    letter: seatLetter,
                    price: seat.Total_Amount,
                    currency: seat.Currency_Code,
                    isAvailable,
                    isBooked,
                    isBlocked,
                    isIsle,
                    rowNumber: idx + 1,
                    classType: idx < 3 ? 'Premium' : idx < 13 ? 'Standard' : 'Economy',
                    isExtraLegroom,
                    isExitRow,
                    SSRType: seat.SSR_Type
                };
            });
            return { rowNumber: idx + 1, seats };
        });

        const seatLookup = Object.fromEntries(
            rows.flatMap(row => row.seats.map(seat => [seat.number, seat]))
        );

        return { processedRows: rows, seatMap: seatLookup };
    }, [seatData]);

    const handleSeatClick = (seat) => {
        if (!seat.isAvailable) return;

        const newSelectedSeats = new Set(selectedSeats);
        const totalTravellers = Adults + Childs;

        if (totalTravellers === 1) {
            // Only one traveller: always replace previous selection
            newSelectedSeats.clear();
            newSelectedSeats.add(seat.number);
        } else {
            // Multiple travellers: toggle selection but limit to totalTravellers
            if (newSelectedSeats.has(seat.number)) {
                newSelectedSeats.delete(seat.number);
            } else {
                if (newSelectedSeats.size < totalTravellers) {
                    newSelectedSeats.add(seat.number);
                }
                // else do nothing if maximum seats already selected
            }
        }

        setSelectedSeats(newSelectedSeats);
    };

    const totalAmount = useMemo(
        () =>
            Array.from(selectedSeats).reduce(
                (total, seatNumber) => total + (seatMap[seatNumber]?.price || 0),
                0
            ),
        [selectedSeats, seatMap]
    );

    const getSeatColor = (seat) => {
        if (selectedSeats.has(seat.number))
            return 'bg-indigo-600 border-indigo-600 text-white shadow-md';
        if (seat.isBooked)
            return 'bg-[#ef434333] border-2 border-[#ef434366] text-white'; // stronger red for booked
        if (seat.isBlocked)
            return 'bg-gray-300 text-gray-500';
        if (seat.isExtraLegroom)
            return 'border-2 border-[#16a249] bg-white relative';
        if (seat.isExitRow)
            return 'border-2 border-[#16a249] bg-white relative';
        if (seat.isAvailable)
            return 'border-2 border-[#16a249] bg-white';
        if (seat.isIsle)
            return 'bg-gray-50';
        return 'bg-transparent';
    };

    const renderSeatTooltip = (seat) => {
        // Normalize SSR_Type into an array of type names
        const seatSSRTypes = Array.isArray(seat.SSRType)
            ? seat.SSRType.map(t => SSRTypes[t])
            : [SSRTypes[seat.SSRType]];

        return (
            <div className="p-3 bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 rounded-xl text-sm w-48 pointer-events-none transform transition-all duration-200 animate-fade-in">
                <div><span className="font-semibold">Seat:</span> {seat.number}</div>
                <div>{seat.classType}</div>
                <div><span className="font-semibold">₹{seat.price || 'Free'}</span> </div>
                <div>
                    {seatSSRTypes.join(', ')}
                </div>
                <div>
                    <span className="font-semibold">{seat.isAvailable ? 'Available' : seat.isBooked ? 'Booked' : seat.isBlocked ? 'Blocked' : 'Aisle'}</span>
                </div>

            </div>
        );
    };

    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className="min-h-screen">
            <div className='bg-[#f1f0f29e] shadow-sm'>
                <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">

                    {/* Flight Info */}
                    <div className="flex items-center gap-4">
                        <div>
                            <img
                                src={AirlineLogo}
                                className="w-12 h-12"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">AI 304</h2>
                            <p className="text-sm text-gray-500">Airbus A320</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {/* From */}
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-500">From</p>
                            <p className="text-lg font-semibold text-gray-800">DEL</p>
                            <p className="text-xs text-gray-400">14:30</p>
                        </div>

                        {/* Divider */}
                        <div className="border-black border-1 w-10 mr-2 ml-6"></div>

                        {/* Duration */}
                        <div className="text-center text-gray-400">
                            <p className="text-sm">2h 15m</p>
                        </div>

                        {/* Divider */}
                        <div className="border-black border-1 w-10 ml-2 mr-6"></div>

                        {/* To */}
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-500">To</p>
                            <p className="text-lg font-semibold text-gray-800">BOM</p>
                            <p className="text-xs text-gray-400">16:45</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-start my-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">Select Your Seat</h1>
                    <p className="text-gray-600 text-md">Choose your preferred seats for a more comfortable journey</p>
                </div>


                <div className="grid lg:grid-cols-10 gap-10">
                    {/* Seat Map */}
                    <div className='lg:col-span-7 flex flex-col'>

                        <div className="bg-[#f1f0f29e] shadow-sm rounded-2xl border border-gray-200 py-4 px-4 mb-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Legend</h3>
                            <div className="flex space-x-5">
                                {legendItems.map((item) => (
                                    <div key={item.label} className="flex items-center">
                                        <div className={`w-7 h-7 mr-2 rounded-md flex items-center justify-center relative ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-sm text-gray-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#f1f0f29e] shadow-sm rounded-2xl py-8 px-20 border border-gray-200">

                            {/* Top Header Row */}
                            <div className="grid grid-cols-10 justify-items-center mb-6">
                                <div></div>
                                <div></div>
                                {seatLetters.map((letter, idx) => (
                                    <React.Fragment key={letter}>
                                        {idx === 3 && <div className="w-8"></div>}
                                        <div className="text-gray-700 font-bold text-lg">{letter}</div>
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Seat Rows */}
                            <div className="space-y-2">
                                {processedRows.map(row => {
                                    const rowSeatsMap = Object.fromEntries(row.seats.map(seat => [seat.letter, seat]));

                                    return (
                                        <div
                                            key={row.rowNumber}
                                            className="grid grid-cols-10 justify-items-center items-center"
                                        >
                                            <div></div>

                                            {/* Row Number */}
                                            <div className="text-gray-700 font-semibold text-lg text-start">
                                                <div>{row.rowNumber}</div>
                                            </div>

                                            {/* Seats A–C */}
                                            {['A', 'B', 'C'].map(letter => {
                                                const seat = rowSeatsMap[letter];
                                                return seat ? (
                                                    <div key={seat.number} className="relative flex flex-col items-center">
                                                        {selectedSeats.has(seat.number) ? (
                                                            <div className="p-[3px] bg-white border-2 border-indigo-500 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out">
                                                                <button
                                                                    onClick={() => handleSeatClick(seat)}
                                                                    disabled={!seat.isAvailable}
                                                                    onMouseEnter={() => setHoveredSeat(seat.number)}
                                                                    onMouseLeave={() => setHoveredSeat(null)}
                                                                    onTouchStart={() => setHoveredSeat(seat.number)}
                                                                    onTouchEnd={() => setHoveredSeat(null)}
                                                                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out transform scale-105 shadow-md relative ${getSeatColor(seat)}`}
                                                                >
                                                                    <span className="font-semibold text-base">{`${seat.rowNumber}${seat.letter}`}</span>
                                                                    {seat.isExtraLegroom && (
                                                                        <Plus className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                    )}
                                                                    {seat.isExitRow && (
                                                                        <LogOut className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSeatClick(seat)}
                                                                disabled={!seat.isAvailable}
                                                                onMouseEnter={() => setHoveredSeat(seat.number)}
                                                                onMouseLeave={() => setHoveredSeat(null)}
                                                                onTouchStart={() => setHoveredSeat(seat.number)}
                                                                onTouchEnd={() => setHoveredSeat(null)}
                                                                className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-110 shadow-md relative ${getSeatColor(seat)}`}
                                                            >
                                                                <span className="font-semibold text-base">{`${seat.rowNumber}${seat.letter}`}</span>
                                                                {seat.isExtraLegroom && (
                                                                    <Plus className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                )}
                                                                {seat.isExitRow && (
                                                                    <LogOut className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                )}
                                                            </button>
                                                        )}

                                                        {hoveredSeat === seat.number && (
                                                            <div
                                                                className="absolute -top-32 left-1/2 -translate-x-1/2 z-50 transform animate-fadeIn animate-scaleIn"
                                                            >
                                                                {renderSeatTooltip(seat)}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div key={letter} className="w-16 h-16 bg-gray-50"></div>
                                                );
                                            })}


                                            {/* Aisle Divider */}
                                            <div className="flex items-center justify-between w-8">
                                                <div className="h-10 w-1 border-gray-400 border-l-2 border-dashed opacity-40"></div>
                                                <div className="h-10 w-1 border-gray-400 border-r-2 border-dashed opacity-40"></div>
                                            </div>

                                            {/* Seats D–F */}
                                            {['D', 'E', 'F'].map(letter => {
                                                const seat = rowSeatsMap[letter];
                                                return seat ? (
                                                    <div key={seat.number} className="relative flex flex-col items-center">
                                                        {selectedSeats.has(seat.number) ? (
                                                            <div className="p-[3px] bg-white border-2 border-indigo-500 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out">
                                                                <button
                                                                    onClick={() => handleSeatClick(seat)}
                                                                    disabled={!seat.isAvailable}
                                                                    onMouseEnter={() => setHoveredSeat(seat.number)}
                                                                    onMouseLeave={() => setHoveredSeat(null)}
                                                                    onTouchStart={() => setHoveredSeat(seat.number)}
                                                                    onTouchEnd={() => setHoveredSeat(null)}
                                                                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out transform scale-105 shadow-md relative ${getSeatColor(seat)}`}
                                                                >
                                                                    <span className="font-semibold text-base">{`${seat.rowNumber}${seat.letter}`}</span>
                                                                    {seat.isExtraLegroom && (
                                                                        <Plus className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                    )}
                                                                    {seat.isExitRow && (
                                                                        <LogOut className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSeatClick(seat)}
                                                                disabled={!seat.isAvailable}
                                                                onMouseEnter={() => setHoveredSeat(seat.number)}
                                                                onMouseLeave={() => setHoveredSeat(null)}
                                                                onTouchStart={() => setHoveredSeat(seat.number)}
                                                                onTouchEnd={() => setHoveredSeat(null)}
                                                                className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-110 shadow-md relative ${getSeatColor(seat)}`}
                                                            >
                                                                <span className="font-semibold text-base">{`${seat.rowNumber}${seat.letter}`}</span>
                                                                {seat.isExtraLegroom && (
                                                                    <Plus className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                )}
                                                                {seat.isExitRow && (
                                                                    <LogOut className="absolute -top-1 -right-1 w-3 h-3 text-white bg-indigo-800 rounded-full p-[1px]" />
                                                                )}
                                                            </button>
                                                        )}

                                                        {hoveredSeat === seat.number && (
                                                            <div
                                                                className="absolute -top-32 left-1/2 -translate-x-1/2 z-50 transform animate-fadeIn animate-scaleIn"
                                                            >
                                                                {renderSeatTooltip(seat)}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div key={letter} className="w-16 h-16 bg-gray-50"></div>
                                                );
                                            })}

                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Summary Panel */}
                    <div className="lg:col-span-3 bg-[#f1f0f29e] shadow-sm rounded-2xl p-6 sticky top-6 border border-gray-200 max-h-[40vh] overflow-y-auto">

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Selection</h2>

                        {selectedSeats.size === 0 ? (
                            <p className="text-gray-500 text-center py-10 text-lg">No seats selected yet</p>
                        ) : (
                            <div>
                                <div className="space-y-3 mb-4">
                                    {Array.from(selectedSeats).map(seatNumber => {
                                        const seat = seatMap[seatNumber];
                                        return (
                                            <div key={seatNumber} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                                                <span className="font-medium text-gray-800">{seatNumber}</span>
                                                <span className="text-gray-700 font-semibold">₹{seat?.price || 0}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-gray-300 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Total Seats:</span>
                                        <span className="font-semibold text-gray-800">{selectedSeats.size}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-gray-800">Total Amount:</span>
                                        <span className="text-gray-900">₹{totalAmount}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg text-lg">
                                    Continue to Payment
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightSeatMap;
