import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Login from "./componets/Login";
function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="bg-green-50 flex-grow container mx-auto px-4">
            <Routes>
              <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<h2>Profile Page</h2>} />
              {/* <Route path="/employees" element={<h2>Employees Page</h2>} /> */}
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
          </main>
         <Footer />       
          
        </div>
      </Router>
    </>
  );
}

export default App;
