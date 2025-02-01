'use client';
import Navbar from '@/components/Navbar';
export default function Contest() {

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(/Images/team_choose_background.jpeg)",
            }}
        >
            <Navbar />


            <div className="flex items-center justify-center min-h-screen p-4 ">
                <div className="bg-gray-400 bg-opacity-20 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-8 px-4 mt-10 md:px-6 max-md:mt-32">
                    <p className="text-2xl font-semibold font-alegreya mb-2 drop-shadow-[1px_1px_2px_black]">
                        TOGETHER, WE DON'T JUST CHASE GOALS;
                        <span className="text-3xl font-bold text-yellow-200 drop-shadow-[1px_1px_2px_black]"> WE CHASE GREATNESS.</span>
                    </p>
                    <p className="text-2xl md:text-3xl text-[#3C645F] font-semibold font-alegreya drop-shadow-[1px_1px_1px_white] max-sm:mt-7">
                        ONE TEAM, ONE DREAM, ONE UNSTOPPABLE FORCE.
                    </p>

                    <p className="text-[#400404] mt-10 text-lg md:text-2xl font-semibold my-5 drop-shadow-[1px_1px_1px_white]  max-sm:mt-7">
                        Note:- "You can select your team only once, so choose carefully."
                    </p>

                    <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[1px_1px_1px_blue]">Choose Your Team</h1>

                    <div className="flex justify-center items-center w-full max-sm:gap-4 gap-8 mt-6">
                        <div className="w-full max-w-xs md:max-w-sm text-center">
                            <button className="w-full py-2 rounded-full md:text-2xl bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 drop-shadow-[0px_0px_2px_white] hover:drop-shadow-[0px_0px_0px_white]">
                                Home Team
                            </button>
                            <div className="h-40 md:h-52 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md"></div>
                        </div>

                        <span className="text-[#0A0440] text-3xl md:text-6xl font-medium font-arizonia mx-auto drop-shadow-[0px_0px_1px_red]">
                            VS
                        </span>


                        <div className="w-full max-w-xs md:max-w-sm text-center">
                            <button className="w-full py-2 rounded-full bg-gradient-to-b  from-black to-gray-800 hover:scale-105 transition-transform duration-300 md:text-2xl drop-shadow-[0px_0px_2px_white]  hover:drop-shadow-[0px_0px_0px_white]">
                                Away Team
                            </button>
                            <div className="h-40 md:h-52 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md"></div>
                        </div>
                    </div>


                    <div className="mt-6">
                        <button className="px-16 py-2 bg-gradient-to-br from-[#B8A956] via-[#290406DB] to-[#290406DB] rounded-full font-aleo text-[#B8A956] text-2xl font-semibold  hover:scale-105 transition-transform duration-300">
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
