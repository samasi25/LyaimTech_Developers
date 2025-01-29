import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-3 max-w-3xl mx-auto text-white">
            <div className="font-alex font-medium text-3xl text-[#977108]">Lyaim</div>
            <div className="flex gap-5 text-lg">
                <Link href={'/'}>Home</Link>
                <Link href={'help'}>Help</Link>
                <Link href={'profile'}>U</Link>
            </div>
        </div>
    )
}

export default Navbar
