import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../lib/axios";
import { AuthContext, type User } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


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

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoading(false);
    localStorage.removeItem("token");
    
  };

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
