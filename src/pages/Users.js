import { useEffect, useState } from "react";
import UserRepository from "../infrastructure/repositories/UserRepository";
import GetUsers from "../application/useCases/GetUsers";
import DeleteUser from "../application/useCases/DeleteUser";

export default function Users() {
  const [users, setUsers] = useState([]);

  const userRepository = new UserRepository();
  const getUsers = new GetUsers(userRepository);
  const deleteUserUseCase = new DeleteUser(userRepository);

  const loadUsers = async () => {
    const data = await getUsers.execute();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUserUseCase.execute(id);
    await loadUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div>
      <h2>Usuários</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
          <button onClick={() => handleDelete(user.id)}>
            Excluir
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ))}
    </div>
  );
}