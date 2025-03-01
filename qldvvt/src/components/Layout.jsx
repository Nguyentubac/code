// src/layout/Layout.jsx
import React from 'react';

// Import 4 component
import Logo from './Logo';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

// Import CSS module
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.gridContainer}>
      {/* Logo */}
      <div className={styles.logo}>
        <Logo />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <Header />
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
}

export default Layout;
