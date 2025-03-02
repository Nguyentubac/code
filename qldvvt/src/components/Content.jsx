// src/layout/Content.jsx
import React from 'react';
import styles from './Content.module.css';
import Tabpage from './Tabpage';
function Content() {
  return (
    <div className={styles.contentContainer}>
      <Tabpage/>
    </div>
  );
}

export default Content;

  