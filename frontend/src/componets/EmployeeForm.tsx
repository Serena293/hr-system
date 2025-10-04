import { useState, useEffect } from "react";
import type { Employee } from "./EmployeesPage";

interface EmployeeFormData {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department?: string;
  role: "ADMIN" | "EMPLOYEE";
  salary?: number;
  password?: string;
}

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

const JOB_TITLES = [
  "FRONTEND_DEVELOPER",
  "BACKEND_DEVELOPER",
  "FULLSTACK_DEVELOPER",
];

const DEPARTMENTS = ["HR", "FINANCE", "ENGINEERING", "MARKETING"];

const EmployeeForm = ({ employee, onSubmit, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    role: "EMPLOYEE" as "ADMIN" | "EMPLOYEE",
    salary: "",
  });

  useEffect(() => {
    if (employee) {
      console.log("🔄 Employee data in form:", employee);
      console.log(
        "💰 Employee salary:",
        employee.salary,
        "Type:",
        typeof employee.salary
      );

      setFormData({
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        department: employee.department || "",
        role: employee.role,
        salary: employee.salary ? employee.salary.toString() : "",
      });
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: EmployeeFormData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      jobTitle: formData.jobTitle,
      role: formData.role,
    };

    if (formData.department) {
      submitData.department = formData.department;
    }

    if (formData.salary) {
      submitData.salary = parseFloat(formData.salary);
    }

    if (!employee) {
      submitData.password = "defaultPassword123";
    }

    onSubmit(submitData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Job Title *
              </label>
              <select
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Job Title</option>
                {JOB_TITLES.map((title) => (
                  <option key={title} value={title}>
                    {title.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Optional"
                min={1000}
                step={100}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (Number(target.value) < 1000) target.value = "1000";
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-green-700 border border-green-300 rounded-md hover:bg-green-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {employee ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
