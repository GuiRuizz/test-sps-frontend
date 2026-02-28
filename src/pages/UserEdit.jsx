import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import UserRepository from "../infrastructure/repositories/UserRepository";
import UpdateUser from "../application/useCases/UpdateUser";
import styles from "../components/style/users/UserEdit.module.css";
import { ToastContainer, toast } from 'react-toastify';

export async function userLoader({ params }) {
  const repository = new UserRepository();
  return await repository.getUserById(params.userId);
}

export default function UserEdit() {
  const navigate = useNavigate();
  const user = useLoaderData(); // ✅ agora vem do loader

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(user.type);

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUser(userRepository);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserUseCase.execute(user.id, { name, email, type });
      toast.success('Usuário atualizado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/users");
    } catch (error) {
      toast.error('Erro ao atualizar usuário', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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