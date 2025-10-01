import React from "react";

export default function FlightPriceDetailsModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center  justify-center z-9999 secondary-font"
            onClick={onClose}
            style={{
                animation: "fadeIn 0.3s ease-out forwards"
            }}
        >
            <div
                className=" rounded-2xl  bg-white shadow-xl w-[90%] max-w-6xl relative p-6 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "scaleIn 0.3s ease-out forwards" }}>
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">
                        Flights Details and Fare Options Available for you !
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        New Delhi → Mumbai &nbsp; | &nbsp; Vistara &nbsp; | &nbsp; Wed, 24 Sep 25
                        &nbsp; | &nbsp; Departure at 17:00 – Arrival at 19:25
                    </p>
                </div>

                {/* Fare Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="border rounded-xl shadow-sm p-6 relative flex flex-col ">
                        <div>
                            <h3 className="text-xl font-bold text-red-600 mb-1">
                                ₹ 5,330 <span className="text-sm text-gray-500">Per adult</span>
                            </h3>
                            <p className="text-sm text-gray-400 line-through mb-2">₹ 5,530</p>
                            <p className="text-sm font-medium mb-4">FARE BY SKYVOO</p>

                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong>Baggage</strong>
                                    <br /> 7 kgs Cabin Baggage <br /> 15 kgs Check-in Baggage
                                </p>
                                <p>
                                    <strong>Flexibility</strong>
                                    <br /> Cancellation fee start at ₹ 5,330 (up to 24 hours before departure)
                                    <br /> Date Change fee start at ₹ 5,330 up to 3hrs before departure
                                </p>
                                <p>
                                    <strong>Seats, Meals & More</strong>
                                    <br /> Chargeable Seats <br /> Chargeable Meals
                                </p>
                                <p className="text-red-600 text-sm mt-3 font-semibold">
                                    BENEFITS WORTH ₹ 5,330 INCLUDED
                                </p>
                                <p className="text-xs text-gray-600">Travel Insurance for 1 days</p>
                            </div>
                        </div>
                        <div className="flex mt-6 justify-between text-sm font-medium gap-4">
                            <button
                                className="cursor-pointer py-1 px-3 border-2 border-[#78080B] text-[#78080B] rounded-full 
               hover:bg-[#78080B] hover:text-white transition duration-200 shadow-sm"
                                style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                            >
                                LOCK PRICE
                            </button>

                            <button
                                className="cursor-pointer py-1 px-3 bg-[#78080B] text-white rounded-full border-2 border-transparent
               hover:bg-white hover:text-[#78080B] hover:border-[#78080B] transition duration-200 shadow-sm"
                            >
                                BOOK NOW
                            </button>
                        </div>

                    </div>

                    {/* Card 2 */}
                    <div className="border rounded-xl shadow-sm p-6 relative">
                        <h3 className="text-xl font-bold text-red-600 mb-1">
                            ₹ 5,330 <span className="text-sm text-gray-500">Per adult</span>
                        </h3>
                        <p className="text-sm font-medium mb-4">FLEXI PLUS</p>

                        <div className="space-y-2 text-sm">
                            <p>
                                <strong>Baggage</strong>
                                <br /> 7 kgs Cabin Baggage <br /> 15 kgs Check-in Baggage
                            </p>
                            <p>
                                <strong>Flexibility</strong>
                                <br /> Lower Cancellation fee start at ₹ 5,330 (up to 24 hours before
                                departure)
                                <br /> Free Date Change fee start at ₹ 5,330 up to 3hrs before departure
                            </p>
                            <p>
                                <strong>Seats, Meals & More</strong>
                                <br /> Free Seats <br /> Complimentary Meals
                            </p>
                        </div>

                        <button className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition">
                            LOCK PRICE
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div className="border rounded-xl shadow-sm p-6 relative">
                        <h3 className="text-xl font-bold text-red-600 mb-1">
                            ₹ 5,330 <span className="text-sm text-gray-500">Per adult</span>
                        </h3>
                        <p className="text-sm font-medium mb-4">SUPER 6E</p>

                        <div className="space-y-2 text-sm">
                            <p>
                                <strong>Baggage</strong>
                                <br /> 7 kgs Cabin Baggage <br /> 15 kgs Check-in Baggage
                            </p>
                            <p>
                                <strong>Flexibility</strong>
                                <br /> Lower Cancellation fee start at ₹ 5,330 (up to 24 hours before
                                departure)
                                <br /> Free Date Change fee start at ₹ 5,330 up to 3hrs before departure
                            </p>
                            <p>
                                <strong>Seats, Meals & More</strong>
                                <br /> Free Seats <br /> Complimentary Meals
                            </p>
                        </div>

                        <button className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }
        `}
            </style>
        </div>
    );
}
