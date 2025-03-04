// src/layout/Content.jsx
import React from 'react';
import styles from './Content.module.css';
import Tabpage from './Tabpage';
function Content() {
  return (
    <div className={styles.contentContainer}>
      <h3>PayrollContent</h3>
      <Tabpage/>
    </div>
  );
}

export default Content;

  