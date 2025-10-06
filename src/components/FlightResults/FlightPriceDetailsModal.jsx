import React from "react";
import AirlineLogo from '@/assets/imgs/airlinelogo.png'
import Tick from '@/assets/vectors/Tick.svg'
import Dash from '@/assets/vectors/Dash.svg'
import Insuarance from '@/assets/vectors/Insuarance.svg'

export default function FlightPriceDetailsModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-9999 bg-black/30 backdrop-blur-sm secondary-font"
            onClick={onClose}
            style={{
                animation: "fadeIn 0.3s ease-out forwards"
            }}
        >
            <div
                className=" rounded-2xl bg-white shadow-xl w-[90%] max-w-6xl relative p-6"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "scaleIn 0.3s ease-out forwards" }}>
                {/* Close button */}
                <button
                    className="cursor-pointer absolute top-4 right-4 text-2xl font-black text-[#4A4141] hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="font-semibold text-2xl">
                        Flights Details and Fare Options Available for you !
                    </h2>
                    <div className="flex items-center gap-2 font-medium text-base mt-1">
                        <span>New Delhi - Mumbai</span>
                        <span>|</span>
                        <img src={AirlineLogo} alt="airline logo" className="h-8" />
                        <span>Vistara</span>
                        <span>|</span>
                        <span>Wed, 24 Sep 2025</span>
                        <span>|</span>
                        <span>Departure at 17:00 – Arrival at 19:25</span>
                    </div>

                </div>

                {/* Fare Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="border rounded-xl shadow-sm p-6 relative flex flex-col justify-between">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg line-through">₹ 5,530</span>
                                <span className="text-2xl font-bold text-[#78080B]">₹ 5,330 </span>
                                <span className="text-xl font-medium">Per adult</span>
                            </div>

                            <p className="text-sm font-medium mb-5">FARE BY <span className="font-bold text-[#78080B]">SKYVOO</span></p>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="font-bold text-base">Baggage</p>

                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>7 kgs Cabin Baggage</p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>15 kgs Check-in Baggage</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Flexibility</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Cancellation fee start at ₹ 5,330 (up to 24 hours before departure)
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Date Change fee start at ₹ 5,330 up to 3hrs before departure
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Seats, Meals & More</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Chargeable Seats
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Chargeable Seats
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-base mt-3 font-semibold">
                                        BENEFITS WORTH ₹ <span className="text-[#FF8000]"> 5,330 </span> INCLUDED
                                    </p>
                                </div>

                                <div className="flex items-center bg-[#D9D9D9] rounded-md text-black p-2"
                                    style={{ boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.10)' }}
                                >
                                    <img src={Insuarance} alt="insuarance" className="" />

                                    <p className="text-sm">Travel Insurance for 1 days</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-6 text-sm font-medium gap-4">


                            <div className="w-full flex justify-end">

                                <button
                                    className="cursor-pointer py-1 px-3 bg-[#78080B] text-white rounded-full border-2 border-transparent
               hover:bg-white hover:text-[#78080B] hover:border-[#78080B] transition duration-200 shadow-sm"
                                >
                                    BOOK NOW
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* Card 2 */}
                    <div className="border rounded-xl shadow-sm p-6 relative flex flex-col justify-between">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg line-through">₹ 5,530</span>
                                <span className="text-2xl font-bold text-[#78080B]">₹ 5,340 </span>
                                <span className="text-xl font-medium">Per adult</span>
                            </div>
                            <p className="text-sm font-medium mb-5">FARE BY <span className="font-bold text-[#78080B]">FLEXI PLUS</span></p>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="font-bold text-base">Baggage</p>

                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>7 kgs Cabin Baggage</p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>15 kgs Check-in Baggage</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Flexibility</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Lower Cancellation fee start at ₹ 5,330 (up to 24 hours before departure)
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Free Date Change fee start at ₹ 5,330 up to 3hrs before departure
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Seats, Meals & More</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Free Seats
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Chargeable Meals
                                        </p>
                                    </div>
                                </div>
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

                    {/* Card 3 */}
                    <div className="border rounded-xl shadow-sm p-6 relative flex flex-col justify-between">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg line-through">₹ 5,530</span>
                                <span className="text-2xl font-bold text-[#78080B]">₹ 5,350 </span>
                                <span className="text-xl font-medium">Per adult</span>
                            </div>
                            <p className="text-sm font-medium mb-5">FARE BY <span className="font-bold text-[#78080B]">SUPER 6E</span></p>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="font-bold text-base">Baggage</p>

                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>7 kgs Cabin Baggage</p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#78080B] text-white text-xs">
                                            <img src={Tick} alt="tick" />
                                        </div>
                                        <p>15 kgs Check-in Baggage</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Flexibility</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Lower Cancellation fee start at ₹ 5,330 (up to 24 hours before departure)
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Free Date Change fee start at ₹ 5,330 up to 3hrs before departure
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-base font-bold">Seats, Meals & More</p>

                                    {/* Item 1 */}
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Free Seats
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <img src={Dash} alt="dash" className="pt-2" />

                                        <p className="text-sm leading-loose">
                                            Chargeable Meals
                                        </p>
                                    </div>
                                </div>
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
