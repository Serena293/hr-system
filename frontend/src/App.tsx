import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Login from "./componets/Login";
import Profile from "./componets/Profile";
import ProtectedRoute from "./componets/ProtectedRoute";
import Dashboard from "./componets/Dashboard";
import EmployeesPage from "./componets/EmployeesPage";
import NotFound from "./componets/NotFound";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
         <main className="flex-1 flex flex-col bg-green-50 overflow-hidden">
          <div className="flex-grow flex flex-col">
            <Routes>
               <Route path="/" element={<Navigate to="/login" replace />} />              
               <Route
                  path="/dashboard/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <EmployeesPage />
                  </ProtectedRoute>
                }
              />
            
              <Route path="*" element={<NotFound/>} />
            </Routes>
             </div>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
