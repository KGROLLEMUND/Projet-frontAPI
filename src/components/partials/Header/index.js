import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import logo from "../../../../public/img/logo.png";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import { useContext } from "react";
import Button from "@/components/UI/Button";

const Index = () => {
  const { user, isLogged, logout } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(user);
  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/">
            <img src={logo.src} alt="Logo" />
          </a>
        </div>

        {isLogged ? (
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <Link href="#">Trouver un freelance</Link>
            </li>

            <li className={styles.navListItem}>
              <a href="/account/profil">Profil</a>
            </li>
            {isAdmin && (
              <li className={styles.navListItem}>
                <Link href="#">Admin Panel</Link>
              </li>
            )}
            <li className={styles.navListItem}>
              <span>Bonjour {user && user.firstName}</span>
            </li>
            <Button
              type="button"
              title="logout"
              btn="logout"
              className="logout__primary"
              handleClick={() => logout()}
            />
          </ul>
        ) : (
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <Link href="#">Trouver un freelance</Link>
            </li>
            <li className={styles.navListItem}>
              <Link href="/auth/login">Se connecter</Link>
            </li>
            <li className={styles.navListItem}>
              <Link href="/auth/register">Créer un compte</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Index;
