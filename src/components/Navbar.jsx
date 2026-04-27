import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  // ✅ Search submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/?search=${search}`); // 🔥 redirect with query
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <div className="container-fluid">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
           Wanderlust
        </span>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* 🔥 SEARCH */}
          <form
            onSubmit={handleSearch}
            className="d-flex mx-auto"
            style={{ width: "40%" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search destinations"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-dark">
              Search
            </button>
          </form>

          {/* Right side */}
          <div className="d-flex align-items-center gap-3">

            {/* Protected Create */}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (!currentUser) {
                  alert("Login required!");
                  navigate("/login");
                } else {
                  navigate("/create");
                }
              }}
            >
              Airbnb your home
            </span>

            {/* Auth */}
            {currentUser ? (
              <>
                <span className="fw-bold">{currentUser.username}</span>
                <button className="btn btn-dark" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;