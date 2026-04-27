function Footer() {
  return (
    <footer className="bg-light text-center py-4 mt-auto">

      {/* Social Icons */}
      <div className="mb-3">
        <i className="fab fa-linkedin fa-lg mx-1" style={{ cursor: "pointer" }}></i>
        <i className="fab fa-instagram fa-lg mx-1" style={{ cursor: "pointer" }}></i>
        <i className="fab fa-facebook fa-lg mx-1" style={{ cursor: "pointer" }}></i>
      </div>

      {/* Copyright */}
      <div className="mb-2">
        © 2026 Wanderlust Private Limited
      </div>

      {/* Links */}
      <div>
        <span className="mx-2" style={{ cursor: "pointer" }}>Privacy</span>
        <span className="mx-2">·</span>
        <span className="mx-2" style={{ cursor: "pointer" }}>Terms</span>
      </div>

    </footer>
  );
}

export default Footer;