/**
 * AuthProvider.tsx
 * Provides authentication context for the application.
 * Manages login, logout, and user session persistence via localStorage.
 */

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../lib/axios";
import { AuthContext, type User } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


/**
   * On initial mount, check for a stored token.
   * If found, attempt to fetch the user profile to restore the session.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoading(true);
      api
        .get<User>("employee/profile")
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.warn("Profile fetch failed:", err?.response?.status);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logs the user in using credentials.
   * Stores JWT token and user data locally.
   */
  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>("/auth/login", {
      email,
      password,
    });

    setToken(res.data.token);
    setUser(res.data.user);
    setIsLoading(false);

    localStorage.setItem("token", res.data.token);
    
  };

  //Logs the user out by clearing all authentication data.
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoading(false);
    localStorage.removeItem("token");
    
  };

  //Exposes authentication state and actions to the entire app.
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
