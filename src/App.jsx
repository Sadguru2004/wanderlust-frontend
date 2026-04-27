import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ListingDetail from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Restore user from localStorage token on app mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);// { sub: email, iat, exp }
        setCurrentUser({ username: decoded.sub, email: decoded.sub });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/create" element={<CreateListing currentUser={currentUser} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/listing/:id" element={<ListingDetail currentUser={currentUser} />} />
            <Route path="/edit/:id" element={<EditListing currentUser={currentUser} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;