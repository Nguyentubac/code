import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import SideBar from "./Content/SideBar/SideBar";
import Content from "./Content/Content";
import styles from "../../src/App.module.css";
import Login from "./Content/Data/LoginManagerment/Login";

const Dasboard = () => {
  return (
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.mainContainer}>
          <SideBar/>
          <Routes>
            <Route path="/Dasboard" element={<Content/>} ></Route>
            <Route path="/Login" element={<Login/>} ></Route>
          </Routes>
        </div>
      </div>
  );
};

export default Dasboard;