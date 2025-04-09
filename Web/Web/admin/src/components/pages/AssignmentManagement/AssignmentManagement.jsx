import React, { useEffect, useState } from "react";
import { getDrivers } from "../../../services/apiDriver";
import { getVehicles } from "../../../services/apiVehicle";
import ExcelAssignmentUpload from "./ExcelAssignmentUpload";
import DownloadExcelTemplate from "./DownloadExcelTemplate";
import ExcelUploadModal from "../../Modal/ExcelUploadModal";
import AssignDriverForm from "./AssignmentForm";
import AssignmentList from "./AssignmentList";
import {
  getAssignments,
  assignDriverToVehicle,
  unassignDriver,
} from "../../../services/apiVehicleDriver";
import styles from "../AssignmentManagement/AssignmentManagement.module.css";

export default function AssignmentManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState("");
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [vehicleData, driverData, assignmentData] = await Promise.all([
        getVehicles(),
        getDrivers(),
        getAssignments(),
      ]);
      setVehicles(vehicleData);
      setDrivers(driverData);
      setAssignments(assignmentData);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("Không thể tải dữ liệu.");
    }
  };

  const filteredAssignments = assignments.filter((a) => {
    if (!filterDate) return true;
    const assignedDate = new Date(a.assignedAt).toISOString().split("T")[0];
    return assignedDate === filterDate;
  });
  const handleAssign = async () => {
    if (!selectedVehicleId || !selectedDriverId) {
      alert("Vui lòng chọn xe và tài xế.");
      return;
    }
    try {
      await assignDriverToVehicle({
        vehicleId: parseInt(selectedVehicleId),
        driverId: parseInt(selectedDriverId),
      });
      await fetchAll();
      setSelectedDriverId("");
      alert("Phân công thành công!");
    } catch (err) {
      alert("Lỗi khi phân công: " + (err.response?.data || err.message));
    }
  };

  const handleUnassign = async (id) => {
    if (!window.confirm("Bạn có chắc muốn hủy phân công này?")) return;
    try {
      await unassignDriver(id);
      await fetchAll();
    } catch (err) {
      alert("Lỗi khi hủy phân công. " + err);
    }
  };

  return (
    <div className={styles.assignmentContainer}>
      <h2>Phân Công Tài Xế Cho Xe</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.selectPanel}>

        <div className={styles.flex}>
          <div>
            <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
              <option value="">-- Chọn xe --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plateNumber} - {v.model}
                </option>
              ))}
            </select>

            <select value={selectedDriverId} onChange={(e) => setSelectedDriverId(e.target.value)}>
              <option value="">-- Chọn tài xế --</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className={styles.importSection}>
            <h4>Nhập phân công từ file Excel</h4>
            <DownloadExcelTemplate />
            <ExcelUploadModal onUploadSuccess={fetchAll} />
          </div>
        </div>
        <button onClick={handleAssign} className={styles.assignBtn}>
          Phân công
        </button>
      </div>

      <h3>Danh sách phân công hiện tại</h3>
      <table className={styles.assignmentTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Xe</th>
            <th>Tài xế</th>
            <th>Phân công lúc</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.vehicle?.plateNumber}</td>
              <td>{a.driver?.fullName}</td>
              <td>{new Date(a.assignedAt).toLocaleString()}</td>
              <td>{a.unassignedAt ? "Đã hủy" : "Đang hoạt động"}</td>
              <td>
                {!a.unassignedAt && (
                  <button onClick={() => handleUnassign(a.id)} className={styles.unassignBtn}>
                    Hủy
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
