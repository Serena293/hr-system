/**
 * ProtectedRoute.tsx
 * Restricts access to routes that require authentication.
 * Displays a loading spinner while verifying user state and redirects unauthenticated users to login.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for protected pages.
 * - Shows a loader while authentication state is being determined.
 * - Redirects to /login if the user is not authenticated.
 * - Renders children if the user is authorized.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;