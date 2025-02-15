'use client';
import apiService from '@/components/apiService';
import Navbar from '@/components/Navbar';
import { useUser } from '@/context/AuthContext.js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import withAuth from "../../hoc/withAuth.js";

const ProfileUpdate = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNo: ''
    });
    const [updating, setUpdating] = useState(false);
    const { user, loading, logout } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        try {
            setUpdating(true);

            const response = await apiService.profileUpdate(formData);console.log(response);
            toast.success(response?.data?.message);
            router.push('/profile');
        } catch (error) {console.log(error);
            toast.error("Error updating profile");
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        setFormData(user);
    }, [])

    if (loading) {
        return <p className="text-center text-white text-2xl">Loading...</p>;
    }

    if (!user) {
        return <p className="text-center text-white text-2xl">User not found</p>;
    }

    return (
        <div
            className="min-h-screen py-24 sm:pr-5 w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(/Images/profileUpdateBackground.jpeg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <Navbar />

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
                            name="mobileNo"
                            placeholder="Mobile Number"
                            value={formData.mobileNo}
                            onChange={(e) => handleChange(e)}
                            className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2"
                        />
                    </div>
                </div>

                {/* update Section */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 font-medium text-white mt-6">
                    <button
                        type="button"
                        onClick={handleUpdateProfile}
                        className="w-full py-1 rounded-full text-white text-lg font-bold hover:bg-green-600 transition"
                        style={{
                            background: 'linear-gradient(150deg, #5672B8, #040B29DB)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {updating ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-1 rounded-full text-white text-lg font-bold hover:bg-green-600 transition"
                        style={{
                            background: 'linear-gradient(150deg, #5672B8, #040B29DB)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAuth(ProfileUpdate);