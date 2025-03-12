import React, { useState } from "react";

import TripManagement from "./Data/TripManagement/TripManagement";
import UserManagement from "./Data/UserManagerment/UserManagement";
import VehicleManagement from "./Data/VehicleManagerment/VehicleManagement";
import EmployeeManagement from "./Data/EmployeeManagerment/EmployeeManagement";
import NotificationManagement from "./Data/NotificationManagerment/NotificationManagement";
import PromotionManagement from "./Data/PromotionManagerment/PromotionManagement";

import SideBar from "./SideBar/SideBar";
import styles from "./Content.module.css";
import PaymentManagerment from "./Data/PaymentManagerment/PaymentManagerment";
import ReportManagement from "./Data/ReportManagerment/ReportManagement";

const Content = () => {
  const [selectedItem, setSelectedItem] = useState('vehicle-management');
  console.log("Rendering Content for:", selectedItem);
  const renderContent = () => {
    switch (selectedItem) {
      case "vehicle-management":
        return <VehicleManagement />;
      case "employee":
        return <EmployeeManagement />;
      case "report-management":
        return <ReportManagement/>;
      case "user-management":
        return <UserManagement />;
      case "trip-management":
        return <TripManagement />;
      case "promotion-management":
        return <PromotionManagement />;
      case "notification-management":
        return <NotificationManagement />;
      case "payment-management":
        return <PaymentManagerment/>;
      default:
        return <div className={styles.placeholder}>Select a section from the sidebar.</div>;
    }
  };

  return (
      <div className={styles.contentContainer}>
        <div><SideBar setSelectedItem={setSelectedItem} /></div>
        <div className={styles.divContent}>{renderContent()}</div>
      </div>
  );
};

export default Content;
