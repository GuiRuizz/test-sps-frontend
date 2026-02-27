import { useEffect, useState } from "react";
import UserRepository from "../infrastructure/repositories/UserRepository";
import GetUsers from "../application/useCases/GetUsers";
import DeleteUser from "../application/useCases/DeleteUser";
import styles from "../components/style/users/Users.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Usuários</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(user.id)}
              >
                Excluir
              </button>
              <button
                className={`${styles.button} ${styles.logoutButton}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}