import styles from "./index.module.scss";

const Index = ({
  label,
  type,
  name,
  value,
  isRequired,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <input
        name={name}
        value={value}
        required={isRequired}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        autoComplete={
          type === "password"
            ? "current-password"
            : type === "email"
            ? "username"
            : undefined
        }
      />
    </div>
  );
};

export default Index;
