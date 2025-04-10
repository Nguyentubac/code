import React from "react";
import styles from "./VehicleDetailModal.module.css";

export default function VehicleDetailModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>🚘 Thông tin chi tiết phương tiện</h2>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        <div className={styles.content}>
          <p><strong>Biển số:</strong> {vehicle.plateNumber}</p>
          <p><strong>Loại xe:</strong> {vehicle.vehicleType}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Màu sắc:</strong> {vehicle.color}</p>
          <p><strong>Số ghế:</strong> {vehicle.capacity}</p>
          <p><strong>Nhiên liệu:</strong> {vehicle.fuelType}</p>
          <p><strong>Trạng thái:</strong> {vehicle.status}</p>
          <p><strong>Chủ sở hữu:</strong> {vehicle.ownerName}</p>
          <p><strong>Khu vực hoạt động:</strong> {vehicle.operatingArea}</p>
          <p><strong>Chassis:</strong> {vehicle.chassisNumber}</p>
          <p><strong>Engine:</strong> {vehicle.engineNumber}</p>
          <p><strong>Đăng ký:</strong> {vehicle.registrationDate?.slice(0, 10)}</p>
          <p><strong>Bảo hiểm:</strong> {vehicle.insuranceExpiry?.slice(0, 10)}</p>
          <p><strong>Bảo dưỡng:</strong> {vehicle.lastMaintenance?.slice(0, 10)}</p>
          <p><strong>Kiểm định:</strong> {vehicle.lastInspectionDate?.slice(0, 10)}</p>
          <p><strong>GPS:</strong> {vehicle.gpsInstalled ? "✔️" : "❌"}</p>
          <p><strong>Giải trí:</strong> {vehicle.entertainmentSystem}</p>
          <p><strong>Sang trọng:</strong> {vehicle.luxuryFeatures}</p>
          <p><strong>Hỗ trợ tài xế:</strong> {vehicle.driverComfortFeatures}</p>
          <p><strong>VIP:</strong> {vehicle.vipService ? "✔️" : "—"}</p>
          <p><strong>Ngày tạo:</strong> {vehicle.createdAt?.slice(0, 10)}</p>
          <p><strong>Cập nhật:</strong> {vehicle.updatedAt?.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}
