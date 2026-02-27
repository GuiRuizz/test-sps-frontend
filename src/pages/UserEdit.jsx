import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UserRepository from "../infrastructure/repositories/UserRepository";
import UpdateUser from "../application/useCases/UpdateUser";
import styles from "../components/style/users/UserEdit.module.css";

export default function UserEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user; // usuário passado do Users.jsx

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [type, setType] = useState(user?.type || "user");

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUser(userRepository);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserUseCase.execute(user.id, { name, email, type });
      alert("Usuário atualizado com sucesso");
      navigate("/users");
    } catch (error) {
      alert("Erro ao atualizar usuário");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Usuário</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <label className={styles.label}>Tipo</label>
          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Salvar
        </button>
      </form>
    </div>
  );
}