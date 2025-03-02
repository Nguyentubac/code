// src/layout/Layout.jsx
import React from 'react';
import styles from './Layout.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

function Layout() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.logo}>
        <h1>Logo</h1>
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Content 
        />
      </div>
    </div>
  );
}

export default Layout;

