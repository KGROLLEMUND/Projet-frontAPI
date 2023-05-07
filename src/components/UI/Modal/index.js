import React from "react";
import styles from "./index.module.scss";

const Index = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <button className={styles.modal__close} onClick={props.onClose}>
          X
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Index;
