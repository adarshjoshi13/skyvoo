const Header = ({ onOpen }) => {

    return (
        <header className="relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="./src/assets/imgs/logo.png"
                        className="h-10 w-auto md:h-40"
                        alt="SkyVoo Logo"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-4 text-black text-base font-medium">
                    <button className="secondary-font px-8 py-2 bg-black text-white cursor-pointer rounded-full hover:bg-black hover:text-white"> Home </button>
                    <button className="px-8 py-2 bg-[#D9D9D9] cursor-pointer rounded-full hover:bg-black hover:text-white"> Flights </button>
                    <button className="px-8 py-2 bg-[#D9D9D9] cursor-pointer rounded-full hover:bg-black hover:text-white"> Hotels </button>
                    <button className="px-8 py-2 bg-[#D9D9D9] cursor-pointer rounded-full hover:bg-black hover:text-white"> Bus </button>
                    <button className="px-8 py-2 bg-[#D9D9D9] cursor-pointer rounded-full hover:bg-black hover:text-white"> Cab </button>
                    <button className="px-8 py-2 bg-[#D9D9D9] cursor-pointer rounded-full hover:bg-black hover:text-white"> Customer Supports </button>
                </nav>

                <button className="secondary-font px-8 py-2 font-medium bg-black text-base text-white rounded-full hover:bg-gray-800 cursor-pointer" onClick={onOpen}>
                    Log In
                </button>
            </div>
        </header >
    );
};

export default Header;