const FlightDetails = ({ flight }) => {
    return (
        <div className="bg-white border-t px-6 py-4">
            <div className="flex justify-between mb-3">
                <h3 className="font-semibold">
                    {flight.departure.city} to {flight.arrival.city}
                </h3>
                <span className="text-gray-500">{flight.departure_info}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
                <div>
                    <div className="font-bold">{flight.departure.time}</div>
                    <div>{flight.departure.city}</div>
                </div>
                <div className="text-center">
                    <div>{flight.duration}</div>
                    <div>{flight.stops}</div>
                </div>
                <div>
                    <div className="font-bold">{flight.arrival.time}</div>
                    <div>{flight.arrival.city}</div>
                </div>
            </div>

            <div className="flex justify-between text-sm">
                <div>Baggage: <strong>Adult</strong></div>
                <div>Check-in: <strong>15 kg</strong></div>
                <div>Cabin: <strong>7 kg</strong></div>
            </div>
        </div>
    );
}

export default FlightDetails;