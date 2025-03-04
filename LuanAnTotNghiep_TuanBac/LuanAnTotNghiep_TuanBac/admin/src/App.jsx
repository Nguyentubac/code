import React from "react";
import Header from "../src/components/Header/Header";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
    </div>
  );
};

export default App;