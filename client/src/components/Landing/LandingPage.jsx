import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/home");
  };

  return (
    <div className={styles.landing}>
      <h1 className={styles.bienvenido}>Bienvenido</h1>
      <div className={styles.background} onClick={handleButtonClick}>
        <button className={styles.button}>🔎</button>
      </div>
    </div>
  );
}
