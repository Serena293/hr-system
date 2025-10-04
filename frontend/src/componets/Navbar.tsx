import { NavLink } from "react-router-dom";
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
 const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-600 hover:text-white"
    }`;
  return (
    <nav className="bg-green-800 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/dashboard" className="text-xl font-bold text-green-100">
          HR System
        </NavLink>

        <div className="flex space-x-4">
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-md bg-green-300 text-green-900 hover:bg-green-600 hover:text-white transition-colors"
            >
              Login
            </NavLink>
          )}

          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={linkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={linkClass}
              >
                Profile
              </NavLink>

              {user?.role === "ADMIN" && (
                <NavLink
                  to="/employees"
                  className={linkClass}
                >
                  Employees
                </NavLink>
              )}

              <button
                onClick={logout}
                className="px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
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
