import React from "react";
import styles from "./Logo.module.css";
import Image from "../../assets/react.svg";
const Logo = () => {
  return <div className={styles.logo}>
    <img src={Image} alt="Logo" />
  </div>;
};

export default Logo;

