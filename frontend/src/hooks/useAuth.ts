/**
 * useAuth.ts
 * Custom React hook that provides access to authentication context.
 * Ensures the hook is used only within a valid <AuthProvider>.
 */

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};