import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import api from "../lib/axios";

interface DashboardStats {
  totalEmployees: number;
  adminCount: number;
  employeeCount: number;
  departments: { [key: string]: number };
}

interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department?: string;
  role: "ADMIN" | "EMPLOYEE";
}

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    adminCount: 0,
    employeeCount: 0,
    departments: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.role === "ADMIN") {
        try {
          const response = await api.get("/admin/employees");
          const employees = response.data;

        
          const adminCount = employees.filter((emp: Employee) => emp.role === "ADMIN").length;
          const employeeCount = employees.filter((emp: Employee) => emp.role === "EMPLOYEE").length;
        
          const departments: { [key: string]: number } = {};
          employees.forEach((emp: Employee) => {
            const dept = emp.department || "Unassigned";
            departments[dept] = (departments[dept] || 0) + 1;
          });

          setStats({
            totalEmployees: employees.length,
            adminCount,
            employeeCount,
            departments
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-2">
        Welcome back, {user?.firstName}!
      </h1>
      <p className="text-green-600 mb-8">
        {user?.role === "ADMIN" 
          ? "HR Management Dashboard" 
          : "Employee Portal"
        }
      </p>

      {user?.role === "ADMIN" && (
        <div className="space-y-6">
       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <span className="text-xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Total Employees</p>
                  <p className="text-2xl font-bold text-green-800">
                    {stats.totalEmployees}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <span className="text-xl">🛠</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Admins</p>
                  <p className="text-2xl font-bold text-green-800">
                    {stats.adminCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <span className="text-xl">👤</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Employees</p>
                  <p className="text-2xl font-bold text-green-800">
                    {stats.employeeCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <span className="text-xl">🏢</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Departments</p>
                  <p className="text-2xl font-bold text-green-800">
                    {Object.keys(stats.departments).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

        
          {Object.keys(stats.departments).length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Departments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(stats.departments).map(([dept, count]) => (
                  <div key={dept} className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-800">{dept}</p>
                    <p className="text-2xl font-bold text-green-600">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/employees"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Manage Employees
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {user?.role === "EMPLOYEE" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600">Position</p>
                <p className="font-medium text-green-800">{user.jobTitle}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Department</p>
                <p className="font-medium text-green-800">{user.department || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Quick Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/profile"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                View My Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;