import React from "react";
import styles from "./Sidebar.module.css"; // Sử dụng CSS Modules

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <ul>
        <li className={`${styles.navItem} ${styles.active}`} >
        <i className="fa fa-money" aria-hidden="true"></i>
          <span> Driver Information</span>
        </li>
        <li className={`${styles.navItem} ${styles.active}`} >
          <i className="fa fa-money" aria-hidden="true"></i>
          <span> Payroll</span>
        </li>
        <li className={`${styles.navItem} ${styles.active}`}>
          <i className="fa fa-file-text" aria-hidden="true"></i>
          <span> Reports</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
