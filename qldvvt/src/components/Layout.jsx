// src/layout/Layout.jsx
import React from 'react';
import styles from './Layout.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import PayrollContent from './PayrollContent';
import { useState } from "react";
import styles2 from './Layout.module.css';


function Layout() {
  const [activeContent, setActiveContent] = useState("Content");
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
      <div className={styles.sidebar}>
        <button onClick={() => setActiveContent("Content")}>Show Content A</button>
        <button onClick={() => setActiveContent("PayrollContent")}>Show Content B</button>
      </div>
      <div className={styles2.Content}>
        {activeContent === "Content" && <Content />}
        {activeContent === "PayrollContent" && <PayrollContent />}
      </div>
    </div>
  );
}

export default Layout;

