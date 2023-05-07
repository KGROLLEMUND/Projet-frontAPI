import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import logo from "../../../public/img/Bubble.png";

const Index = () => {
  return (
    <>
      <div className={styles.container}>
        <Title title="Bubble le site où trouver les meilleur freelance" Level="h1"/>
      </div>
      <div className={styles.containerImage}>
        <img src={logo.src} alt="imgHome" />
      </div>
    </>
  );
};

export default Index;