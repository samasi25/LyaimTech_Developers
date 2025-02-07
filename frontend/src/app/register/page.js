'use client';
import apiService from '@/components/apiService';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNo: '',
        password: '',
        referralCode: '',
    });
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null); // new
    const router = useRouter();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validation logic
    const validate = () => {
        const errors = {};

        // if (!formData.username.trim()) {
        //     errors.username = "Username is required.";
        // }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format.";
        }
        if (!/^\d{10}$/.test(formData.mobileNo)) {
            errors.mobileNoNo = "Invalid mobileNoNo number (10 digits required).";
        }
        if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
        }
        // if (!checked) {
        //     errors.terms = "You must agree to the terms and conditions.";
        // }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // else {
        //     setErrors({}); 
        //     console.log('Signup successful with:', formData);
        //     // Handle successful login (e.g., API call)
        // }


        try {
            const response = await apiService.signup(formData);
            alert('Submitted');
            router.push("/login");
        } catch (error) {
            setServerError(error.response?.data?.message || "Something went wrong")
        }
    };

    const isFormValid =
        formData.username.trim() &&
        formData.email.trim() &&
        formData.mobileNo.trim() &&
        formData.password.trim() &&
        checked

    return (
        <div
            className="min-h-screen pt-24 pb-5 w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(Images/registration_background.png)"
            }}
        >
            <Navbar />

            <h1 className="text-lg md:text-2xl font-bold font-alegreya text-white mb-2 text-center">
                🏆 Sign Up Today And kickstart your football journey!
            </h1>

            <div className='text-[#3C645F] text-center font-aleo md:hidden'>
                <p className='text-red-700 text-2xl font-bold mt-5'>Do not Wait</p>
                <p className='px-5'>Spots are filling fast! Register now and be part of the action.</p>
                <p className='text-[#1B7C0E] text-lg font-medium my-2'>Your future starts on the field.</p>
            </div>

            {/* Register section */}
            <div className="flex bg-white/10 backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-sm sm:max-w-xl md:max-w-4xl w-full mx-auto">
                {/* Left Section: Image */}
                <div className="w-1/3 bg-black hidden md:block">
                    <Image
                        src="/Images/reg1.png"
                        alt="Player"
                        width={300}
                        height={500}
                        className="object-cover"
                    // layout="intrinsic"
                    />
                    <div className='text-white text-center font-aleo'>
                        <h2 className='text-2xl font-semibold font-Aboreto'>FOOTBALL</h2>
                        <Image
                            src="/Images/reg2.png"
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
                <div className="flex-1 p-2 sm:p-4 md:p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-5">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-gray-800 outline-none pl-2"
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
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-gray-800 outline-none pl-2"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        {/* mobileNo Field */}
                        <div className="mb-5">
                            <input
                                type='number'
                                name="mobileNo"
                                placeholder="mobile Number"
                                value={formData.mobileNo}
                                onChange={(e) => handleChange(e)}
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-gray-800 outline-none pl-2"
                            />
                            {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
                        </div>
                        {/* Password Field */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-gray-800 pl-2"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        {/* referralCode Field */}
                        <div className="mb-6">
                            <input
                                type="text"
                                name="referralCode"
                                placeholder="referral Code"
                                value={formData.referralCode}
                                onChange={handleChange}
                                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-gray-800 pl-2"
                            />
                            {errors.referralCode && <p className="text-red-500 text-sm mt-1">{errors.referralCode}</p>}
                        </div>

                        {/* Terms and conditions */}
                        <div className="mb-5">
                            <label className="flex items-center text-white text-lg">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                    className="mr-2 border-gray-400 rounded"
                                />
                                I agree to the terms and conditions
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-1 rounded-full text-lg font-bold transition
                                ${isFormValid ? "text-green-800" : "text-gray-500 cursor-not-allowed"}
                            `}
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
                        <Link href="/login" className="text-[#1E1E1E] text-xl font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
