'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    { question: "REGISTRATION FAQS", answer: "Here are some common registration questions." },
    { question: "PLAYING THE GAME FAQS", answer: "How to play the game effectively." },
    { question: "SCORES AND POINTS FAQS", answer: "Understanding the scoring system." },
    { question: "REFER AND EARN FAQS", answer: "Earn rewards by referring friends." },
    { question: "ACCOUNT FAQS", answer: "Managing your account and settings." },
    { question: "WINNING PRIZES FAQS", answer: "How to claim and receive prizes." },
];

export default function Help() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/Images/helpBackground.jpeg')] bg-cover bg-center px-4 py-10">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-alegreya text-center text-black mb-4">Frequently Asked Questions</h2>

                {faqs.map((faq, index) => (
                    <div key={index} className="mb-2">
                        <button
                            className="flex justify-between items-center w-full px-2 py-1 sm:px-4 sm:py-2 bg-[#0A044033] text-base sm:text-lg font-semibold rounded-lg shadow-md"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <FaChevronDown className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openIndex === index && (
                            <div className="p-4 bg-gray-300 text-black rounded-b-lg">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
