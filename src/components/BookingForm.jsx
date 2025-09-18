import React, { useState } from 'react';
import { CirclePlus, Calendar } from 'lucide-react';
import { Field, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

function BookingForm() {
    const [tripType, setTripType] = useState('oneWay');
    const [fareType, setFareType] = useState('regular');
    const [classType, setClassType] = useState('Coach');
    const [isSwapping, setIsSwapping] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleSwap = () => {
        setRotation(prevRotation => prevRotation + 180);
        setIsSwapping(!isSwapping);
    };

    return (
        <div
            className="relative grid grid-cols-12 gap-8 bg-no-repeat bg-cover bg-center rounded-[45px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{ backgroundImage: "url('/src/assets/imgs/bookingForm.png')" }}
        >
            <img
                className="absolute -right-2 top-1/2 -translate-y-1/2 h-[77%] hidden lg:block"
                src="./src/assets/imgs/ripSide.png"
                alt="ribbon side"
            />

            <div className="col-span-12 p-6 sm:p-8 lg:p-10">
                {/* Tab Navigation */}
                <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 sm:space-x-3 mb-4 text-black text-lg font-semibold">
                    <button className="secondary-font flex items-center space-x-1 bg-[#D9D9D9] rounded-md px-3 sm:px-4 py-1 cursor-pointer text-black border-2 border-black">
                        <img src="./src/assets/imgs/vectors/Plane.svg" alt="plane" className="w-5 h-5" />
                        <span className='ml-1'>Flights</span>
                    </button>

                    <button className="secondary-font flex items-center space-x-1 rounded-md px-3 sm:px-4 py-1 cursor-pointer border-2 border-transparent hover:bg-[#D9D9D9] hover:border-black hover:text-black">
                        <img src="./src/assets/imgs/vectors/Bed.svg" alt="bed" className="w-6 h-6 sm:w-7 sm:h-7" />
                        <span className='ml-1'>Hotels</span>
                    </button>

                    <button className="secondary-font flex items-center space-x-1 rounded-md px-3 sm:px-4 py-1 cursor-pointer border-2 border-transparent hover:bg-[#D9D9D9] hover:border-black hover:text-black">
                        <img src="./src/assets/imgs/vectors/Car.svg" alt="car" className="w-6 h-6 sm:w-7 sm:h-7" />
                        <span className='ml-1'>Cabs</span>
                    </button>

                    <button className="secondary-font flex items-center text-black font-medium cursor-pointer px-3 sm:px-4 py-2 border-2 border-transparent hover:text-gray-500 ml-auto">
                        <img src="./src/assets/imgs/vectors/Mic.svg" alt="mic" className="w-5 h-5" />
                        <span className='ml-1'>Customer Support</span>
                    </button>
                </div>

                <div className='mb-3 grid grid-cols-12 gap-8 '> <div className="col-span-8 flex items-center relative" style={{ right: "40px" }} > <div className=" h-4 relative ribbon animate-ribbon mr-2"></div> <img src="./src/assets/imgs/vectors/FlyingPlane.svg" alt="" /> </div> </div>

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

                    <Field>
                        <div className="relative secondary-font font-medium w-full sm:w-auto">
                            <Select
                                value={classType}
                                onChange={setClassType}
                                className={clsx(
                                    'w-full sm:w-auto rounded-lg px-4 py-1.5 text-black appearance-none',
                                    'focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent'
                                )}
                            >
                                <option className="py-2 px-4">Coach</option>
                                <option className="py-2 px-4 text-gray-600">Business</option>
                                <option className="py-2 px-4 text-gray-600">First Class</option>
                            </Select>
                            <ChevronDownIcon
                                className="pointer-events-none font-extrabold text-black absolute top-2 right-3 size-5 fill-gray-600 filter contrast-125"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                </div>

                {/* Flight Search Form */}
                <div className="w-full max-w-6xl mx-auto p-2 sm:p-4">
                    <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end secondary-font font-semibold">

                        {/* From */}
                        <div className="col-span-12 sm:col-span-2">
                            <label className="block text-lg text-gray-700">From</label>
                            <input
                                type="text"
                                placeholder="Origin"
                                className="w-full text-xl border-b text-[#525252] border-gray-400 focus:outline-none placeholder-gray-400"
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
                            <input
                                type="text"
                                placeholder="Destination"
                                className="w-full text-xl text-[#525252] border-b border-gray-400 focus:outline-none placeholder-gray-400"
                            />
                        </div>

                        {/* Depart & Return */}
                        {['Depart', 'Return'].map((label, idx) => (
                            <div key={label} className="col-span-12 sm:col-span-2 flex items-center gap-3">
                                <div className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-lg text-gray-700 flex items-center gap-2">{label}</label>
                                    <input type="text" placeholder="Date" className="w-full text-xl text-[#525252] border-b border-gray-400 focus:outline-none placeholder-gray-400" />
                                </div>
                            </div>
                        ))}

                        {/* Traveler */}
                        <div className="col-span-12 sm:col-span-2 flex items-center gap-3">
                            <img src="./src/assets/imgs/vectors/Person.svg" alt="traveler" className="w-6 h-6" />
                            <div className="flex flex-col">
                                <label className="block text-lg text-gray-700 flex items-center gap-2">Traveler</label>
                                <input type="number" min="1" placeholder="1" className="w-16 text-xl border text-[#525252] border-gray-400 rounded-md text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none[appearance:textfield]" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="col-span-12 sm:col-span-1 flex justify-center">
                            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-xl transition flex items-center justify-center">
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
            </div>
        </div>
    );
}

export default BookingForm;
