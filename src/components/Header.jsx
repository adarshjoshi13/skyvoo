import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ onOpen }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: 'Home' },
        { label: 'Flights' },
        { label: 'Hotels' },
        { label: 'Bus' },
        { label: 'Cab' },
        { label: 'Customer Supports' },
    ];

    return (
        <header className="relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between sm:px-6 py-10">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="./src/assets/imgs/logo.png"
                        className="h-10 sm:h-12 md:h-16 w-auto"
                        alt="SkyVoo Logo"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-4 lg:space-x-4 text-black text-base font-medium">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            className="px-4 py-2 sm:px-6 rounded-full bg-[#D9D9D9] hover:bg-black hover:text-white transition"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Log In Button (desktop) */}
                <button
                    onClick={onOpen}
                    className="hidden md:inline-block secondary-font px-4 sm:px-6 py-2 font-medium bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                    Log In
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 text-black"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className="block w-full text-left px-4 py-2 rounded-md bg-[#F5F5F5] hover:bg-black hover:text-white transition"
                            >
                                {item.label}
                            </button>
                        ))}

                        <button
                            onClick={onOpen}
                            className="block w-full text-left px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
