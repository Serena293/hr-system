import { useState, useEffect } from "react";
import api from "../lib/axios";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department?: string;
  role: "admin" | "employee";
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/employee/profile");
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              First Name
            </label>
            <div className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-50 text-gray-700">
              {profile?.firstName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Last Name
            </label>
            <div className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-50 text-gray-700">
              {profile?.lastName}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Email
            </label>
            <div className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-50 text-gray-700">
              {profile?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Job Title
            </label>
            <div className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-50 text-gray-700">
              {profile?.jobTitle}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Department
            </label>
            <div className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-50 text-gray-700">
              {profile?.department || "Not specified"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Role
            </label>
            <div className={`w-full px-3 py-2 border rounded-md ${
              profile?.role === "admin" 
                ? "border-green-500 bg-green-100 text-green-800" 
                : "border-green-300 bg-green-50 text-gray-700"
            }`}>
              {profile?.role?.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-green-200">
          <p className="text-sm text-green-600">
            Profile information is read-only. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;