import styles from "../style/users/UserEdit.module.css";

export default function FormSelect({ label, value, onChange, options = [], required = false }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <select
                className={styles.select}
                value={value}
                onChange={onChange}
                required={required}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}