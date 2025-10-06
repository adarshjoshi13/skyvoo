import React, { useState } from 'react';
import StickerStack from './StickerStack'
import MoveUpRightArrow from "@/assets/vectors/MoveUpRightArrow.svg";
import Plane from '@/assets/imgs/plane.png'

function PromotionalCard() {

  return (
    <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-10 md:pt-20">
      {/* Promo Card */}
      <div className="md:col-span-3 cursor-pointer mb-8 md:mb-[100px] relative -left-[50px]">
        <div className="relative">
          <StickerStack />

        </div>
      </div>



      {/* Plane Image */}
      <div className="md:col-span-9">
        <img
          src={Plane}
          className="plane w-[80%] sm:w-[90%] md:w-[100%] h-auto"
          alt="Plane"
        />
      </div>
    </div>
  );
}

export default PromotionalCard;
