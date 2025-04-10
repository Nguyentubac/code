import React, { useState } from "react";
import styles from "../User/AddUserForm.module.css";
import { addVehicle } from "../../../services/apiVehicle";
import Swal from "sweetalert2";

export default function AddVehicleForm({ closeModal, refreshVehicles }) {
  const [formData, setFormData] = useState({
    plateNumber: "",
    model: "",
    color: "",
    status: 1,
    lastMaintenance: "",
    ownerName: "",
    chassisNumber: "",
    engineNumber: "",
    registrationDate: "",
    insuranceExpiry: "",
    capacity: "",
    fuelType: "",
    gpsInstalled: false,
    lastInspectionDate: "",
    vehicleType: "",
    luxuryFeatures: "",
    driverComfortFeatures: "",
    vipService: false,
    operatingArea: "",
    entertainmentSystem: "",
  });

  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        status: formData.status ? 1 : 0,
      };
      await addVehicle(dataToSend);
      refreshVehicles();
      closeModal();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Thêm phương tiện thành công!",
        text: "Phương tiện đã được thêm vào hệ thống.",
      });
    } catch (error) {
      console.error("Lỗi khi thêm phương tiện:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Thêm phương tiện thất bại, vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Thêm Phương Tiện</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.scrollableForm}>
          <input
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            placeholder="Biển số"
            required
          />
          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            required
          />
          <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Màu xe"
            required
          />
          <input
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Chủ sở hữu"
            required
          />
          <input
            name="chassisNumber"
            value={formData.chassisNumber}
            onChange={handleChange}
            placeholder="Số khung"
            required
          />
          <input
            name="engineNumber"
            value={formData.engineNumber}
            onChange={handleChange}
            placeholder="Số máy"
            required
          />
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            max={today}
          />
          <input
            type="date"
            name="insuranceExpiry"
            value={formData.insuranceExpiry}
            onChange={handleChange}
          />
          <input
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Sức chứa"
          />
          <input
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            placeholder="Nhiên liệu"
          />
          <input
            type="date"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
          />
          <input
            type="date"
            name="lastInspectionDate"
            value={formData.lastInspectionDate}
            onChange={handleChange}
          />
          <input
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            placeholder="Loại xe"
            required
          />
          <input
            name="luxuryFeatures"
            value={formData.luxuryFeatures}
            onChange={handleChange}
            placeholder="Tiện nghi cao cấp"
          />
          <input
            name="driverComfortFeatures"
            value={formData.driverComfortFeatures}
            onChange={handleChange}
            placeholder="Tiện ích tài xế"
          />
          <input
            name="operatingArea"
            value={formData.operatingArea}
            onChange={handleChange}
            placeholder="Khu vực hoạt động"
          />
          <input
            name="entertainmentSystem"
            value={formData.entertainmentSystem}
            onChange={handleChange}
            placeholder="Hệ thống giải trí"
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="gpsInstalled"
              checked={formData.gpsInstalled}
              onChange={handleChange}
            />
            Có GPS
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="vipService"
              checked={formData.vipService}
              onChange={handleChange}
            />
            VIP Service
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="status"
              checked={formData.status === 1}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.checked ? 1 : 0,
                }))
              }
            />
            Hoạt động
          </label>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Đang thêm..." : "Lưu"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={closeModal}
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
