import { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
import api from "../lib/axios";
import EmployeeForm from "./EmployeeForm";
import DeleteConfirmation from "./DeleteConfirmation";

export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department?: string;
  role: "ADMIN" | "EMPLOYEE";
  salary?: number;
}

const EmployeesPage = () => {
  // const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get<Employee[]>("/admin/employees");
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to load employees");
      console.error("Employees fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (employeeData: Omit<Employee, "id">) => {
    try {
      await api.post("/admin/users", employeeData);
      await fetchEmployees();
      setShowModal(false);
    } catch {
      setError("Failed to create employee");
    }
  };

  const handleUpdate = async (id: string, employeeData: Partial<Employee>) => {
    try {
      console.log("🟡 Frontend - Updating employee:", id);
      console.log("📦 Data being sent:", employeeData);
      await api.put(`/admin/employees/${id}`, employeeData);
      await fetchEmployees();
      setEditingEmployee(null);
    } catch {
      setError("Failed to update employee");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/employees/${id}`);
      await fetchEmployees();
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">
          Employees Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Department
              </th>            
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-green-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-900">
                    {employee.firstName} {employee.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-700">{employee.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-700">
                    {employee.jobTitle.replace(/_/g, " ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-700">
                    {employee.department || "Not specified"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-700">
                    {employee.salary
                      ? `£${employee.salary.toLocaleString("it-IT")}`
                      : "—"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.role === "ADMIN"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {employee.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingEmployee(employee)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="text-center py-8">
            <p className="text-green-600">No employees found</p>
          </div>
        )}
      </div>

      {showModal && (
        <EmployeeForm
          onSubmit={handleCreate}
          onCancel={() => setShowModal(false)}
        />
      )}
      {editingEmployee && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={(data) => handleUpdate(editingEmployee.id, data)}
          onCancel={() => setEditingEmployee(null)}
        />
      )}
      {deleteConfirm && (
        <DeleteConfirmation
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
