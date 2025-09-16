import React, { useState } from 'react'
import { MoveUpRight} from 'lucide-react';

function PromotionalCard() {

    const [selectedImage, setSelectedImage] = useState(0);
    const imgs = ['offer', 'offer2', 'offer3'];

    const handleImageShift = () => {
        if (selectedImage === imgs.length - 1) {
            setSelectedImage(-1)
        }
        setSelectedImage(prevSelectedImage => prevSelectedImage + 1);
    };


    return (
        <div className="grid grid-cols-12 gap-8 pt-40">
            <div className="col-span-3 cursor-pointer" onClick={() => { handleImageShift() }}>
                <div className="bg-[#D9D9D9] rounded-2xl shadow-lg p-3">
                    <div className='relative'>
                        <img src={`./src/assets/imgs/${imgs[selectedImage]}.jpg`} className="bg-gray-100 w-full h-full object-contain rounded-lg" alt="Special offer" />
                        <div className="absolute top-2 right-2 bg-black text-white p-1 rounded-full flex items-center justify-center">
                             <img src="./src/assets/imgs/vectors/MoveUpRightArrow.svg" alt="arrow" className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionalCard