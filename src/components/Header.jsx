import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      <nav>
    <Link to="garen/"><h1>Haber Sitesi</h1></Link>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="garen/about">Hakkında</Link>
          <Link to="garen/contact">İletişim</Link>
          {user ? (
            <>
              <span>Hoş geldin, {user.username}</span>
              <a className="logout" onClick={handleLogout}>Çıkış</a>
            </>
          ) : (
            <Link to="garen/login">Giriş</Link>
          )}
          <Link to="garen/admin">Admin</Link>
          <Link to="garen/admin/panel">Admin Panel</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;