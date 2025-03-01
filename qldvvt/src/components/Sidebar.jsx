// src/layout/Sidebar.jsx
import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <h3 className={styles.sidebarTitle}>Sidebar</h3>
      <ul className={styles.sidebarMenu}>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
      </ul>
    </div>
  );
}

export default Sidebar;
