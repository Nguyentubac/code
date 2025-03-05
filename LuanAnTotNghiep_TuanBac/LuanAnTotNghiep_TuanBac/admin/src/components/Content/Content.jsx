import React, { useState } from "react";

import TripManagement from "./Data/TripManagement";
import UserManagement from "./Data/UserManagement";
import VehicleManagement from "./Data/VehicleManagement";
import EmployeeManagement from "./Data/EmployeeManagement";
import EvaluationManagement from "./Data/EvaluationManagement";
import NotificationManagement from "./Data/NotificationManagement";
import PromotionManagement from "./Data/PromotionManagement";

import SideBar from "./SideBar/SideBar";
import styles from "./Content.module.css";

const Content = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const renderContent = () => {
    switch (selectedItem) {
      case "vehicle-management":
        return <VehicleManagement />;
      case "employee":
        return <EmployeeManagement />;
      case "user-management":
        return <UserManagement />;
      case "trip-management":
        return <TripManagement />;
      case "promotion-management":
        return <PromotionManagement />;
      case "notification-management":
        return <NotificationManagement />;
      case "evaluation-management":
        return <EvaluationManagement />;
      default:
        return <div className={styles.placeholder}>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className={styles.layout}>
      <SideBar setSelectedItem={setSelectedItem} />
      <div className={styles.contentContainer}>{renderContent()}</div>

    </div>
  );
};

export default Content;
