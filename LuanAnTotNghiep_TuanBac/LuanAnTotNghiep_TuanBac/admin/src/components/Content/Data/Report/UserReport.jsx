import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Report.module.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const UserReport = () => {
  // Danh sách tháng và năm
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const years = [2022, 2023, 2024, 2025];

  // Mặc định tháng & năm hiện tại
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // State để lưu tháng & năm được chọn
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dataByYear, setDataByYear] = useState({}); // Dữ liệu từ JSON

  // Fetch dữ liệu từ Data.json
  useEffect(() => {
    fetch("./src/components/Content/Data/Data.json") // Đường dẫn file JSON
      .then((response) => response.json())
      .then((data) => {
        setDataByYear(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Xử lý khi chọn tháng/năm mới
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleYearChange = (event) => setSelectedYear(parseInt(event.target.value));

  // Lấy dữ liệu của tháng & năm được chọn từ JSON
  const selectedData = dataByYear[selectedYear]?.[selectedMonth] || [];
  const labels = selectedData.map((_, i) => `Day ${i + 1}`);

  // Tổng khách hàng của tháng
  const totalSelectedUsers = selectedData.reduce((a, b) => a + b, 0);
  const totalCurrentUsers = dataByYear[currentYear]?.[currentMonth]?.reduce((a, b) => a + b, 0) || 0;

  // Dữ liệu biểu đồ
  const barData = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: selectedData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Active Users",
        data: selectedData.map((d) => d + Math.floor(Math.random() * 10) - 5),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.reportContainer}>
      {/* Dropdown chọn tháng và năm */}
      <div className={styles.filterContainer}>
        <label htmlFor="monthSelect">Select Month: </label>
        <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="yearSelect">Select Year: </label>
        <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.contentContainer}>
        {/* Biểu đồ */}
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <Bar data={barData} />
          </div>
          <div className={styles.chart}>
            <Line data={lineData} />
          </div>
        </div>

        {/* So sánh tổng khách mới */}
        <div className={styles.comparisonContainer}>
          <h3>Comparison</h3>
          <p><strong>{selectedMonth} {selectedYear}:</strong> {totalSelectedUsers} new users</p>
          <p><strong>{currentMonth} {currentYear} (Current Month):</strong> {totalCurrentUsers} new users</p>
          <p><strong>Difference:</strong> {totalSelectedUsers - totalCurrentUsers} users</p>
        </div>
      </div>
    </div>
  );
};

export default UserReport;
