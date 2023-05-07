import styles from "./index.module.scss";
import Loader from "../../../../public/img/loader.gif";

const Index = ({ isLoad }) => {
  return (
    <>
      {isLoad && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <img src={Loader.src} alt="loader" />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
