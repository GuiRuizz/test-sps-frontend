import styles from "../style/users/UserEdit.module.css";

export default function FormInput({ label, value, onChange, type = "text", required = false }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}