import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import styles from "./AssignmentManagement.module.css";
import {
  getAssignments,
  assignDriverToVehicle,
  unassignDriver,
} from "../../../services/apiVehicleDriver";
import { getDrivers } from "../../../services/apiDriver";
import { getVehicles } from "../../../services/apiVehicle";
import DownloadExcelTemplate from "./DownloadExcelTemplate";
import ExcelAssignmentUpload from "./ExcelAssignmentUpload";

const AssignmentForm = () => {
  const [assignments, setAssignments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const fetchAssignments = async () => {
    try {
      const data = await getAssignments(filterDate); // filter theo ngày
      setAssignments(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phân công:", error);
    }
  };

  const fetchVehiclesAndDrivers = async () => {
    try {
      const [vehicleRes, driverRes] = await Promise.all([
        getVehicles(),
        getDrivers(),
      ]);
      setVehicles(vehicleRes);
      setDrivers(driverRes);
    } catch (error) {
      console.error("❌ Lỗi khi tải xe/tài xế:", error);
    }
  };

  useEffect(() => {
    fetchVehiclesAndDrivers();
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [filterDate]);

  const handleAssign = async () => {
    if (!selectedVehicleId || !selectedDriverId || !filterDate) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng chọn đầy đủ thông tin!",
        text: "Bạn cần chọn xe, tài xế và ngày phân công.",
      });
      return;
    }

    try {
      await assignDriverToVehicle({
        vehicleId: selectedVehicleId,
        driverId: selectedDriverId,
        date: filterDate,
      });
      Swal.fire({
        icon: "success",
        title: "Phân công thành công!",
        text: "Tài xế đã được phân công cho xe thành công.",
      });
      fetchAssignments();
    } catch (error) {
      console.error("Lỗi khi phân công:", error);
      Swal.fire({
        icon: "error",
        title: "Phân công thất bại!",
        text: "Có lỗi xảy ra khi phân công tài xế.",
      });
    }
  };

  const handleUnassign = async (assignmentId) => {
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Bạn có chắc muốn huỷ phân công này?",
      showCancelButton: true,
      confirmButtonText: "Huỷ phân công",
      cancelButtonText: "Hủy bỏ",
    });

    if (confirmResult.isConfirmed) {
      try {
        await unassignDriver(assignmentId);
        Swal.fire({
          icon: "success",
          title: "Đã huỷ phân công",
          text: "Phân công tài xế đã bị huỷ thành công.",
        });
        fetchAssignments();
      } catch (error) {
        console.error("Lỗi khi huỷ phân công:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi khi huỷ phân công",
          text: "Có lỗi xảy ra khi huỷ phân công tài xế.",
        });
      }
    }
  };

  return (
    <div className={styles.assignmentForm}>
      <h2>Phân công tài xế</h2>

      <div className={styles.flexSplit}>
        {/* ✅ Cột bên trái: Form phân công */}
        <div className={styles.assignmentPanel}>
          <div className={styles.controls}>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
            >
              <option value="">-- Chọn xe --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plateNumber} - {v.model}
                </option>
              ))}
            </select>

            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
            >
              <option value="">-- Chọn tài xế --</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            <button onClick={handleAssign}>Phân công</button>
          </div>
        </div>

        {/* ✅ Cột bên phải: Excel Import */}
        <div className={styles.importSection}>
          <h4>📥 Nhập phân công từ Excel</h4>
          <DownloadExcelTemplate />
          <ExcelAssignmentUpload onUploadSuccess={fetchAssignments} />
        </div>
      </div>

      {/* Danh sách phân công */}
      <div className={styles.list}>
        <h4>Danh sách đã phân công</h4>
        {assignments.length === 0 ? (
          <p>Không có phân công nào</p>
        ) : (
          <ul>
            {assignments.map((a) => {
              // Chuyển đổi ngày từ yyyy-mm-dd thành dd/mm/yyyy
              const date = new Date(a.date);
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
              
              return (
                <li key={a.id}>
                  Xe: {a.vehicle?.plateNumber || a.vehicleId} - Tài xế:{" "}
                  {a.driver?.fullName || a.driverId} - Ngày: {formattedDate}
                  <button onClick={() => handleUnassign(a.id)}>Huỷ</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssignmentForm;
