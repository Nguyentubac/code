import React from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Report.module.css";

const TripReport = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Trips",
        data: [200, 250, 300, 350, 400],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Cancellations",
        data: [5, 8, 6, 7, 9],
        borderColor: "rgba(255, 159, 64, 1)",
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

export default TripReport;
