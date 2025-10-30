import React from 'react'

function test() {
    return (
        <div className="relative min-h-screen bg-gray-100">

            <img
                className="absolute right-0 z-1 max-w-full h-auto object-cover"
                src={GrayFadedBg}
                alt="gray faded background"
            />
            <FlightResultsHeader onOpen={() => setIsSignInModal(true)} />

            {showLoader && (
                <LoadingBar progress={progress} />
            )}

            {/* Main Content */}
            < div className="relative max-w-7xl mx-auto px-4 py-6 z-50" >
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <Filters />
                    {/* Results Area */}
                    <div className="flex-1">

                        {/* Sorting Options */}
                        <div className="filterglasseffect rounded-lg shadow-sm px-8 py-3 mb-4 secondary-font" style={{ overflow: 'visible', zIndex: 1 }}>
                            <div className="grid grid-cols-4 gap-4">
                                {sortOptions.map((option) => (
                                    <div key={option.key} className="relative">
                                        {/* Button */}
                                        <button
                                            className={`cursor-pointer px-4 py-2 rounded flex items-center justify-start w-full transition-all duration-200 ${selectedSorting === option.key || otherOptions.includes(selectedSorting)
                                                ? selectedSorting === option.key ||
                                                    (option.key === "OTHER" && otherOptions.includes(selectedSorting))
                                                    ? "bg-white"
                                                    : "bg-gray-100"
                                                : selectedSorting === option.key
                                                    ? "bg-white"
                                                    : "bg-gray-100"
                                                }`}
                                            style={{
                                                boxShadow: "3px 1px 4px 0px rgba(0, 0, 0, 0.25)",
                                            }}
                                            onClick={() => handleClick(option.key)}
                                        >
                                            <div className="mr-4 border border-solid border-[#A8A8A8] bg-[#D9D9D9] p-1 rounded-md">
                                                <img src={option.icon} alt={option.label} />
                                            </div>
                                            <div className="text-start">
                                                <div className="text-base font-medium">{option.label}</div>
                                                <div className="text-xs">{option.info}</div>
                                            </div>
                                        </button>

                                        {/* Underline animation */}
                                        <div
                                            className={`absolute bottom-0 left-0 h-[3px] bg-blue-500 rounded-full transition-all duration-1000 ease-out ${selectedSorting === option.key ||
                                                (option.key === "OTHER" && otherOptions.some((opt) => opt.value === selectedSorting))
                                                ? "w-full"
                                                : "w-0"
                                                }`}
                                        >
                                        </div>

                                        {/* Dropdown under OTHER */}
                                        {option.key === "OTHER" && showOtherMenu && (
                                            <div
                                                className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-48 animate-fadeIn"
                                                style={{ boxShadow: "0px 2px 6px rgba(0,0,0,0.15)" }}
                                            >
                                                <ul className="py-2">
                                                    {otherOptions.map((item) => (
                                                        <li
                                                            key={item}
                                                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleOtherSelect(item.value)}
                                                        >
                                                            {item.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-xl font-bold mt-4">
                                Flights from New Delhi to Mumbai
                            </h2>
                        </div>

                        {/* Flight Results */}
                        <div className="space-y-4">
                            {FlightDetails.length > 0 ? (
                                FlightDetails.slice(0, visibleCount).map((flight) => (
                                    <div key={flight.Flight_Id} className="rounded-2xl">
                                        <div
                                            className="py-4 relative bg-cover bg-center rounded-xl shadow-sm hover:shadow-md transition-shadow secondary-font"
                                            style={{
                                                backgroundImage: `url(${BookingFlightFormBg})`,
                                                boxShadow: "-3px 4px 20px -2px rgba(0, 0, 0, 0.25)",
                                            }}
                                        >
                                            <img
                                                className="absolute -right-[0.330rem] top-1/2 -translate-y-1/2 h-[90%] hidden lg:block"
                                                src={RipSide}
                                                alt="ribbon side"
                                            />

                                            {/* ---- Top Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="pl-5 pr-40 relative">
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(90deg, rgba(196,36,36,0.5) 0%, rgba(255,255,255,0.5) 100%)",
                                                            pointerEvents: "none",
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                    <div style={{ position: "relative", zIndex: 1 }}>
                                                        <p className="text-xs">Free Seat With VISA Card*</p>
                                                    </div>
                                                </div>

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
                                                        <div className="font-semibold">{flight.Segments[0].Airline_Name}</div>
                                                        <div className="text-sm font-medium">{flight.Segments[0].Flight_Number}</div>
                                                    </div>
                                                </div>

                                                {/* Departure */}
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold">
                                                        {formatTime(flight.Segments[0].Departure_DateTime)}
                                                    </div>
                                                    <div className="text-sm font-medium">
                                                        {flight.Segments[0].Origin_City}
                                                    </div>
                                                </div>

                                                {/* Duration */}
                                                <div className="flex flex-col items-center font-semibold">
                                                    <div className="text-sm font-medium mb-2">
                                                        {flight.Segments[0].Duration}
                                                    </div>
                                                    <div className="relative w-24 h-0.5 rounded-xl bg-[#920000]" />
                                                    <div className="text-sm font-medium mt-2">
                                                        {flight.Segments[0].Stop_Over === null ? 'Non Stop' : flight.Segments[0].Stop_Over}
                                                    </div>
                                                </div>

                                                {/* Arrival */}
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold">
                                                        {formatTime(flight.Segments[0].Arrival_DateTime)}
                                                    </div>
                                                    <div className="text-sm font-medium">
                                                        {flight.Segments[0].Destination_City}
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">
                                                        ₹ {flight.Fares[0].FareDetails[0].Total_Amount}
                                                    </div>
                                                    <div className="text-sm font-medium">Per Adult</div>
                                                </div>

                                                {/* Button */}
                                                <button
                                                    className="cursor-pointer bg-[#811919] hover:bg-[#741111] text-white px-4 py-1 rounded-full font-medium text-sm"
                                                    onClick={() => setIsFlightDetailsModalOpen(true)}
                                                >
                                                    VIEW PRICES
                                                </button>
                                            </div>

                                            {/* ---- Mid Bottom Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="ml-2 pr-3 flex items-center px-3 py-1 rounded hover:bg-red-200 transition-colors duration-300 ease-in-out">
                                                    {selectedFlights.some((f) => f.Flight_Id === flight.Flight_Id) ? (
                                                        <span className="flex items-center">
                                                            <span>Added</span>
                                                            <span
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleCompare(flight);
                                                                }}
                                                                className="ml-2 text-[#910E0E] font-bold w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                                                            >
                                                                <X size={12} strokeWidth={3} />
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="text-[#811919] font-semibold cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleCompare(flight);
                                                            }}
                                                        >
                                                            Add Compare More +
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="pr-25 relative rounded-full">
                                                    <div
                                                        className="rounded-l-full"
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(90deg, rgba(205 205 205) 0%, rgba(255,255,255,0.5) 100%)",
                                                            pointerEvents: "none",
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                    <div className="flex flex-row" style={{ position: "relative", zIndex: 1 }}>
                                                        <img src={Lock} alt="LOCK" className="px-2" />
                                                        <p className="text-xs">Lock this price starting from ₹ 413</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ---- Bottom Row ---- */}
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="pl-5 pr-55 relative">
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(90deg, rgba(205 205 205) 0%, rgba(255,255,255,0.5) 100%)",
                                                            pointerEvents: "none",
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                    <div
                                                        style={{ position: "relative", zIndex: 1 }}
                                                        className="flex flex-row items-center"
                                                    >
                                                        <div className="bg-[#720E0E] w-2 h-2 rounded-full mr-2"></div>
                                                        <p className="text-xs">FLAT ₹177 OFF using SkyvooSUPER</p>
                                                    </div>
                                                </div>

                                                <div className="pr-5 flex items-center px-3 py-1 rounded">
                                                    <button
                                                        className="text-[#811919] cursor-pointer hover:underline text-sm"
                                                        onClick={() => toggleFlightDetails(flight.Flight_Id)}
                                                    >
                                                        {selectedFlightId === flight.Flight_Id ? "Hide" : "View"} Flight Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ---- Slide-Down Details ---- */}
                                        <div
                                            className={`shadow-2xl mt-5 overflow-hidden transition-[max-height] duration-900 ease-in-out ${selectedFlightId === flight.Flight_Id ? "max-h-96" : "max-h-0"
                                                }`}
                                        >
                                            {selectedFlightId === flight.Flight_Id && <ViewFlightDetails flight={flight} />}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 mt-10">
                                    No flights match your filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default test