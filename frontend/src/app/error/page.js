'use client';
import Navbar from '@/components/Navbar';

export default function Error() {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(Images/Error.gif)",
                backgroundColor:'#DFE3F2', opacity: 0.8
            }}
        >
            <Navbar />

            <div className="flex justify-center items-center min-h-screen px-4">
                <div>
                    <h1 className="text-xl text-[#0A0440] flex justify-center md:text-8xl font-bold font-alkalami mb-4 drop-shadow-[1px_1px_2px_white]">
                        404 Error
                    </h1>
                    <h3 className="sm:text-lg flex justify-center md:text-4xl text-[#152669] font-aleo font-bold italic md:mb-10 drop-shadow-[1px_1px_1px_white]">
                    The Page you've been looking for might have been removed or temporarily unavailable
                    </h3>

                    <div className='text-[#0A0440] text-sm sm:text-lg md:text-2xl drop-shadow-[1px_1px_1px_white] font-semibold flex items-center justify-evenly mx-auto'>
                        <button className='px-4 sm:px-6 md:px-10 py-1 rounded-lg bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-sm sm:text-lg md:text-2xl font-aleo font-semi bold transform hover:scale-105 transition-transform duration-300'>
                            GO TO HOME PAGE
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
