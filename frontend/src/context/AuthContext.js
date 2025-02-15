"use client";
import apiService from "@/components/apiService";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();
import { useRouter } from 'next/navigation';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to fetch user details
  const fetchUser = async () => {
    if( !localStorage.getItem("token") ) return
    try {
      setLoading(true);
      const res = await apiService.profile();
      if (res.statusText === 'OK') {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function to remove user details
  const logout = async () => {
    try {
      await apiService.logout();
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");console.log(error);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use User context
export const useUser = () => useContext(UserContext);
