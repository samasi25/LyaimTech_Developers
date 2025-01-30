'use client';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: 'Ayush',
    email: 'ayush@gmail.com',
    mobile: '1234567890',
    referral: '',
  });

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        background: 'linear-gradient(90deg, #0A0440, #78CAC0)',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Navbar />

      <div className="flex justify-center items-center rounded-xl overflow-hidden w-full max-w-4xl mx-auto">
        {/* Left Section: Image */}
        <div className="hidden md:block">
          <Image
            src="/Images/userProfile.png"
            alt="Player"
            width={300}
            height={500}
            className="object-cover"
            layout="intrinsic"
          />
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 p-8 md:p-12">
          <div className='flex justify-between text-2xl font-bold'>
            <span>Hii, {formData.username}</span>
            <button className='px-3 py-1 rounded-md bg-[#0A044033]'>
              Wallet $ 0.00
            </button>
          </div>

          <div>
            {/* Email Field */}
            <div className="mb-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
              />
            </div>
            {/* Username Field */}
            <div className="mb-5">
              <input
                type="text"
                name="username"
                value={formData.username}
                readOnly
                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2"
              />
            </div>
            {/* Mobile Field */}
            <div className="mb-5">
              <input
                type='number'
                name="mobile"
                value={formData.mobile}
                readOnly
                className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
              />
            </div>
            {/* Referral Field */}
            <div className="mb-6">
              <input
                type="text"
                name="referral"
                placeholder="Referral Code"
                value={formData.referral}
                readOnly
                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2"
              />
            </div>
          </div>

          {/* update Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 font-medium text-white mt-6">
            <p>Want to update your profile ?{" "}</p>
            <Link href="/profile-update" className="w-1/2">
              <Button text='Update' color='white' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
