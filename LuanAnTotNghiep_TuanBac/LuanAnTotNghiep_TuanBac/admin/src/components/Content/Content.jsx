import React, { useState } from "react";

import TripManagement from "./Data/TripManagement";
import UserManagement from "./Data/UserManagement";
import VehicleManagement from "./Data/VehicleManagement";
import EmployeeManagement from "./Data/EmployeeManagement";
import EvaluationManagement from "./Data/ReportManagement";
import NotificationManagement from "./Data/NotificationManagement";
import PromotionManagement from "./Data/PromotionManagement";

import SideBar from "./SideBar/SideBar";
import styles from "./Content.module.css";
import PaymentManagerment from "./Data/PaymentManagerment";
import ReportManagement from "./Data/ReportManagement";

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
      case "evaluation-management":
        return <EvaluationManagement />;
      case "payment-management":
        return <PaymentManagerment/>;
      default:
        return <div className={styles.placeholder}>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className={styles.layout}>
      
      <div className={styles.contentContainer}>
        <div><SideBar setSelectedItem={setSelectedItem} /></div>
        <div className={styles.divContent}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Content;
