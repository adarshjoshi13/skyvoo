import React, { useState } from 'react';
import Header from '../components/Header';
import SignInModal from '../components/SignInModal';
import GrayFadedBg from '@/assets/imgs/grayfadedbg.png'
import AirlineLogo from '@/assets/imgs/airlinelogo.png'
import CouponBg from '@/assets/imgs/couponbg.png';

import { Plane, Luggage, AlertCircle, Gift } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFare, setSelectedFare] = useState('your-selection');

  return (
    <>
      {isModalOpen && <SignInModal onClose={() => setIsModalOpen(false)} />}

      <div>
        {/* Hero Section */}
        <div className="relative bg-white bg-cover bg-center">
          <img
            className="absolute right-0 z-10 max-w-full h-auto object-cover"
            src={GrayFadedBg}
            alt="gray faded bg"
          />

          <Header onOpen={() => setIsModalOpen(true)} />

        </div>

        {/* Booking Section */}
        <div className="min-h-screen bg-slate-50 secondary-font">
          {/* Header */}
          <div className="relative z-20 bg-slate-900  text-white py-6 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">Complete your booking</h1>
              <div className="flex gap-4 text-sm">
                <span className="text-slate-300">Flights Summary</span>
                <span className="text-slate-300">Travel Insurance</span>
                <span className="text-slate-300">Traveller Details</span>
                <span className="text-slate-300">Seats & Meals</span>
                <span className="text-slate-300">Add-ons</span>
              </div>
            </div>
          </div>

          <div className="relative z-20 pb-5 sm:pb-2 bg-cover bg-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Airport Alert */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg py-1 px-2 flex items-start gap-3">
                    <Plane className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      Your flight departs from <strong>Hindon Airport</strong>, which is <strong>32 km away from Indira Gandhi International Airport</strong>.
                    </p>
                  </div>

                  {/* Flight Details Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-4" >
                      <div className='p-2' style={{ boxShadow: '0 1px 4px 0 rgba(0, 0, 0, .21)' }}>
                        {/* Route Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-1 h-20 bg-blue-500 rounded"></div>
                            <div>
                              <h2 className="text-2xl font-bold text-slate-900">Ghaziabad → Bengaluru</h2>
                              <p className="text-sm text-slate-600 mt-1"><span className='bg-yellow-50 border border-yellow-200 rounded-lg py-1 px-2'>Thursday, Oct 9</span> Non Stop · 2h 50m</p>
                            </div>
                          </div>
                          <span className="bg-[#78080B] text-white text-xs font-semibold px-3 py-1 rounded">
                            CANCELLATION FEES APPLY
                          </span>
                        </div>

                        <button className="text-blue-600 text-sm font-medium mb-4">View Fare Rules</button>

                        {/* Airline Info */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <img src={AirlineLogo} alt="airline logo" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Air India Express</span>
                                <span className="text-slate-600">IX 1971</span>
                                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">Boeing 737</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Economy &gt;</span>
                            <span className="text-blue-600 font-semibold text-sm">Xpress Value</span>
                          </div>
                        </div>

                        {/* Flight Times */}
                        <div className="space-y-4 p-4 bg-[#f4f4f4]">
                          <div className="flex items-start gap-4">
                            <div className="text-2xl font-bold">08:50</div>
                            <div>
                              <div className="font-semibold">Ghaziabad</div>
                              <div className="text-sm text-slate-600">Hindon Airport</div>
                            </div>
                          </div>

                          <div className="ml-7 border-l-2 border-dashed border-slate-300 pl-4 py-2">
                            <div className="text-sm text-slate-600">2h 50m</div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="text-2xl font-bold">11:40</div>
                            <div>
                              <div className="font-semibold">Bengaluru</div>
                              <div className="text-sm text-slate-600">Bengaluru International Airport, Terminal T2</div>
                            </div>
                          </div>
                        </div>
                        <div className='bg-[#f4f4f4] flex justify-center'>
                          <div className='border-t border-slate-200 w-[95%]'></div>
                        </div>
                        {/* Baggage Info */}
                        <div className="flex items-center gap-6  p-4 bg-[#f4f4f4]">
                          <div className="flex items-center gap-2">
                            <Luggage className="w-5 h-5 text-slate-600" />
                            <span className="text-sm"><strong>Cabin Baggage:</strong> 7 Kgs / Adult</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Luggage className="w-5 h-5 text-slate-600" />
                            <span className="text-sm"><strong>Check-In Baggage:</strong> 15 Kgs / Adult</span>
                          </div>
                        </div>

                        {/* Extra Baggage Notice */}
                        <div className="mt-3 bg-[#f4f4f4] border border-blue-200 p-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Luggage className="w-5 h-5 text-blue-600" />
                            <p className="text-sm text-slate-700">
                              <strong>3 KGs of extra baggage added on your trip for ₹ 2,100!</strong> Total check-in baggage is now 18 KGs.
                            </p>
                          </div>
                          <button className="text-blue-600 font-semibold text-sm whitespace-nowrap">CHANGE</button>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="border-t border-slate-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Cancellation & Date Change Policy</h3>
                        <button className="text-blue-600 text-sm font-medium">View Policy</button>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <img src={AirlineLogo} alt="airline logo" />
                        <div className="flex-1">
                          <div className="font-semibold mb-1">HDO-BLR</div>
                          <div className="text-sm text-slate-600 mb-3">Cancellation Penalty :</div>

                          {/* Timeline */}
                          <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-bold">₹ 4,650</span>
                              <span className="text-lg font-bold">₹ 6,849</span>
                            </div>
                            <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full mb-2"></div>
                            <div className="flex items-center justify-between text-sm">
                              <div>
                                <div className="font-semibold">Now</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">9 Oct</div>
                                <div className="text-slate-600">06:50</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">9 Oct</div>
                                <div className="text-slate-600">08:50</div>
                              </div>
                            </div>
                            <div className="text-xs text-slate-600 mt-2">Cancel Between (IST) :</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upgrade Fare Options */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold mb-6">Get more benefits by upgrading your fare</h3>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Your Selection */}
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'your-selection' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                          }`}
                        onClick={() => setSelectedFare('your-selection')}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFare === 'your-selection' ? 'border-blue-500' : 'border-slate-300'
                            }`}>
                            {selectedFare === 'your-selection' && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">Your Selection</div>
                            <div className="text-xl font-bold">₹ 6,849</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-orange-600">
                            <span className="text-lg">⚠️</span>
                            <span>Flight delay protection benefit not included</span>
                          </div>
                        </div>
                      </div>

                      {/* MMT Regular */}
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'mmt-regular' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                          }`}
                        onClick={() => setSelectedFare('mmt-regular')}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFare === 'mmt-regular' ? 'border-blue-500' : 'border-slate-300'
                            }`}>
                            {selectedFare === 'mmt-regular' && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">MMT Regular</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-400 line-through">₹ 7,423</span>
                              <span className="text-xl font-bold">₹ 7,298</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-green-600">
                            <span className="text-lg">✓</span>
                            <div>
                              <strong>Flight Delay Protection</strong> included
                              <AlertCircle className="inline-block w-3 h-3 ml-1" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-orange-600">
                            <span className="text-lg">⚠️</span>
                            <span>Date Change fee starts at ₹ 3,000 up to</span>
                          </div>
                        </div>
                      </div>

                      {/* MMT Premium */}
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'mmt-premium' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                          }`}
                        onClick={() => setSelectedFare('mmt-premium')}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFare === 'mmt-premium' ? 'border-blue-500' : 'border-slate-300'
                            }`}>
                            {selectedFare === 'mmt-premium' && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">MMT Premium</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-400 line-through">₹ 7,522</span>
                              <span className="text-xl font-bold">₹ 7,397</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-green-600">
                            <span className="text-lg">✓</span>
                            <div>
                              <strong>Flight Delay Protection</strong> included
                              <AlertCircle className="inline-block w-3 h-3 ml-1" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-green-600">
                            <span className="text-lg">✓</span>
                            <span><strong>Free date change</strong> upto 2 hours before</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Fare Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-6">
                    <h2 className="text-xl font-bold mb-4">Fare Summary</h2>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Base Fare</span>
                        </div>
                        <span className="font-semibold">₹ 5,936</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Taxes and Surcharges</span>
                        </div>
                        <span className="font-semibold">₹ 913</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Other Services</span>
                        </div>
                        <span className="font-semibold">₹ 2,100</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">Total Amount</span>
                        <span className="text-2xl font-bold">₹ 8,949</span>
                      </div>
                    </div>

                    {/* Coupons Section */}
                    <div className="rounded-lg p-4 mb-4 bg-cover"
                      style={{ backgroundImage: `url(${CouponBg})` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Coupons and Offers</span>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button className="w-full text-blue-600 font-semibold text-sm py-2">
                      VIEW ALL COUPONS ˅
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
