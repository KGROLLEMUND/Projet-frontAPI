import Header from "@/components/partials/Header";
import styles from "./index.module.scss";
const Index = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Index;
