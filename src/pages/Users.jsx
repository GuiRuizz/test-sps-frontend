import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRepository from "../infrastructure/repositories/UserRepository";
import GetUsers from "../application/useCases/GetUsers";
import DeleteUser from "../application/useCases/DeleteUser";
import styles from "../components/style/users/Users.module.css";
import { jwtDecode } from "jwt-decode";



export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const userRepository = new UserRepository();
  const getUsers = new GetUsers(userRepository);
  const deleteUserUseCase = new DeleteUser(userRepository);

  const token = localStorage.getItem("token");
  const loggedUserId = token ? jwtDecode(token).id : null;

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
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  const handleEdit = (user) => {
    navigate(`/users/edit`, { state: { user } });
  };

  const handleCreate = () => {
    navigate("/users/create");
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
              <span
                className={`${styles.roleBadge} ${user.type === "admin" ? styles.adminBadge : styles.userBadge
                  }`}
              >
                {user.type}
              </span>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              {user.id === loggedUserId && (
                <button
                  className={`${styles.button} ${styles.logoutButton}`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(user.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.fab} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}