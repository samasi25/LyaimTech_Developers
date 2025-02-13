"use client";
import apiService from "@/components/apiService";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user details
  const fetchUser = async () => {
    try {
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
      setUser(null);
    } catch (error) {
      toast.error("Logout failed:", error);
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
