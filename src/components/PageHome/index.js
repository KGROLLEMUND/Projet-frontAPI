import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import logo from "../../../public/img/logo.png";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const handleClick = (event) => {
    router.push("/auth/login");
  };

  return (
    <>
      <div className={styles.container}>
        <Title
          title="Bubble le site où trouver les meilleur freelance"
          Level="h1"
        />
        <p>refresh la page apres insciption </p>
      </div>
      <div className={styles.containerImage}>
        <img src={logo.src} alt="imgHome" />
      </div>
    </>
  );
};

export default Index;
