import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/?search=${search}`);
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold fs-4"
          style={{ cursor: "pointer", color: "#ff385c" }}
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-compass me-2"></i>
          Wanderlust
        </span>

        {/* Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars fs-4"></i>
        </button>

        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarContent">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="d-flex mx-auto my-3 my-lg-0"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <input
              className="form-control rounded-pill me-2 px-3"
              type="search"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="btn rounded-pill px-4"
              style={{
                background: "#ff385c",
                color: "white",
                border: "none",
              }}
            >
              Search
            </button>
          </form>

          {/* Right Side */}
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0">

            <span
              className="fw-medium"
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

            {currentUser ? (
              <>
                <span className="fw-bold">{currentUser.username}</span>
                <button className="btn btn-dark rounded-pill px-4" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-dark rounded-pill px-4"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn rounded-pill px-4"
                  style={{
                    background: "#ff385c",
                    color: "white",
                    border: "none",
                  }}
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