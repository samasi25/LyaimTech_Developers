'use client';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: 'Ayush',
    });

    return (
        <div
            className="pt-20 sm:pt-24 py-24 sm:pr-5 w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(/Images/leaderboardBackground.jpeg)",
                backgroundPosition: "left center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Navbar />

            <div className="rounded-xl overflow-hidden w-full max-w-4xl mx-auto">
                <div className='text-center text-[#152669DB] sm:text-xl md:text-2xl lg:text-3xl font-alegreya font-semibold'>
                    <div>WHERE PASSION MEETS PERSEVERANCE,</div>
                    <p>
                        VICTORY FINDS ITS PLACE ON THE
                        {' '}
                        <span className='text-[#305612] text-bold'>LEADERBOARD</span>
                        {'.'}
                    </p>
                </div>

                <div className="min-w-fit max-w-sm sm:max-w-sm xl:max-w-2xl mx-auto md:m-0 md:ml-auto">
                    <div className='text-center text-2xl font-aleo font-bold my-5'>
                        <div>Hii, {formData.username}</div>
                    </div>

                    <div className='bg-[#5672B8]/30 shadow-lg rounded-xl p-1 sm:p-2 md:p-3 pb-5'>
                        <div className='w-1/2 mx-auto'>
                            <Button text='Live Contest' color='white' />
                        </div>
                        <div className="bg-[#040B29DB]/50 backdrop-blur-md shadow-lg w-full h-28 rounded-lg mt-3"></div>
                        {/* button Section */}
                        <div className="flex justify-around items-center gap-3 font-medium text-white mt-5">
                            <button className='bg-[#0A044033] px-4 py-1 rounded-md'>Rank</button>
                            <button className='bg-[#0A044033] text-[#0A0440] px-4 py-1 rounded-md'>Points</button>
                            <button className='bg-[#0A044033] text-[#305612] px-4 py-1 rounded-md'>Winning</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
