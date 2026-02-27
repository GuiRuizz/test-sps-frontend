import { useState } from "react";
import UserRepository from "../infrastructure/repositories/UserRepository";
import UpdateUser from "../application/useCases/UpdateUser";

export default function UserEdit({ user }) {
  const [name, setName] = useState(user.name);

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUser(userRepository);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUserUseCase.execute(user.id, {
      ...user,
      name
    });

    alert("Usuário atualizado com sucesso");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}