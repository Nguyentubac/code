import React, { useEffect, useState, forwardRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { getRides } from "../../../services/apiRide";
import styles from "./RideBarChart.module.css";

const RideBarChart = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRides = await getRides();

        const filtered = allRides.filter((r) => {
          const date = new Date(r.pickupTime);
          return (
            date.getMonth() + 1 === Number(month) &&
            date.getFullYear() === Number(year)
          );
        });

        const countsByDay = filtered.reduce((acc, ride) => {
          const day = new Date(ride.pickupTime).getDate();
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {});

        const daysInMonth = new Date(year, month, 0).getDate(); // ngày cuối cùng của tháng

        const chartData = Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return {
            day: `Ngày ${day}`,
            count: countsByDay[day] || 0,
          };
        });

        setData(chartData);
      } catch (err) {
        console.error("❌ Lỗi khi tải dữ liệu biểu đồ:", err);
      }
    };

    fetchData();
  }, [month, year]);

  return (
    <div className={styles.chartContainer} ref={ref}>
      <h3 className={styles.title}>📈 Biểu đồ số lượng chuyến đi theo ngày</h3>

      <div className={styles.filters}>
        <div>
          <label>Tháng: </label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Năm: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2020"
          />
        </div>
      </div>

      <BarChart width={460} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" interval={4} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#007bff">
          <LabelList dataKey="count" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
});

export default RideBarChart;
