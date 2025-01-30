import React from 'react'
import Image from "next/image";

const Home2 = () => {
    return (
        <>
            <div
                className="min-h-screen w-full bg-cover bg-center"
                style={{
                    backgroundImage: "url(/Images/home2.png)",
                }}
            >
                <div className="text-center space-y-5 p-10">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold font-abril">
                        EASY TO START, HARD TO FORGET
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-agbalumo w-2/3 text-center mx-auto">Choose your league, build your dream team, and claim the glory with epic prizes waiting to be won! 🏆⚽🎉</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-8 text-2xl lg:text-xl text-white font-bold font-acme p-4">
                    <div className="space-y-2 text-center">
                        <Image
                            width={150}
                            height={150}
                            src={'/Images/contest.png'}
                            alt='Contest'
                        />
                        <button className="py-2 w-full text-[#5672B8] sm:text-white sm:bg-[#3C645F80] rounded-md sm:hover:bg-[#3C645FBF]">
                            Contest
                        </button>
                    </div>

                    <div className="space-y-2 text-center">
                        <Image
                            width={150}
                            height={150}
                            src={'/Images/club1.png'}
                            alt='Choose Team'
                        />
                        <button className="py-2 w-full text-[#9C1919] sm:text-white sm:bg-[#3C645F80] rounded-md sm:hover:bg-[#3C645FBF]">
                            Choose Team
                        </button>
                    </div>

                    <div className="space-y-2 text-center">
                        <Image
                            width={150}
                            height={150}
                            src={'/Images/trophy1.png'}
                            alt='Leaderboard'
                            className="rounded-full"
                        />
                        <button className="py-2 w-full text-[#56C35E] sm:text-white sm:bg-[#3C645F80] rounded-md sm:hover:bg-[#3C645FBF]">
                            Leaderboard
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home2