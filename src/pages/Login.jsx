import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({
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
      const res = await axios.post(
        "https://wanderlust-backend-1-7s0n.onrender.com/auth/login",
        formData
      );

      const token = res.data;

      localStorage.setItem("token", token);

      const decoded = jwt_decode(token);


      setCurrentUser({
        username: decoded.username, // ✅ now correct
        email: decoded.sub
      });

      alert("Login successful!");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />

            <button className="btn btn-success" style={{ width: "120px" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;