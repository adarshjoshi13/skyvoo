import React from 'react'
import { Plus, LogOut } from 'lucide-react';

function SeatButton({ seat, onClick, onHover, onLeave, getSeatColor }) {
    return (
        <button
            onClick={onClick}
            disabled={!seat.isAvailable}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onTouchStart={onHover}
            onTouchEnd={onLeave}
            className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-110 shadow-md relative ${getSeatColor(seat)}`}
        >
            <span className="font-semibold text-base">{`${seat.rowNumber}${seat.letter}`}</span>
            {seat.isExtraLegroom && (
                <Plus className="absolute -top-1 -right-1 w-5 h-5 text-white bg-indigo-800 rounded-full p-[1px]" />
            )}
            {seat.isExitRow && (
                <LogOut className="absolute -top-1 -right-1 w-5 h-5 text-white bg-indigo-800 rounded-full p-[1px]" />
            )}
        </button>
    )
}

export default SeatButton