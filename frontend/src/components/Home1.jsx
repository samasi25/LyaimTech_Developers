import React from 'react'

const Home1 = () => {
    return (
        <>
            <div
                className="min-h-screen w-full bg-cover bg-center"
                style={{
                    backgroundImage: "url(/Images/home1.png)",
                }}
            >
                <div className="mt-64 w-2/3 left-1/3 absolute text-white space-y-20 max-sm:mt-40">
                    <div className="text-center font-acme space-y-5">
                        <h1 className="text-3xl font-semibold font-abril drop-shadow-[4px_4px_4px_black]">
                            KICK OFF YOUR FANTASY JOURNEY!!!
                        </h1>
                        <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">Build you dream team,</p>
                        <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">Dominate the field,</p>
                        <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">And win big! 🤑</p>
                    </div>

                    <div className="text-center space-y-5">
                        <p className="text-3xl font-bold font-agbalumo text-[#970808] drop-shadow-[1px_1px_2px_white]">
                            SO, WHAT ARE YOU WAITING FOR???
                        </p>
                        <button
                            style={{
                                background: 'linear-gradient(150deg, #5672B8, #040B29DB)',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                            }}
                            className="w-fit px-16 py-1 rounded-2xl text-[#93EEE3] text-lg font-semibold hover:bg-[#93EEF9] transition"
                        >
                            JOIN NOW
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home1