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
    try {
      const data = await getUsers.execute();
      setUsers(data);
      log.info("Usuários carregados:", data);
    } catch (err) {
      log.error("Erro ao carregar usuários:", err);
      toast.error("Não foi possível carregar usuários.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUserUseCase.execute(id);
      await loadUsers();
      log.info("Usuário deletado:", id);
    } catch (err) {
      toast.error("Erro ao deletar usuário.");
      log.error("Erro ao deletar usuário:", err);
    }
  };

  const handleLogout = () => {
    log.info('Usuário foi deslogado')
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  const handleEdit = (id) => {
    log.info("Usuário m processo de atualização:", id)
    navigate(`/users/${id}`);
  };

  const handleCreateUser = async (payload) => {
    try {
      await createUserUseCase.execute(payload);
      await loadUsers();
      toast.success("Usuário criado com sucesso!");
      log.info("Usuário criado:", payload);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Este email já está cadastrado!");
        log.warn("Tentativa de criar usuário com email duplicado:", payload.email);
      } else {
        toast.error("Ocorreu um erro ao criar o usuário.");
        log.error("Erro ao criar usuário:", error);
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