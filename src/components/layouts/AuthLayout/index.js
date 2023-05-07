import React from "react";
import Image from "../../../../public/img/auth.png";
import styles from "./index.module.scss";
import Link from "next/link";
const Index = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left__part}>
        <div className={styles.form__wrapper}>{children}</div>
      </div>
      <div className={styles.right__part}>
        <div className={styles.wrapper}>
          <Link href="#">
            <img src={Image.src} alt="auth" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
