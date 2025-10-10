import { createContext, useContext, useState } from "react";

const FlightFilterContext = createContext();

export const FlightFilterProvider = ({ children }) => {
    const [selectedStops, setSelectedStops] = useState([]);
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedAircraftSizes, setSelectedAircraftSizes] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([18000, Infinity]);

    return (
        <FlightFilterContext.Provider value={{
            selectedStops,
            setSelectedStops,
            selectedAirlines,
            setSelectedAirlines,
            selectedAircraftSizes,
            setSelectedAircraftSizes,
            selectedPriceRange,
            setSelectedPriceRange
        }}>
            {children}
        </FlightFilterContext.Provider>
    );
};

export const useFlightFilters = () => useContext(FlightFilterContext);
