import React from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Report.module.css";

const VehicleReport = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Vehicles",
        data: [5, 10, 15, 20, 25],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Maintenance",
        data: [2, 3, 1, 4, 5],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.chart}>
        <Bar data={barData} />
      </div>
      <div className={styles.chart}>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default VehicleReport;
