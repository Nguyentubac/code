import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ResponsiveContainer } from "recharts";
import { getRides } from "../../../services/apiRide";
import styles from "./RideBarChart.module.css";

const RideBarChart = () => {
  const [rides, setRides] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRides();
        setRides(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách chuyến đi:", err);
      }
    };
    fetchData();
  }, []);

  // Đếm số lượng chuyến mỗi ngày trong tháng được chọn
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const chartData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    count: 0,
  }));

  rides.forEach((ride) => {
    const date = new Date(ride.pickupTime);
    if (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    ) {
      const day = date.getDate();
      chartData[day - 1].count += 1;
    }
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📈 Biểu đồ chuyến đi theo ngày</h2>
      <div className={styles.filterPanel}>
        <label>Tháng:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <label>Năm:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={{ width: "100px" }}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2">
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RideBarChart;
