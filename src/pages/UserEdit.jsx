import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import UserRepository from "../infrastructure/repositories/UserRepository";
import UpdateUser from "../application/useCases/UpdateUser";
import styles from "../components/style/users/UserEdit.module.css";
import { toast } from "react-toastify";

import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";

export async function userLoader({ params }) {
  const repository = new UserRepository();
  return await repository.getUserById(params.userId);
}

export default function UserEdit() {
  const navigate = useNavigate();
  const user = useLoaderData();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(user.type);

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUser(userRepository);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserUseCase.execute(user.id, { name, email, type });
      toast.success("Usuário atualizado com sucesso!");
      navigate("/users");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Este email já está cadastrado!");
      } else {
        toast.error("Erro ao atualizar usuário");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Usuário</h2>

      <form onSubmit={handleSubmit}>
        <FormInput label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormSelect
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
          required
        />

        <button type="submit" className={styles.button}>
          Salvar
        </button>
      </form>
    </div>
  );
}