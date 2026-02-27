import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import UserRepository from "../infrastructure/repositories/UserRepository";
import UpdateUser from "../application/useCases/UpdateUser";

export async function userLoader({ params }) {
  const repository = new UserRepository();
  return await repository.getById(params.userId);
}

export default function UserEdit() {
  const user = useLoaderData(); // <-- vem do loader
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [type, setType] = useState(user?.type || "user");

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUser(userRepository);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserUseCase.execute(user.id, {
        name,
        email,
        type,
      });

      alert("Usuário atualizado com sucesso");
      navigate("/users");
    } catch (error) {
      alert("Erro ao atualizar usuário");
    }
  };

  return (
    <div>
      <h2>Editar Usuário</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}