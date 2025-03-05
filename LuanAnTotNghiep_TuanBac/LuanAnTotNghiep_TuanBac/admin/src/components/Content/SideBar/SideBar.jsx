import React from "react";
import styles from "./SideBar.module.css";

const SideBar = ({ setSelectedItem }) => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={() => setSelectedItem("vehicle-management")}>
          Vehicle Management
        </li>
        <li className={styles.menuItem} onClick={() => {
          console.log("Clicked: vehicle-management"); // Log khi click
          setSelectedItem("vehicle-management");
        }}>
          🚗 Vehicle Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("employee-managenent")}>
          Employee Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("user-management")}>
          User Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("trip-management")}>
          Trip Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("promotion-management")}>
          Promotion Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("notification-management")}>
          Notification Management
        </li>
        <li className={styles.menuItem} onClick={() => setSelectedItem("evaluation-management")}>
          Evaluation Management
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
