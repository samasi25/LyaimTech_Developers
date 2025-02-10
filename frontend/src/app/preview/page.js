'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const Preview = () => {
    const router = useRouter();
    const [team, setTeam] = useState('');  
    const [playerName, setPlayerName] = useState(''); 
    const [popupMessage, setPopupMessage] = useState(''); 
    const [isPopupVisible, setIsPopupVisible] = useState(false); 
    const handleSubmit = async () => {
        const data = { team, playerName };

        try {
            console.log('Sending data to backend...', data);

            const success = true;

            if (success) {
                setPopupMessage('Data submitted successfully!');
                setIsPopupVisible(true);
                setTimeout(() => {
                    router.push('/team-choose'); 
                }, 2000);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            setPopupMessage('Server error, please try again!');
            setIsPopupVisible(true);
        }
    };

    const handleGoBack = () => {
        router.push('/team-choose'); 
    };

    const closePopup = () => {
        setIsPopupVisible(false); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-4 font-aleo">
            <Navbar />
            <div className="bg-gray-500 bg-opacity-40 shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto mt-10 py-8 px-6 md:px-12 flex flex-col items-center text-center">
                <h1 className="md:text-5xl text-4xl font-bold font-alkalami text-[#0A0440]">Preview</h1>

                <div className="w-full max-w-2xl h-96 bg-gray-600 p-6 font-aleo text-lg rounded-lg mt-10 shadow-lg">
                    <textarea
                        className="w-full h-[calc(100%-16px)] p-3 text-gray-200 bg-gray-600 rounded-md border-none resize-none focus:outline-none"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)} 
                    ></textarea>
                </div>

                <button
                    className="p-3 px-8 mt-6 bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] font-aleo transform hover:scale-105 transition-transform duration-300 text-white font-bold md:text-xl rounded-md shadow-md"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <div className="w-full max-w-lg flex flex-col sm:flex-row items-center mt-6 gap-3">
                    <h1 className="md:text-2xl text-2xl font-bold font-aleo text-[#000000]">Want to change?</h1>
                    <button
                        className="p-3 px-8 bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] font-aleo transform hover:scale-105 transition-transform duration-300 text-white font-bold md:text-xl rounded-md shadow-md"
                        onClick={handleGoBack} 
                    >
                        Go back to previous page
                    </button>
                </div>
            </div>

            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                        <h2 className="text-xl font-bold">{popupMessage}</h2>
                        <button
                            className="mt-4 p-2 px-6 bg-blue-500 text-white rounded-md"
                            onClick={closePopup} 
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preview;
