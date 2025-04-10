import React, { useEffect, useState } from "react";
import styles from "../Driver/EditDriverForm.module.css";
import { updateVehicle } from "../../../services/apiVehicle";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function EditVehicleForm({ selectedVehicle, closeModal, refreshVehicles }) {
  const [formData, setFormData] = useState(selectedVehicle);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    setFormData(selectedVehicle);
  }, [selectedVehicle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        status: formData.status ? 1 : 0,
      };
      await updateVehicle(formData.id, payload);
      refreshVehicles();
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Phương tiện đã được cập nhật thành công!',
        showConfirmButton: true
      });
    } catch (err) {
      console.error("Lỗi khi cập nhật phương tiện:", err);
      Swal.fire({
        icon: 'error',
        title: 'Cập nhật phương tiện thất bại!',
        text: 'Vui lòng thử lại sau!',
        showConfirmButton: true
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sửa Phương Tiện</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.scrollableForm}>
          <input type="text" name="plateNumber" value={formData.plateNumber || ""} onChange={handleChange} placeholder="Biển số" required />
          <input type="text" name="model" value={formData.model || ""} onChange={handleChange} placeholder="Model" required />
          <input type="text" name="color" value={formData.color || ""} onChange={handleChange} placeholder="Màu xe" required />
          <input type="text" name="ownerName" value={formData.ownerName || ""} onChange={handleChange} placeholder="Chủ sở hữu" required />
          <input type="text" name="chassisNumber" value={formData.chassisNumber || ""} onChange={handleChange} placeholder="Số khung" required />
          <input type="text" name="engineNumber" value={formData.engineNumber || ""} onChange={handleChange} placeholder="Số máy" required />
          <input type="date" name="registrationDate" value={formData.registrationDate?.slice(0, 10) || ""} onChange={handleChange} max={today} />
          <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry?.slice(0, 10) || ""} onChange={handleChange} />
          <input type="number" name="capacity" value={formData.capacity || ""} onChange={handleChange} placeholder="Sức chứa" />
          <input type="text" name="fuelType" value={formData.fuelType || ""} onChange={handleChange} placeholder="Nhiên liệu" />
          <input type="date" name="lastMaintenance" value={formData.lastMaintenance?.slice(0, 10) || ""} onChange={handleChange} />
          <input type="date" name="lastInspectionDate" value={formData.lastInspectionDate?.slice(0, 10) || ""} onChange={handleChange} />
          <input type="text" name="vehicleType" value={formData.vehicleType || ""} onChange={handleChange} placeholder="Loại xe" required />
          <input type="text" name="luxuryFeatures" value={formData.luxuryFeatures || ""} onChange={handleChange} placeholder="Tiện nghi cao cấp" />
          <input type="text" name="driverComfortFeatures" value={formData.driverComfortFeatures || ""} onChange={handleChange} placeholder="Tiện ích tài xế" />
          <input type="text" name="operatingArea" value={formData.operatingArea || ""} onChange={handleChange} placeholder="Khu vực hoạt động" />
          <input type="text" name="entertainmentSystem" value={formData.entertainmentSystem || ""} onChange={handleChange} placeholder="Hệ thống giải trí" />

          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="gpsInstalled" checked={formData.gpsInstalled || false} onChange={handleChange} />
            Có GPS
          </label>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="vipService" checked={formData.vipService || false} onChange={handleChange} />
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
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>Lưu</button>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
