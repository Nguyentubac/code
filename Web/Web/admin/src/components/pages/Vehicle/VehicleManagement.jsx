import React, { useState } from "react";
import VehicleInfoManagement from "./VehicleInfoManagement";
import VehicleStatusManagement from "./VehicleStatusManagement";
import styles from "../User/UserManagement.module.css";
export default function VehicleManagement() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 Quản lý phương tiện</h2>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} ${activeTab === "info" ? styles.active : ""}`}
          onClick={() => setActiveTab("info")}
        >
          📦 Thông tin phương tiện
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "status" ? styles.active : ""}`}
          onClick={() => setActiveTab("status")}
        >
          🛠️ Trạng thái phương tiện
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "info" && <VehicleInfoManagement />}
        {activeTab === "status" && <VehicleStatusManagement />}
      </div>
    </div>
  );
}