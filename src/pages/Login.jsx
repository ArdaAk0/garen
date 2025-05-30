import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/");
    } else {
      setError("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "#dc2626" }}>Giriş Yap</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <i>👤</i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
          />
        </div>
        <div className="input-group">
          <i>🔒</i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;