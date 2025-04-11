import React, { useEffect, useState, forwardRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getPickupStats } from "../../../services/apiRide";
import styles from "./PickupStatsChart.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const PickupStatsChart = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getPickupStats(month, year);
        const chartData = result.map((item) => ({
          name: item.pickupLocation,
          value: item.percentage,
        }));
        setData(chartData);
      } catch (error) {
        console.error("❌ Lỗi tải biểu đồ thống kê:", error);
      }
    };
    fetchStats();
  }, [month, year]);

  return (
    <div className={styles.chartContainer} ref={ref}>
      <h3 className={styles.title}>🚏 Tỷ lệ điểm đón phổ biến theo tháng</h3>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Tháng:</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Năm:</label>
          <input
            type="number"
            min="2020"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
      </div>

      <PieChart width={450} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name} (${value}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
});

export default PickupStatsChart;
