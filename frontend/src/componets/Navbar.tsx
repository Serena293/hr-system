import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <nav className="bg-green-800 text-white px-6 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-green-100">HR System</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-green-800 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-green-100">
          HR System
        </Link>

        <div className="flex space-x-4">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="px-3 py-2 rounded-md bg-green-300 text-green-900 hover:bg-green-600 hover:text-white transition-colors"
            >
              Login
            </Link>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Profile
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/employees"
                  className="px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Employees
                </Link>
              )}

              <button
                onClick={logout}
                className="px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
