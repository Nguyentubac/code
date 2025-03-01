// src/components/Logo.jsx
import React from 'react';
import styles from './Logo.module.css';
import logo from '../assets/anh1.png';
function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img 
        src={logo} 
        alt="Logo" 
        className={styles.logoImage} 
      />
    </div>
  );
}

export default Logo;