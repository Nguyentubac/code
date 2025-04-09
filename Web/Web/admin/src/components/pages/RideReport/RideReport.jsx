import React, { useEffect, useState } from "react";
import { getRides } from "../../../services/apiRide";
import styles from "./RideReport.module.css";

export default function RideReport() {
  const [rides, setRides] = useState([]);

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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 Báo cáo thời gian xuất bến & đến bến</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Xe</th>
            <th>Tài xế</th>
            <th>Điểm đón</th>
            <th>Điểm trả</th>
            <th>Giờ xuất bến</th>
            <th>Giờ đến bến</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.vehicleDriverId}</td>
              <td>{ride.userId}</td>
              <td>{ride.pickupLocation}</td>
              <td>{ride.dropoffLocation}</td>
              <td>
                {ride.pickupTime
                  ? new Date(ride.pickupTime).toLocaleString()
                  : "—"}
              </td>
              <td>
                {ride.dropoffTime
                  ? new Date(ride.dropoffTime).toLocaleString()
                  : "—"}
              </td>
              <td>
                {ride.status === 0
                  ? "Scheduled"
                  : ride.status === 1
                  ? "Completed"
                  : "Cancelled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
