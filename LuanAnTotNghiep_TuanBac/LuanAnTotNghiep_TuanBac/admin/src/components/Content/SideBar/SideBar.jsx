import React, { useState } from "react";
import styles from "./SideBar.module.css";

const SideBar = ({ setSelectedItem }) => {
  const [activeItem, setActiveItem] = useState("vehicle-management"); // Mục đầu tiên mặc định

  const handleItemClick = (item) => {
    console.log("Clicked:", item); // Debug log
    setActiveItem(item);
    setSelectedItem(item);
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuItem} ${activeItem === "vehicle-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("vehicle-management")}
        >
          Vehicle Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "employee-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("employee-management")}
        >
          Employee Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "user-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("user-management")}
        >
          User Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "trip-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("trip-management")}
        >
          Trip Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "promotion-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("promotion-management")}
        >
          Promotion Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "notification-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("notification-management")}
        >
          Notification Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "report-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("report-management")}
        >
          Report Management
        </li>
        <li
          className={`${styles.menuItem} ${activeItem === "payment-management" ? styles.active : ""}`}
          onClick={() => handleItemClick("payment-management")}
        >
          Payment Managerment
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
