'use client';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="shadow-md p-2 flex justify-between bg-black bg-opacity-45 items-center fixed top-0 left-0 w-full z-50">
            <div className="flex items-center md:ml-12">
                <Link href={'/'}>   <Image src="/Images/lyaim-logo.png" alt="Logo" width={50} height={30} className="w-14 max-sm:w-10 md:w-full cursor-pointer rounded-full" /> </Link>
            </div>

            <div className="flex items-center space-x-4 md:space-x-8 text-white md:mr-12">
                <div className="flex gap-4 md:gap-10 text-lg drop-shadow-[2px_2px_2px_red]">
                    <Link href={'/register'}>REGISTRATION</Link>
                    <Link href={'/login'}>LOGIN</Link>
                </div>

                <div className="relative rounded-full  bg-slate-200 hover:bg-gray-700">
                    <button
                        className="flex items-center space-x-2  text-lg  text-gray-700 drop-shadow-[1px_1px_1px_red] hover:text-black"
                        onClick={() => setIsOpen(!isOpen)}>
                        <FaChevronDown />
                    </button>
                    {isOpen && (
                        <ul className="absolute right-0 mt-2 w-40 shadow-lg rounded-md overflow-hidden cursor-pointer">
                            <li className="px-4 py-2 font-bold hover:bg-gray-600 hover:bg-opacity-20 hover:text-orange-500">Help</li>
                            <li className="px-4 py-2 font-bold hover:bg-gray-600 hover:bg-opacity-20 hover:text-orange-500">Contact</li>
                            <li className="px-4 py-2 font-bold hover:bg-gray-600 hover:bg-opacity-20 hover:text-orange-500">Support</li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
