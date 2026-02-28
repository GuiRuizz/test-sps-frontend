import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRepository from "../infrastructure/repositories/UserRepository";
import GetUsers from "../application/useCases/GetUsers";
import DeleteUser from "../application/useCases/DeleteUser";
import CreateUser from "../application/useCases/CreateUser";
import styles from "../components/style/users/Users.module.css";
import { jwtDecode } from "jwt-decode";
import CreateUserModal from "../components/users/CreateUserModal";
import { toast } from "react-toastify";



export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userRepository = new UserRepository();
  const getUsers = new GetUsers(userRepository);
  const deleteUserUseCase = new DeleteUser(userRepository);
  const createUserUseCase = new CreateUser(userRepository);

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

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const handleCreateUser = async (payload) => {
    try {
      await createUserUseCase.execute(payload);
      await loadUsers();
      toast.success("Usuário criado com sucesso!"); // ✅ Sucesso
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Este email já está cadastrado!"); // ❌ Email duplicado
      } else {
        toast.error("Ocorreu um erro ao criar o usuário.");
        console.error(error);
      }
    }
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
                onClick={() => handleEdit(user.id)}
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

      <button className={styles.fab} onClick={() => setIsModalOpen(true)}>
        +
      </button>
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
}