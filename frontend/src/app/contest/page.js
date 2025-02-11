'use client';
import { useRouter } from 'next/navigation';  
import Navbar from '@/components/Navbar';

export default function Contest() {
    const router = useRouter(); 
    
    const handleWalletClick = () => {
        router.push('/wallet'); 
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(Images/contest_background.jpeg)"
            }}
        >
            <Navbar />

            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="bg-gray-300 bg-opacity-[15%] text-black text-center font-aleo backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto mt-20 py-5 px-4 md:px-8">

                    <h1 className="text-xl sm:text-2xl md:text-4xl mt-6 font-bold font-abril mb-4 drop-shadow-[1px_1px_2px_white]">
                        UNLEASH YOUR PASSION, COMPETE WITH PRIDE -
                    </h1>
                    <h3 className="text-base sm:text-lg md:text-2xl text-[#0A0440] font-alegreya font-bold mb-6 md:mb-10 drop-shadow-[1px_1px_1px_white]">
                        JOIN THE ULTIMATE FOOTBALL CONTEST AND CLAIM YOUR GLORY!
                    </h3>

                    <div className='flex justify-evenly mx-auto my-5 text-sm sm:text-lg md:text-3xl md:mb-10 font-bold'>
                        <span className='font-alegreya drop-shadow-[1px_1px_1px_white]'>Hii, Username</span>
                        <span 
                            className='bg-[#0A044033] text-white px-2 sm:px-4 md:px-8 py-1 rounded cursor-pointer'
                            onClick={handleWalletClick}  
                        >
                            <span className='text-[#0A0440]'>Wallet $</span> 0.00
                        </span>
                    </div>

                    <p className='text-[#400404] text-sm sm:text-lg md:mb-10 md:text-3xl font-semibold mb-6 drop-shadow-[1px_1px_1px_white]'>
                        Note: "Before join add fund through wallet."
                    </p>

                    <div className='text-[#0A0440] text-sm sm:text-lg md:text-2xl drop-shadow-[1px_1px_1px_white] font-semibold flex items-center justify-evenly mx-auto'>
                        <div>Available Contests</div>
                        <button className='px-4 sm:px-6 md:px-10 py-1 rounded-lg bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-sm sm:text-lg md:text-2xl font-aleo transform hover:scale-105 transition-transform duration-300'>
                            Search
                        </button>
                    </div>

                    <div className='w-[70%] sm:w-[70%] md:w-[63%] h-24 sm:h-32 md:h-48 mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md'></div>

                </div>
            </div>
        </div>
    );
}
