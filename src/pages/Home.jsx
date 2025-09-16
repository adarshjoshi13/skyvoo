import React, { useState } from 'react';

import Header from '../components/Header'
// import PromotionalCard from '../components/PromotionalCard';
import BookingForm from '../components/BookingForm';
import SignInModal from '../components/SignInModal'
import StickerPeel from '../components/StickerPeel'
import logo from '../assets/imgs/offer.jpg'


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {isModalOpen && (
        <SignInModal onClose={() => setIsModalOpen(false)} />
      )}
      <div>
        <div className="min-h-[80vh] bg-white bg-cover bg-center relative">
          <img className="absolute right-0 -z-index-999" src="./src/assets/imgs/try.png" alt="" />

          <Header onOpen={() => setIsModalOpen(true)} />

          <main className="px-2 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="primary-font text-5xl font-bold text-black mb-4  font-medium" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>TRAVEL SMARTER WITH DEALS YOU'LL ADORE</h1>
                <p
                  className="secondary-font text-lg font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #520000 0%, #FF0000 100%)",
                  }}
                >
                  Revolutionizing your financial journey with seamless, secure, and personalized experiences
                </p>
              </div>

              <div style={{
                position: 'fixed',
                top: 300,
                left: 400
              }}>
                <StickerPeel
                  imageSrc={logo}
                  width={200}
                  rotate={0}
                  peelBackHoverPct={20}
                  peelBackActivePct={90}
                  shadowIntensity={0.6}
                  lightingIntensity={0.1}
                  peelDirection={90}
                  className="wide-padding"
                />

              </div>

            </div>
          </main>
        </div>

        {/* Booking Section with its own background */}
        <div
          className="py-16 bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/imgs/bookingbg.png')" }}
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="my-8 text-start">
              <h4 className="secondary-font text-4xl font-bold">Start Booking Your Flight Now</h4>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </>
  );
}