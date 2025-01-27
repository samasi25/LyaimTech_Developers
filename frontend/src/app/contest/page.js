'use client';
import Image from 'next/image';
import Link from 'next/link';
export default function Contest() {

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(images/contest_background.jpeg)",
            }}
        >
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b"></div> */}
            <div className="flex justify-between items-center p-3 max-w-3xl mx-auto text-white">
                <div className="font-alex font-medium text-3xl text-[#977108]">Lyaim</div>
                <div className="flex gap-5 text-lg">
                    <Link href={'home'}>Home</Link>
                    <Link href={'help'}>Help</Link>
                </div>
            </div>

            {/* Contest Container */}
            <div className="bg-white/5 text-black text-center font-aleo backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-5 px-2">
                <h1 className="text-2xl font-bold font-alegreya mb-1">
                    UNLEASH YOUR PASSION, COMPETE WITH PRIDE -
                </h1>
                <h3 className="text-xl font-medium font-alegreya mb-1">
                    JOIN THE ULTIMATE FOOTBALL CONTEST AND CLAIM YOUR GLORY!
                </h3>
                <div className='flex justify-evenly mx-auto my-5 text-xl font-bold'>
                    <span>Hii, Username</span>
                    <span className='bg-[#0A044033] px-2 py-1 rounded'>Wallet $ 0.00</span>
                </div>
                <p className='text-[#400404] text-xl font-semibold mb-5'>Note:- "Before join add fund through wallet."</p>
                <div className='text-[#0A0440] text-xl font-semibold flex items-center justify-evenly mx-auto'>
                    <div>Available Contests</div>
                    <button className='px-10 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-900 transform hover:scale-105 transition-transform duration-300'>
                        Search
                    </button>
                </div>
                <div className='w-96 h-28 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md'></div>
            </div>
        </div>
    );
}
