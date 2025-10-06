/**
 * AuthContext.tsx
 * Defines the shape of authentication-related data and actions.
 * Provides global access to user information and auth utilities across the app.
 */

import { createContext } from "react";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department?: string;
  role: "ADMIN" | "EMPLOYEE";
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);