import React, { useState } from "react";
import UserReport from "./Report/UserReport";
import DriverReport from "./Report/DriverReport";
import TripReport from "./Report/TripReport";
import VehicleReport from "./Report/VehicleReport";
import styles from "./ReportManagement.module.css";

const ReportManagement = () => {
  const [activeTab, setActiveTab] = useState("user");

  const renderContent = () => {
    switch (activeTab) {
      case "user":
        return <UserReport />;
      case "driver":
        return <DriverReport />;
      case "trip":
        return <TripReport />;
      case "vehicle":
        return <VehicleReport />;
      default:
        return <UserReport />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button className={activeTab === "user" ? styles.active : ""} onClick={() => setActiveTab("user")}>
          User Report
        </button>
        <button className={activeTab === "driver" ? styles.active : ""} onClick={() => setActiveTab("driver")}>
          Driver Report
        </button>
        <button className={activeTab === "trip" ? styles.active : ""} onClick={() => setActiveTab("trip")}>
          Trip Report
        </button>
        <button className={activeTab === "vehicle" ? styles.active : ""} onClick={() => setActiveTab("vehicle")}>
          Vehicle Report
        </button>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default ReportManagement;
