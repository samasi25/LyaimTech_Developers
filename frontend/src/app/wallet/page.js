'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Wallet() {
    const [totalMoney, setTotalMoney] = useState(0);
    const [addAmount, setAddAmount] = useState('');
    const [withdrawData, setWithdrawData] = useState({ amount: '', paypalID: '', age: '' });
    const [errors, setErrors] = useState({ addAmount: '', withdraw: {} });

    const handleAddMoney = () => {
        if (!addAmount) {
            setErrors((prev) => ({ ...prev, addAmount: 'Please enter an amount.' }));
            return;
        }
        if (isNaN(addAmount) || Number(addAmount) <= 0) {
            setErrors((prev) => ({ ...prev, addAmount: 'Amount must be a positive number.' }));
            return;
        }
        setTotalMoney((prev) => prev + Number(addAmount));
        setAddAmount('');
        setErrors((prev) => ({ ...prev, addAmount: '' }));
    };

    const handleWithdraw = () => {
        let newErrors = {};

        if (!withdrawData.amount) {
            newErrors.amount = 'Please enter an amount.';
        } else if (isNaN(withdrawData.amount) || Number(withdrawData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number.';
        }

        if (!withdrawData.paypalID) {
            newErrors.paypalID = 'Please enter a PayPal ID.';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(withdrawData.paypalID)) {
            newErrors.paypalID = 'Must be a valid PayPal ID.';
        }

        if (!withdrawData.age) {
            newErrors.age = 'Please enter your age.';
        } else if (isNaN(withdrawData.age) || Number(withdrawData.age) <= 18) {
            newErrors.age = 'Age must be greater than 18.';
        }

        if (Object.keys(newErrors).length) {
            setErrors((prev) => ({ ...prev, withdraw: newErrors }));
            return;
        }

        setTotalMoney((prev) => prev - Number(withdrawData.amount));
        setWithdrawData({ amount: '', paypalID: '', age: '' });
        setErrors((prev) => ({ ...prev, withdraw: {} }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#6b2c2c] to-[#4c60a6] flex items-center justify-center p-2 text-white">
            <Navbar />
            <div className="w-full max-w-4xl mt-20 p-6 rounded-lg shadow-xl font-aleo text-black flex flex-col items-center">
                <div className="flex w-full md:gap-12 gap-7 items-center">
                    <Image src="/Images/w 1.png" alt="Wallet" width={200} height={200} className='max-md:w-40 max-sm:hidden' />
                    <div className="flex flex-col space-y-4 w-full">
                        <h1 className="md:text-2xl text-xl font-semibold max-[400px]:text-sm ">Hii, <span className="font-bold">Username</span> <span className="bg-[#0a0440] md:text-xl text-sm bg-opacity-25 text-[#0a0440] px-4 py-2 max-[400px]:px-1 rounded-lg">Total Money: <span className='text-white'> $ {totalMoney.toFixed(2)} </span></span></h1>
                        <p className="border-b border-white pb-1">Deposited Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ 0.00</span></p>
                        <p className="border-b border-white pb-1">Winning Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ 0.00</span></p>
                        <p className="border-b border-white pb-1">Withdrawable Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ {totalMoney.toFixed(2)}</span></p>
                        <div className="flex gap-4 items-center mt-2 flex-col sm:flex-row ">
                            <input
                                type="text"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                className={`w-full p-2 border-b ${errors.addAmount ? 'border-red-500' : 'border-white'} bg-transparent outline-none`}
                                placeholder="Enter amount to add"
                            />
                            {errors.addAmount && <p className="text-red-500 text-sm mt-1">{errors.addAmount}</p>}
                            <button onClick={handleAddMoney} className="bg-gradient-to-br from-[#5672B8] via-[rgba(4,11,41,0.86)] to-[#040b29] text-white font-bold px-6 max-sm:px-12 py-2  rounded-full hover:text-gray-500">Add_Money</button>
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-6 gap-8 items-center max-sm:mt-12">
                    <div className="flex-1 flex flex-col">
                        <p className="text-[#400404] md:text-3xl text-2xl max-sm:text-xl font-bold drop-shadow-[0px_0px_1px_white]">Want to Withdraw Funds?</p>
                        {['amount', 'paypalID', 'age'].map((field, index) => (
                            <div key={index} className="w-full flex flex-col mt-2">
                                <input
                                    type="text"
                                    value={withdrawData[field]}
                                    onChange={(e) => setWithdrawData((prev) => ({ ...prev, [field]: e.target.value }))}
                                    className={`w-full p-2 border-b ${errors.withdraw[field] ? 'border-red-500' : 'border-white'} bg-transparent outline-none`}
                                    placeholder={`Enter ${field}`}
                                />
                                {errors.withdraw[field] && <p className="text-red-500 text-sm mt-1">{errors.withdraw[field]}</p>}
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <button onClick={handleWithdraw} className="mt-4 bg-gradient-to-br from-[#5672B8] via-[rgba(4,11,41,0.86)] to-[#040b29] font-bold text-white px-14 py-2 rounded-full hover:text-gray-500">Withdraw</button>
                        </div>
                    </div>
                    <Image src="/Images/s 1.png" alt="Hand Exchange" width={250} height={150} className='max-md:w-52 max-sm:hidden' />
                </div>
            </div>
        </div>
    );
}
