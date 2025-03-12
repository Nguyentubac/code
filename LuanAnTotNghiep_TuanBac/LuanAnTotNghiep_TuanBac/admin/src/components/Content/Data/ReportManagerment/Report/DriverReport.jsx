import React from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Report.module.css";

const DriverReport = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Drivers",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Completed Trips",
        data: [100, 120, 140, 160, 180],
        borderColor: "rgba(75, 192, 192, 1)",
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

export default DriverReport;
