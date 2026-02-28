import styles from "../style/users/Users.module.css";

export default function UserCard({ user, loggedUserId, onEdit, onDelete, onLogout }) {
    return (
        <div className={styles.userCard}>
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
                    onClick={() => onEdit(user.id)}
                >
                    Edit
                </button>
                {user.id === loggedUserId && (
                    <button
                        className={`${styles.button} ${styles.logoutButton}`}
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                )}
                <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => onDelete(user.id)}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}