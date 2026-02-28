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
import UserCard from "../components/users/UserCard";
import Fab from "../components/ui/Fab";



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
          <UserCard
            key={user.id}
            user={user}
            loggedUserId={loggedUserId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLogout={handleLogout}
          />
        ))}
      </div>

      <Fab onClick={() => setIsModalOpen(true)}>+</Fab>
      
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
}