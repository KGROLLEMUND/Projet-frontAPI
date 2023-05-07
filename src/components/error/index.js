import Layout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import styles from "./index.module.scss";
import Button from "../UI/Button";

const getMessage = (code) => {
  switch (code) {
    case "404":
      return (
        <Layout title="404: Page Not Found">
          <div className={styles.body}>
            <span className={styles.head}>
              <b>ERROR</b>
            </span>
            <span className={styles.content}>
              <b>404:</b> Page Not Found
            </span>
            <div className={styles.link}>
              <Link href="/">
                <Button>
                  <span>Retour à la page home</span>
                </Button>
              </Link>
            </div>
          </div>
        </Layout>
      );

    default:
      break;
  }
};

const Error = ({ code }) => {
  return getMessage(code);
};

export default Error;
