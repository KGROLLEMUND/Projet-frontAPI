import styles from "./index.module.scss";

const Index = ({ image, type, title, handleClick, btn, className }) => {
  if (image == null) {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={`${styles[btn]} ${styles[className]}`}>
        {title}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={`${styles[btn]} ${styles[className]}`}>
        <img src={image} className={styles.icon} alt="icon" />
        {title}
      </button>
    );
  }
};

export default Index;
