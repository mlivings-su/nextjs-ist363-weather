import styles from "./Button.module.scss";

const Button = ({ backrgoundColor, clcikHandler, label }) => {
  return (
    <button
      className={styles.btn}
      onclcik={clcikHandler}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
