import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../style/users/Users.module.css";

export default function CreateUserModal({
    isOpen,
    onClose,
    onCreate,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("user");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate({ name, email, type, password });

        setName("");
        setEmail("");
        setType("user");
        setPassword("");

        onClose();
    };

    const handleClose = (e) => {
        onClose();
        setName("");
        setEmail("");
        setType("user");
        setPassword("");
    }

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className={styles.title}>Criar Usuário</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <select
                        className={styles.select}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className={styles.modalActions}>
                        <button type="submit" className={`${styles.button} ${styles.createButton}`}>
                            Criar
                        </button>

                        <button
                            type="button"
                            className={`${styles.button} ${styles.deleteButton}`}
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}