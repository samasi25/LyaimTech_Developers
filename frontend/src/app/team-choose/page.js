'use client';
import Link from 'next/link';
export default function Contest() {

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(Images/team_choose_background.jpeg)",
            }}
        >
            <div className="flex justify-between items-center p-3 max-w-3xl mx-auto text-white">
                <div className="font-alex font-medium text-3xl text-[#977108]">Lyaim</div>
                <div className="flex gap-5 text-lg">
                    <Link href={'/'}>Home</Link>
                    <Link href={'help'}>Help</Link>
                    <Link href={'profile'}>U</Link>
                </div>
            </div>

            {/* Team Choose Container */}
            <div className="bg-white/5 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-5 px-2">
                <p className="text-xl font-semibold font-alegreya mb-1">
                    TOGETHER, WE DON'T JUST CHASE GOALS;
                    <span className='text-2xl font-bold text-yellow-200'>
                        WE CHASE GREATNESS.
                    </span>
                </p>
                <p className="text-2xl text-[#3C645F] font-semibold font-alegreya">
                    ONE TEAM, ONE DREAM, ONE UNSTOPPABLE FORCE.
                </p>

                <p className='text-[#400404] text-xl font-semibold my-5'>Note:- "you can select team one time for now so please choose carefully."</p>

                <h1 className='text-2xl font-bold'>
                    Choose Your Team
                </h1>

                <div className='text-[#5672B8] text-xl font-semibold flex justify-evenly mx-auto'>
                    <div className='w-full p-3'>
                        <button className='w-full py-1 rounded-full bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300'>
                            Home Team
                        </button>
                        <div className='h-28 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md'></div>
                    </div>

                    <span className='text-[#0A0440] text-6xl font-medium font-arizonia mx-auto px-5'>vs</span>
                    
                    <div className='w-full p-3'>
                        <button className='w-full py-1 rounded-full bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300'>
                            Away Team
                        </button>
                        <div className='h-28 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
