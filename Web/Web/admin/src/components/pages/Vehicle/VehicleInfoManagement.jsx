import React, { useEffect, useState } from "react";
import { getVehicles } from "../../../services/apiVehicle";
import VehicleAction from "./VehicleAction";
import styles from "./VehicleInfoManagement.module.css";
import VehicleDetailModal from "./VehicleDetailModal";

export default function VehicleInfoManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);
  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách phương tiện:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSelect = (id) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    console.log("🚮 Xoá các xe:", selectedVehicles);
  };

  const filteredVehicles = vehicles.filter((v) =>
    [v.plateNumber, v.model, v.vehicleType, v.ownerName]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.vehicleManagement}>
      <h2>📦 Quản lý thông tin phương tiện</h2>

      <VehicleAction
        refreshVehicles={fetchVehicles}
        selectedVehicles={selectedVehicles}
        vehicles={vehicles}
        onDelete={handleDelete}
      />

      <input
        type="text"
        placeholder="🔍 Tìm theo biển số, model, loại xe, chủ sở hữu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px 14px",
          marginBottom: "1rem",
          width: "320px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <div className={styles.tableContainer}>
        <table className={styles.excelTable}>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Biển số</th>
              <th>Loại xe</th>
              <th>Model</th>
              <th>Màu</th>
              <th>Số ghế</th>
              <th>Nhiên liệu</th>
              <th>GPS</th>
              <th>VIP</th>
              <th>Chủ xe</th>
              <th>Khu vực</th>
              <th>Chassis</th>
              <th>Engine</th>
              <th>Đăng ký</th>
              <th>Bảo hiểm</th>
              <th>Bảo dưỡng</th>
              <th>Kiểm định</th>
              <th>Hệ thống giải trí</th>
              <th>Tiện nghi sang</th>
              <th>Hỗ trợ tài xế</th>
              <th>Ngày tạo</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="24" style={{ textAlign: "center", padding: "1rem" }}>
                  Không có phương tiện phù hợp.
                </td>
              </tr>
            ) : (
              filteredVehicles.map((v) => (
                <tr key={v.id} onClick={() => setSelectedDetail(v)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(v.id)}
                      onChange={() => handleSelect(v.id)}
                    />
                  </td>
                  <td>{v.id}</td>
                  <td>{v.plateNumber}</td>
                  <td>{v.vehicleType}</td>
                  <td>{v.model}</td>
                  <td>{v.color}</td>
                  <td>{v.capacity}</td>
                  <td>{v.fuelType}</td>
                  <td>{v.gpsInstalled ? "✔️" : "❌"}</td>
                  <td>{v.vipService ? "✔️" : "—"}</td>
                  <td>{v.ownerName}</td>
                  <td>{v.operatingArea}</td>
                  <td>{v.chassisNumber}</td>
                  <td>{v.engineNumber}</td>
                  <td>{v.registrationDate?.slice(0, 10)}</td>
                  <td>{v.insuranceExpiry?.slice(0, 10)}</td>
                  <td>{v.lastMaintenance?.slice(0, 10)}</td>
                  <td>{v.lastInspectionDate?.slice(0, 10)}</td>
                  <td>{v.entertainmentSystem}</td>
                  <td>{v.luxuryFeatures}</td>
                  <td>{v.driverComfortFeatures}</td>
                  <td>{v.createdAt?.slice(0, 10)}</td>
                  <td>{v.updatedAt?.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedDetail && (
      <VehicleDetailModal vehicle={selectedDetail} onClose={() => setSelectedDetail(null)} />
    )}
    </div>
    
  );
}
