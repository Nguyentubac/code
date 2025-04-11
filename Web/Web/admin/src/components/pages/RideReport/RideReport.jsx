import React, { useEffect, useState } from "react";
import { getRides } from "../../../services/apiRide";
import Swal from 'sweetalert2';
import styles from "./RideReport.module.css";
import RideBarChart from "./RideBarChart";
import PickupStatsChart from "./PickupStatsChart";

import { useRef } from "react"; //XLSX
import { exportReportWithCharts } from "../../../services/exportReportWithCharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default function RideReport() {
  const [rides, setRides] = useState([]);
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());

  const barChartRef = useRef();
  const pieChartRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRides();
        setRides(data);
        Swal.fire({
          title: 'Dữ liệu đã được tải thành công!',
          icon: 'success',
          confirmButtonText: 'Đóng'
        });
      } catch (err) {
        console.error("Lỗi khi lấy danh sách chuyến đi:", err);
        Swal.fire({
          title: 'Lỗi!',
          text: 'Không thể tải dữ liệu chuyến đi. Vui lòng thử lại.',
          icon: 'error',
          confirmButtonText: 'Đóng'
        });
      }
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    if (filteredRides.length === 0) {
      Swal.fire("Không có dữ liệu để xuất!", "", "info");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredRides.map((ride) => ({
        "ID": ride.id,
        "Xe": ride.vehicleDriverId,
        "Tài xế": ride.userId,
        "Điểm đón": ride.pickupLocation,
        "Điểm trả": ride.dropoffLocation,
        "Giờ xuất bến": ride.pickupTime
          ? new Date(ride.pickupTime).toLocaleString()
          : "—", // ✅ Dấu phẩy bắt buộc ở đây
        "Trạng thái":
          ride.status === 0
            ? "Đã lên lịch"
            : ride.status === 1
              ? "Hoàn thành"
              : "Đã huỷ",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo chuyến đi");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileName = `BaoCaoChuyenDi_${monthFilter}-${yearFilter}.xlsx`;
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, fileName);
  };

  const filteredRides = rides.filter((ride) => {
    const time = new Date(ride.pickupTime);
    return (
      time.getMonth() + 1 === Number(monthFilter) &&
      time.getFullYear() === Number(yearFilter)
    );
  });


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 Báo cáo thời gian xuất bến & đến bến</h2>

      <div className={styles.chartWrapper}>
        <div className={styles.chartBox}>
          <RideBarChart ref={barChartRef} />

        </div>
        <div className={styles.chartBox}>
          <PickupStatsChart ref={pieChartRef} />
        </div>
      </div>

      <div className={styles.filterPanel}>
        <select
          className={styles.filterSelect}
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - 2 + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Xe</th>
            <th>Tài xế</th>
            <th>Điểm đón</th>
            <th>Điểm trả</th>
            <th>Giờ xuất bến</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filteredRides.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                Không có chuyến đi nào trong tháng/năm đã chọn.
              </td>
            </tr>
          ) : (
            filteredRides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.vehicleDriverId}</td>
                <td>{ride.userId}</td>
                <td>{ride.pickupLocation}</td>
                <td>{ride.dropoffLocation}</td>
                <td>
                  {ride.pickupTime
                    ? new Date(ride.pickupTime).toLocaleDateString('en-GB')
                    : "—"}
                </td>
                <td>
                  {ride.status === 0
                    ? "Đã lên lịch"
                    : ride.status === 1
                      ? "Hoàn thành"
                      : "Đã huỷ"}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <button onClick={() => exportReportWithCharts({ chartRefs: [barChartRef, pieChartRef], data: filteredRides })}>
          📥 Xuất Excel đầy đủ
        </button>
      </table>
    </div>
  );
}
