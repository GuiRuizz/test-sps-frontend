import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRepository from "../infrastructure/repositories/AuthRepository";
import styles from "../components/style/signIn/SignIn.module.css";

const authRepository = new AuthRepository();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authRepository.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      navigate("/users");
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Senha</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}