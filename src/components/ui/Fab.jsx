import styles from "../style/users/Users.module.css";

export default function Fab({ onClick, children }) {
    return (
        <button className={styles.fab} onClick={onClick}>
            {children}
        </button>
    );
}