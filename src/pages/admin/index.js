import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.Container}>
        <Title title="Dashboard" Level="h1" />
      </div>
      <div className={styles.ContainerButton}>
        <Button
          type="submit"
          title="Users"
          className="btn__primary"
          handleClick={() => router.push("/admin/users")}
        />
        <Button
          type="submit"
          title="Missions"
          className="btn__primary"
          handleClick={() => router.push("/admin/Missions")}
        />
        <Button
          type="submit"
          title="Proposition"
          className="btn__primary"
          handleClick={() => router.push("/admin/Proposition")}
        />
        <Button
          type="submit"
          title="Skills"
          className="btn__primary"
          handleClick={() => router.push("/admin/Skills")}
        />
      </div>
    </>
  );
};

export default Index;