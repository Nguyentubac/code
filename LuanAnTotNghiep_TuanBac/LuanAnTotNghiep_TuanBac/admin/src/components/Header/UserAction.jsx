import React from "react";
import styles from "./UserAction.module.css";

const UserAction = () => {
  return (
    <div className={styles.userActions}>
      <span className={styles.icon}>🔔 <span className={styles.badge}>3</span></span>
      <a href="#" className={styles.link}>Account</a>
      <a href="#" className={styles.link}>Dropdown</a>
      <a href="#" className={styles.link}>Log out</a>
    </div>
  );
};

export default UserAction;
