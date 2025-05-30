import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş denemesi:", { username, password });
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/panel");
    } else {
      setError("Kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "#dc2626" }}>Admin Giriş</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())} 
            placeholder="Kullanıcı Adı"
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())} 
            placeholder="Şifre"
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default AdminLogin;