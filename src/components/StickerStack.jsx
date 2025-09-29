import React, { useState, useRef } from "react";
import offer3 from "@/assets/imgs/offer3.jpg";
import offer2 from "@/assets/imgs/offer2.jpg";
import offer1 from "@/assets/imgs/offer.jpg";
import MoveUpRightArrow from "@/assets/vectors/MoveUpRightArrow.svg";

const images = [offer1, offer2, offer3];

function Sticker({ frontIndex, underIndex, onPeeled }) {
    const [peeled, setPeeled] = useState(false);
    const [instantReset, setInstantReset] = useState(false);
    const hasCalledOnPeeled = useRef(false);

    const peel = () => { if (!peeled) setPeeled(true); };

    const handleKey = e => {
        if ((e.key === "Enter" || e.key === " ") && !peeled) {
            e.preventDefault();
            peel();
        }
    };

    const handleTransitionEnd = e => {
        if (
            peeled &&
            e.propertyName.includes("transform") &&
            !hasCalledOnPeeled.current
        ) {
            hasCalledOnPeeled.current = true;
            onPeeled();
            setInstantReset(true);
            setPeeled(false);
            requestAnimationFrame(() => {
                setInstantReset(false);
                hasCalledOnPeeled.current = false;
            });
        }
    };

    return (
        <>
            <div className="sticker-underneath">
            <div className="relative -top-[25px] -right-[10px] h-[95%] w-[95%]  bg-[#D9D9D9] rounded-2xl shadow-lg p-5"></div>
                <div className="sticker__holder">

                    <div className="sticker__content rounded-xl" style={{ background: `url(${images[underIndex]}) center/cover` }} >
                        <div className="sticker__shadow" />
                    </div>

                </div>
            </div>

            <div
                className={`sticker ${peeled ? "is-peeled" : ""} ${instantReset ? "instant-reset" : ""}`}
                role="button"
                tabIndex={0}
                onClick={peel}
                onKeyDown={handleKey}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className="sticker__face sticker__face--front">
                    <div className="sticker__holder">
                        <div className="sticker__content rounded-xl" style={{ background: `url(${images[frontIndex]}) center/cover` }} >
                            <div className="absolute top-2 right-2 z-50 bg-black text-white rounded-full p-1 flex items-center justify-center">
                                <img src={MoveUpRightArrow} alt="arrow" className="w-3 h-3" />
                            </div>
                            <div className="sticker__shadow" />
                        </div>
                    </div>
                </div>

                <div className="sticker__face sticker__face--back">
                    <div className="sticker__holder">
                        <div className="sticker__content">
                            <div className="sticker__shadow" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function StickerStack() {
    const [frontIndex, setFrontIndex] = useState(0);
    const [underIndex, setUnderIndex] = useState(1);

    const handlePeeled = () => {
        const nextUnderIndex = (underIndex + 1) % images.length;
        setFrontIndex(underIndex);
        setUnderIndex(nextUnderIndex);
    };

    return (
        <>
            {/* <div className="relative  overflow-hidden"></div> */}
            <div className="wrapper relative">
                <Sticker
                    frontIndex={frontIndex}
                    underIndex={underIndex}
                    onPeeled={handlePeeled}
                />
                <div className="help">click or press Enter/Space to peel</div>
            </div>
        </>
    );
}
