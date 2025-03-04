import React from "react";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Middle from "./Middle";
import UserAction from "./UserAction";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Middle />
      <UserAction />
    </header>
  );
};

export default Header;
