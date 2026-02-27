import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      navigate("/users");
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{ marginTop: "15px", width: "100%" }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}