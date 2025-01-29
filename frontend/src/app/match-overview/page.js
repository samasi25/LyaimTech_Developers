import React from "react";

const MatchOverview = () => {
    return (
        <div
            className="relative w-full min-h-[100vh] bg-cover bg-no-repeat bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(/Images/MatchOverview_background.png)" }}
        >
            <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div>

            <div className="relative z-10 max-w-6xl w-full text-center p-6 text-white  bg-gray-300 bg-opacity-[15%] rounded-lg flex flex-col items-center justify-center xl:m-0 m-6 xl:mx-0 mx-6">

                <h1 className="text-4xl md:text-3xl sm:text-2xl font-abril text-black font-bold mt-5 uppercase drop-shadow-[1px_1px_1px_white]">
                    Every Match Leaves Its Mark –
                </h1>
                <p className="text-3xl md:text-2xl sm:text-xl font-alegreya mt-4 text-[#0A0440] font-bold uppercase drop-shadow-[1px_1px_1px_white]">
                    A Blend Of Skill, Passion, And Unforgettable Moments That Transcend The Final Score.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-6 sm:gap-4 mt-6">
                    <p className="text-3xl md:text-2xl sm:text-lg font-alegreya font-bold text-black drop-shadow-[3px_2px_2px_gray]">
                        Hii, <span>Username</span>
                    </p>
                    <p className="text-2xl md:text-xl sm:text-lg font-aleo bg-gray-700 bg-opacity-[70%] text-[#0A0440] font-bold px-6 py-2 sm:px-4 sm:py-1 rounded-lg">
                        Wallet $ <span className="font-bold text-[#fff]">0.000</span>
                    </p>
                    <button className="text-2xl md:text-xl sm:text-lg font-aleo bg-gray-700 bg-opacity-[70%] font-bold text-[#0A0440] px-6 py-2 sm:px-4 sm:py-1 rounded-lg">
                        Terms & Conditions
                    </button>
                </div>

                <h2 className="text-4xl md:text-3xl sm:text-2xl font-agbalumo text-[#400404] drop-shadow-[1px_1px_2px_white] mt-10">
                    Match Overview
                </h2>

                <div className="flex flex-col md:flex-row max-md:items-center justify-center gap-10 md:gap-8 sm:gap-6 mt-12 w-full">
                    <div className="flex flex-col items-center w-96 md:w-72 sm:w-96 max-sm:w-[100%]">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Upcoming Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 md:h-48 sm:h-40 rounded-lg mt-4"></div>
                    </div>
                    <div className="flex flex-col items-center w-96 md:w-72 sm:w-96 max-sm:w-[100%]">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Live Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 md:h-48 sm:h-40 rounded-lg mt-4"></div>
                    </div>
                    <div className="flex flex-col items-center w-96 md:w-72 sm:w-96 max-sm:w-[100%]">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Completed Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 md:h-48 sm:h-40 rounded-lg mt-4"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MatchOverview;

