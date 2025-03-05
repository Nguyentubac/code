import React, { useState } from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/Content/SideBar/SideBar";
import Content from "./components/Content/Content";
import styles from "./App.module.css";

const App = () => {
  const [selectedItem, setSelectedItem] = useState("notification-management");

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.mainContainer}>
        <SideBar setSelectedItem={setSelectedItem} />
        <Content selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default App;
