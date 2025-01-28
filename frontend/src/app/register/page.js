'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        referral: '',
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validation logic
    // const validate = () => {
    //     const errors = {};
    //     if (!formData.email.trim()) {
    //         errors.email = 'Email is required.';
    //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //         errors.email = 'Invalid email format.';
    //     }
    //     if (!formData.password.trim()) {
    //         errors.password = 'Password is required.';
    //     }
    //     return errors;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({}); alert('Submitted');
            console.log('Signup successful with:', formData);
            // Handle successful login (e.g., API call)
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(images/registration_background.png)",
            }}
        >
            <div className="flex justify-between items-center p-3 max-w-3xl mx-auto text-white">
                <div className="font-alex font-medium text-3xl text-[#977108]">Lyaim</div>
                <div className="flex gap-5 text-lg">
                    <Link href={'home'}>Home</Link>
                    <Link href={'help'}>Help</Link>
                </div>
            </div>

            <h1 className="text-2xl font-bold font-alegreya text-white mb-2 text-center">
                Sign Up Today And kickstart your football journey!
            </h1>

            <div className="flex bg-white/5 backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto">
                {/* Left Section: Image */}
                <div className="w-1/3 bg-black hidden md:block">
                    <Image
                        src="/images/reg1.png"
                        alt="Player"
                        width={300} // Adjust width as needed
                        height={500} // Adjust height as needed
                        className="object-cover"
                        layout="intrinsic"
                    />
                    <div className='text-white text-center font-aleo'>
                        <h2 className='text-2xl font-semibold font-Aboreto'>FOOTBALL</h2>
                        <Image
                            src="/images/reg2.png"
                            alt="Registration"
                            width={250} // Adjust width as needed
                            height={20} // Adjust height as needed
                            className="object-cover bg-white mx-auto"
                        // layout="intrinsic"
                        />
                        <p className='text-red-700 text-lg font-bold my-5'>Do not Wait</p>
                        <p className='px-5'>spots are filling fast! Register now and be part of the action.</p>
                        <p className='text-green-300 text-lg font-medium mt-3'>Your future starts on the field.</p>
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="flex-1 p-8 md:p-12">
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-5">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>
                        {/* Email Field */}
                        <div className="mb-5">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                        </div>
                        {/* Password Field */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        {/* Referral Field */}
                        <div className="mb-6">
                            <input
                                type="text"
                                name="referral"
                                placeholder="Referral Code"
                                value={formData.referral}
                                onChange={handleChange}
                                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2"
                            />
                            {errors.referral && <p className="text-red-500 text-sm mt-1">{errors.referral}</p>}
                        </div>

                        {/* Terms and conditions */}
                        <div className="mb-5">
                            <label className="flex items-center text-white text-lg">
                                <input
                                    type="checkbox"
                                    className="mr-2 border-gray-400 rounded"
                                />
                                I agree to the terms and conditions
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-1 rounded-full text-green-800 text-lg font-bold hover:bg-green-600 transition"
                            style={{
                                background: 'linear-gradient(150deg, #5fff4d, #008000)',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Register Now!
                        </button>
                    </form>

                    {/* Login Section */}
                    <p className="text-center text-white mt-6">
                        Already have an account?{" "}
                        <Link href="#" className="text-[#1E1E1E] text-xl font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
