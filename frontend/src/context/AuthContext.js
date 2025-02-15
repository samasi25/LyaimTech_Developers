"use client";
import apiService from "@/components/apiService";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user details
  const fetchUser = async () => {
    try {
      const res = await apiService.profile();
      if (res.status === 200) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  // Function to fetch wallet details
  const fetchWallet = async () => {
    try {
      const res = await apiService.fetchData("/wallet");
      if (res.status === 200) {
        setWallet(res.data.wallet);
      } else {
        setWallet(null);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
      setWallet(null);
    }
  };

  // Logout function to remove user details
  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      setWallet(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      await fetchWallet();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, wallet, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use User context
export const useUser = () => useContext(UserContext);
