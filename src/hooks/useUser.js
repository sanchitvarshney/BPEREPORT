import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Utility function to check if a string is valid JSON
  const isValidJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  };

  // Utility function to check if a string is valid Base64
  const isValidBase64 = (str) => {
    try {
      return btoa(atob(str)) === str; // Encode after decoding to verify validity
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedinUser");
    if (storedUser) {
      if (isValidBase64(storedUser)) {
        const decodedUser = atob(storedUser); // Decode the Base64 string
        if (isValidJSON(decodedUser)) {
          setUser(JSON.parse(decodedUser));
        } else {
          console.error("Invalid JSON in loggedinUser");
          localStorage.clear();
          window.location.reload();
        }
      } else {
        console.error("Invalid Base64 in loggedinUser");
        localStorage.clear();
        window.location.reload();
      }
    }
  }, [navigate, dispatch]);

  const saveUser = (userData) => {
    if (userData) {
      const encodedUser = btoa(JSON.stringify(userData)); // Encode to Base64
      localStorage.setItem("loggedinUser", encodedUser);
      setUser(userData);
    } else {
      clearUser();
    }
  };

  const clearUser = () => {
    localStorage.removeItem("loggedinUser");
    setUser(null);
  };

  return {
    user,
    saveUser,
    clearUser,
  };
}
