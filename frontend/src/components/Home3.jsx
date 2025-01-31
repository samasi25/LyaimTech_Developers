import React from 'react'
import Image from "next/image";

const Home3 = () => {
    return (
        <>
            <div
                className="w-full bg-cover bg-center md:h-[500px]"
                style={{
                    backgroundImage: "url(/Images/home3.png)",
                }}
            >
                <div className="text-center md:p-20 p-14">
                    <h1 className="text-3xl text-[#400404] drop-shadow-[1px_1px_1px_white] sm:text-3xl md:text-4xl font-medium font-abril">
                        FANTASY GAME FOR ALL
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row md:justify-around items-center gap-1 md:gap-8 text-lg md:text-xl lg:text-2xl text-black md:text-center font-semibold md:font-bold font-acme px-4 md:my-4">
                    <div className="flex items-center bg-[#2D4C481A] p-2">
                        <Image
                            width={20}
                            height={20}
                            src={'/svg/tick.svg'}
                            alt='tick'
                        />
                        <p className="font-alegreya drop-shadow-[1px_1px_2px_white]">
                            FROM ONE-DAY-LEAGUES TO WORLD-WIDE-TOURNAMENTS
                        </p>
                    </div>

                    <div className="flex items-center bg-[#2D4C481A] p-2">
                        <Image
                            width={20}
                            height={20}
                            src={'/svg/tick.svg'}
                            alt='tick'
                        />
                        <p className="font-alegreya drop-shadow-[1px_1px_2px_white]">
                            MAXIMUM TOOLS TO CREATE THE BEST FANTASY TEAM EVER
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-around items-center gap-1 md:gap-8  text-lg md:text-xl lg:text-2xl text-black md:text-center font-semibold md:font-bold font-acme px-4 md:py-4">
                    <div className="w-full flex items-center bg-[#2D4C481A] p-2">
                        <Image
                            width={20}
                            height={20}
                            src={'/svg/tick.svg'}
                            alt='tick'
                        />
                        <p className="md:w-2/3 lg:w-1/2 mx-auto font-alegreya drop-shadow-[1px_1px_2px_white]">
                            FREE AND PAID GAMES AVAILABLE
                        </p>
                    </div>

                    <div className="w-full flex items-center bg-[#2D4C481A] p-2">
                        <Image
                            width={20}
                            height={20}
                            src={'/svg/tick.svg'}
                            alt='tick'
                        />
                        <p className="md:w-2/3 lg:w-1/2 mx-auto max-md:mb-10 font-alegreya drop-shadow-[1px_1px_2px_white]">
                            EASY TO MANAGE WALLET
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home3