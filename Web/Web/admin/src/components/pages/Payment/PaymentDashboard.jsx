import React, { useEffect, useState } from "react";
import { getPayments } from "../../../services/apiPayment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";
import styles from "./PaymentDashboard.module.css";

export default function PaymentDashboard() {
  const [payments, setPayments] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  const paymentLabels = ["COD", "Momo", "VNPay", "Khác"];

  useEffect(() => {
    fetchPayments();
  }, [month, year]);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      const filtered = data.filter((p) => {
        const d = new Date(p.createdAt);
        return d.getMonth() + 1 === Number(month) && d.getFullYear() === Number(year);
      });

      const totalAmount = filtered
        .filter((p) => p.paymentStatus === 1)
        .reduce((sum, p) => sum + (p.totalAmount || 0), 0);
      setTotal(totalAmount);

      const summary = [0, 1, 2].map((method) => {
        const methodPayments = filtered.filter((p) => p.paymentMethod === method && p.paymentStatus === 1);
        const sum = methodPayments.reduce((acc, p) => acc + (p.totalAmount || 0), 0);
        return {
          method: paymentLabels[method],
          total: sum,
        };
      });

      setChartData(summary);
    } catch (err) {
      console.error("❌ Lỗi thống kê thanh toán:", err);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>📊 Thống kê thanh toán theo phương thức</h2>

      <div className={styles.filters}>
        <label>
          Tháng:
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>

        <label>
          Năm:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2020"
          />
        </label>
      </div>

      <h3 className={styles.total}>Tổng doanh thu tháng: {total.toLocaleString()}₫</h3>

      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="method" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#82ca9d">
          <LabelList dataKey="total" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
}