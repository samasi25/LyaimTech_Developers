'use client';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: 'Ayush',
        email: 'ayush@gmail.com',
        mobile: '1234567890',
        referral: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="max-h-screen py-24 sm:pr-5 w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(/Images/profileUpdateBackground.jpeg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <Navbar />

            {/* <div className="flex justify-center items-center rounded-xl overflow-hidden w-full max-w-4xl mx-auto"> */}
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl sm:p-4 md:p-8 max-w-sm sm:max-w-xl xl:max-w-2xl mx-auto sm:m-0 sm:ml-auto">
                <div className='text-center text-2xl font-aleo font-bold my-5'>
                    <div>Hii, {formData.username}</div>
                    <div className='text-white'>
                        Update Your Profile
                    </div>
                </div>

                <div>
                    {/* Email Field */}
                    <div className="mb-5">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
                        />
                    </div>
                    {/* Username Field */}
                    <div className="mb-5">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => handleChange(e)}
                            className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2"
                        />
                    </div>
                    {/* Mobile Field */}
                    <div className="mb-5">
                        <input
                            type='number'
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={(e) => handleChange(e)}
                            className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
                        />
                    </div>
                </div>

                {/* update Section */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 font-medium text-white mt-6">
                    <Link href="/profile-update" className="w-1/2">
                        <Button text='Update' color='white' />
                    </Link>
                    <Link href="/logout" className="w-1/2">
                        <Button text='Logout' color='white' />
                    </Link>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}
