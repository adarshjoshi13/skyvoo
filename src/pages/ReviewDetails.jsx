import React, { useState } from 'react';
import Header from '../components/Header';
import SignInModal from '../components/SignInModal';
import FareRulesModal from '../components/FareRulesModal';
import TripBenefitsModal from '../components/TripBenefitsModal';
import GrayFadedBg from '@/assets/imgs/grayfadedbg.png'
import AirlineLogo from '@/assets/imgs/airlinelogo.png'
import CouponBg from '@/assets/imgs/couponbg.png';
import Dash from '@/assets/vectors/Dash.svg'
import { Plane, Luggage, AlertCircle, ShieldCheck, CirclePlus, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFareModalOpen, setIsFareModalOpen] = useState(false);
  const [isTripBenefitsModal, setIsTripBenefitsModal] = useState(false);
  const [selectedFare, setSelectedFare] = useState('your-selection');
  const [isTripSecure, setIsTripSecure] = useState(false);


  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <>
      {isModalOpen && <SignInModal onClose={() => setIsModalOpen(false)} />}
      {isFareModalOpen && <FareRulesModal onClose={() => setIsFareModalOpen(false)} />}
      {isTripBenefitsModal && <TripBenefitsModal onClose={() => setIsTripBenefitsModal(false)} />}

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
          <div className="z-999 bg-slate-900  text-white py-6 px-4 sticky top-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">Complete your booking</h1>
              <div className="flex gap-4 text-sm">
                <span
                  className="cursor-pointer text-slate-300 hover:text-white transition"
                  onClick={() => handleScroll("flight-summary")}
                >
                  Flights Summary
                </span>
                <span
                  className="cursor-pointer text-slate-300 hover:text-white transition"
                  onClick={() => handleScroll("travel-insurance")}
                >
                  Travel Insurance
                </span>
                <span
                  className="cursor-pointer text-slate-300 hover:text-white transition"
                  onClick={() => handleScroll("traveller-details")}
                >
                  Traveller Details
                </span>
                <span
                  className="cursor-pointer text-slate-300 hover:text-white transition"
                  onClick={() => handleScroll("seats-meals")}
                >
                  Seats & Meals
                </span>
                <span
                  className="cursor-pointer text-slate-300 hover:text-white transition"
                  onClick={() => handleScroll("add-ons")}
                >
                  Add-ons
                </span>
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
                  <div id="flight-summary" className="bg-white rounded-lg shadow-sm border border-slate-200">
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

                        <button className="text-blue-600 text-sm font-medium mb-4" onClick={() => setIsFareModalOpen(true)}>View Fare Rules</button>

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
                          <div className='border-t border-slate-300 w-[95%]'></div>
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
                            <Luggage className="w-5 h-5 text-[#78080B]" />
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
                        <button className="text-blue-600 text-sm font-medium" onClick={() => setIsFareModalOpen(true)}>View Policy</button>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <img src={AirlineLogo} alt="Airline logo" className="w-10 h-10 object-contain" />

                        <div className="flex flex-row sm:flex-row gap-4 w-full">
                          <div>
                            <div className="font-semibold mb-1">HDO-BLR</div>
                            <div className="text-sm text-slate-600 mb-3">Cancellation Penalty:</div>
                            <div className="text-sm text-slate-600 mt-2">Cancel Between (IST):</div>
                          </div>

                          <div className="flex-1">
                            {/* Timeline */}
                            <div className="relative">
                              <div className="flex items-center justify-around mb-2">
                                <span className="text-lg font-bold">₹ 4,650</span>
                                <span className="text-lg font-bold">₹ 6,849</span>
                              </div>

                              <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full mb-2"></div>

                              <div className="flex items-center justify-between text-sm">
                                <div className="text-left">
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

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Upgrade Fare Options */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-4" >
                      <div className='p-2' style={{ boxShadow: '0 1px 4px 0 rgba(0, 0, 0, .21)' }}>
                        <h3 className="text-lg font-bold mb-6">Get more benefits by upgrading your fare</h3>

                        <div className="grid grid-cols-3 gap-4">
                          {/* Your Selection */}
                          <div
                            className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'your-selection' ? 'border-[#78080B] bg-blue-50' : 'border-slate-200'
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

                            <div className='bg-[#f4f4f4] flex justify-center mb-2'>
                              <div className='border-t border-slate-300 w-[95%]'></div>
                            </div>

                            <div className="space-y-2 text-xs">

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span><strong>Flight Delay Protection</strong> benefit not included</span>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Date Change fee starts at <strong>₹ 3,000</strong> up to <strong>2 hrs</strong> before departure</span>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Seats Chargeable</span>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Cabin bag <strong>7 Kgs</strong> + Check-in <strong>15 Kgs</strong></span>
                              </div>

                            </div>

                          </div>

                          {/* MMT Regular */}
                          <div
                            className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'mmt-regular' ? 'border-[#78080B] bg-blue-50' : 'border-slate-200'}`}
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

                            <div className='bg-[#f4f4f4] flex justify-center mb-2'>
                              <div className='border-t border-slate-300 w-[95%]'></div>
                            </div>

                            <div className="space-y-2 text-xs">

                              <div className="flex items-center gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />

                                <span>
                                  <strong>Flight Delay Protection</strong> included
                                </span>

                                <div className="relative group">
                                  <AlertCircle className="h-3 w-3 cursor-pointer" />
                                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mt-1 hidden w-max rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                    Get compensaation of <strong>₹ 2,000</strong> if you flight is delayed by one hour or more
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Date Change fee starts at <strong>₹ 3,000</strong> up to <strong>2 hrs</strong> before departure</span>
                              </div>

                              <div className="flex items-center gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />

                                <span>
                                  Seats worth <strong>₹ 375</strong> included
                                </span>

                                <div className="relative group">
                                  <AlertCircle className="h-3 w-3 cursor-pointer" />
                                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mt-1 hidden w-max font-medium rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                    HDO-BLR: 22A. You can change seats in addons page.
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Cabin bag <strong>7 Kgs</strong> + Check-in <strong>15 Kgs</strong></span>
                              </div>

                            </div>

                          </div>

                          {/* MMT Premium */}
                          <div
                            className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFare === 'mmt-premium' ? 'border-[#78080B] bg-blue-50' : 'border-slate-200'
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

                            <div className='bg-[#f4f4f4] flex justify-center mb-2'>
                              <div className='border-t border-slate-300 w-[95%]'></div>
                            </div>

                            <div className="space-y-2 text-xs">

                              <div className="flex items-center gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />

                                <span>
                                  <strong>Flight Delay Protection</strong> included
                                </span>

                                <div className="relative group">
                                  <AlertCircle className="h-3 w-3 cursor-pointer" />
                                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mt-1 hidden w-max rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                    Get compensaation of <strong>₹ 2,000</strong> if you flight is delayed by one hour or more
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>
                                  Free date change upto <strong>2 hours</strong> before departure
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />

                                <span>
                                  Seats worth <strong>₹ 375</strong> included
                                </span>

                                <div className="relative group">
                                  <AlertCircle className="h-3 w-3 cursor-pointer" />
                                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mt-1 hidden w-max font-medium rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                    HDO-BLR: 22A. You can change seats in addons page.
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 text-orange-600">
                                <img src={Dash} alt="dash" className="fill-current text-green-600" />
                                <span>Cabin bag <strong>7 Kgs</strong> + Check-in <strong>15 Kgs</strong></span>
                              </div>

                            </div>

                          </div>
                        </div>
                        <button className="text-blue-600 my-3 text-sm font-medium mb-4">View Fare Rules</button>
                        {/* Extra Baggage Notice */}
                        <div className="bg-[#f4f4f4] border border-blue-200 p-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#78080B]" />
                            <p className="text-sm text-slate-700">
                              Just a click for a better trip <strong>Upgrade now!</strong>
                            </p>
                          </div>
                          <button className="text-blue-600 font-semibold text-sm whitespace-nowrap">CHANGE</button>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <h3 className="text-lg font-bold">Important Information</h3>
                      </div>

                      <div className="space-y-4 text-sm text-slate-700">
                        <div>
                          <div className='flex font-bold mb-2'>
                            <ShieldAlert className="mr-2 text-red-500" />
                            <p className=''>Nearby Airport</p>
                          </div>
                          <p>
                            Your flight goes from Ghaziabad, near Indira Gandhi International Airport. Please note, this is not the airport you originally searched for. Kindly check all the routes to your desired destination to avoid any hassles in your journey.
                          </p>
                        </div>

                        <div className='my-8'>
                          <div className='flex font-bold mb-2'>
                            <ShieldAlert className="mr-2 text-red-500 " />
                            <p className=''>Check travel guidelines and baggage information below:</p>
                          </div>
                          <p>
                            Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.
                          </p>
                        </div>

                        <div>
                          <div className='flex font-bold mb-2'>
                            <ShieldAlert className="mr-2 text-red-500" />
                            <p className=''>Unaccompanied Minors Travelling:</p>
                          </div>
                          <p>
                            Children below 18 years travelling alone may be classified as Unaccompanied Minors (UMNR) and can be subject to airline-specific UMNR rules, forms, and extra charges. Non-compliance may lead to denied boarding. Please check the respective airline website for exact requirements. Kindly note that MakeMyTrip will not have control over airline-specific decisions or charges.

                          </p>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Trip Secure */}
                  <div id="travel-insurance" className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-center mb-4">
                        <ShieldCheck className="mr-4 w-5 h-5 text-[#78080B]" />
                        <h3 className="text-lg font-bold">Trip Secure</h3>
                      </div>

                      {/* Pricing + Benefits Section */}
                      <div className="bg-[#f4f4f4] py-3 px-3 rounded-md">
                        {/* Pricing */}
                        <p className="text-lg font-semibold mb-3">
                          ₹199 <span className="text-xs text-slate-500">/Traveller (18% GST included)</span>
                        </p>

                        {/* Benefits Grid */}
                        <div className="flex gap-3s grid grid-cols-7 items-center flex-wrap">
                          <div className="flex col-span-2 items-center bg-white rounded-md px-2 py-2 border border-slate-200">
                            <Luggage className="mr-2 text-slate-600" />
                            <div>
                              <p className="font-medium text-slate-800">24x7 Support</p>
                              <p className="text-slate-500 text-sm">Delayed/lost baggage Assistance</p>
                            </div>
                          </div>

                          <div className="flex col-span-2 items-center bg-white rounded-md px-2 py-2 border border-slate-200">
                            <Luggage className="mr-2 text-slate-600" />
                            <div>
                              <p className="font-medium text-slate-800">Up to ₹2,500</p>
                              <p className="text-slate-500 text-sm">Missed Flight</p>
                            </div>
                          </div>

                          <div className="flex col-span-2 items-center bg-white rounded-md px-2 py-2 border border-slate-200">
                            <Luggage className="mr-2 text-slate-600" />
                            <div>
                              <p className="font-medium text-slate-800">Up to ₹2,500</p>
                              <p className="text-slate-500 text-sm">Trip Cancellation</p>
                            </div>
                          </div>

                          <div
                            className="flex text-sm col-span-1 items-center bg-white rounded-md px-3 py-2 border border-slate-200 text-blue-600 font-medium cursor-pointer hover:bg-blue-50 transition"
                            onClick={() => setIsTripBenefitsModal(true)}
                          >
                            View All Benefits →
                          </div>
                        </div>
                      </div>

                      {/* Selection Section */}
                      <div className="mt-4 space-y-3">
                        <p className="text-xs text-slate-500 bg-slate-100 px-2 py-1 inline-block rounded">
                          Chosen by 2 lakh+ people in last 1 month
                        </p>

                        <label className="flex items-center space-x-2">
                          <input type="radio" name="tripSecure" onClick={() => { setIsTripSecure(true) }} />
                          <span className="text-slate-800">Yes, Secure my trip.</span>
                        </label>
                        {isTripSecure && (
                          <div className="bg-green-100 border border-green-300 rounded-md p-2 flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 text-sm">Great! Your trip is secured.</span>
                          </div>
                        )}

                        <label className="flex items-center space-x-2">
                          <input type="radio" name="tripSecure" onClick={() => { setIsTripSecure(false) }} defaultChecked />
                          <span className="text-slate-800">No, I will book without trip secure.</span>
                        </label>

                        {!isTripSecure && (
                          <div className="bg-green-100 border border-green-300 rounded-md p-2 flex items-center space-x-2">
                            <span className="text-green-700 text-sm"><strong>3 Lakh+ travellers</strong> secured their trip in the last month. Get your trip also secured.</span>
                          </div>
                        )}

                        {isTripSecure && (
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-slate-800 text-sm">Save my selection for future bookings</span>
                          </label>
                        )}

                      </div>

                      {/* Testimonials */}
                      <div className='mt-5'>
                        <p className="text-xs px-2 py-1 mb-3">
                          Preferred by millions of travellers
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="border rounded-md p-3 text-sm text-slate-700 bg-slate-50">
                            "Your willingness to go above and beyond what was expected made a significant difference in my ability..."
                            <br />
                            <span className="text-xs font-semibold">~ Amit Paul</span>
                          </div>
                          <div className="border rounded-md p-3 text-sm text-slate-700 bg-slate-50">
                            "Wow, the claim settlement was incredibly fast. Thank you so much! Such a smooth experience..."
                            <br />
                            <span className="text-xs font-semibold">~ Prateek Keshari</span>
                          </div>
                          <div className="border rounded-md p-3 text-sm text-slate-700 bg-slate-50">
                            "This is the best travel protection I’ve used. The claim process was easy and transparent..."
                            <br />
                            <span className="text-xs font-semibold">~ Karthik Ritesh</span>
                          </div>
                        </div>
                      </div>


                      {/* Footer */}
                      <p className="text-xs text-slate-500 mt-4">
                        Trip Secure is non-refundable. By selecting it, I confirm that the age of all travellers is between 6 months and 90 years,
                        and I agree to the <a href="#" className="text-blue-600 underline">T&Cs</a>.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sidebar - Fare Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sticky top-25">
                    <h2 className="text-xl font-bold mb-4">Fare Summary</h2>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CirclePlus className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Base Fare</span>
                        </div>
                        <span className="font-semibold">₹ 5,936</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CirclePlus className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Taxes and Surcharges</span>
                        </div>
                        <span className="font-semibold">₹ 913</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CirclePlus className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Other Services</span>
                        </div>
                        <span className="font-semibold">₹ 2,100</span>
                      </div>
                    </div>

                    <div className="border-t border-t-2 border-slate-200 pt-4 mb-6">
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
