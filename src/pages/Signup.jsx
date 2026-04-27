// Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Signup({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8080/auth/signup", formData);
    
    alert("Signup successful! Please login.");
    navigate("/login"); // go to login page
  } catch (err) {
    console.error(err);
    alert("Signup failed! Try again.");
  }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h2 className="text-center mb-4">SignUp on Wanderlust</h2>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

            <div>
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="d-flex justify-content-start">
              <button type="submit" className="btn btn-success" style={{ width: "120px" }}>
                Sign Up
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;