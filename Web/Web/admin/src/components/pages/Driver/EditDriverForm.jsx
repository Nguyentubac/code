import React, { useEffect, useState } from "react";
import styles from "../Driver/EditDriverForm.module.css";
import { updateDriver } from "../../../services/apiDriver"; // Gọi API cập nhật

export default function EditDriverForm({ selectedDriver, closeModal, refreshDrivers }) {
  const [formData, setFormData] = useState(selectedDriver);

  useEffect(() => {
    setFormData(selectedDriver);
  }, [selectedDriver]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDriver(formData.id, formData);
      refreshDrivers();
      closeModal();
    } catch (err) {
      console.error("Lỗi cập nhật tài xế:", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sửa Thông Tin Tài Xế</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="id" value={formData.id || ""} onChange={handleChange} placeholder="Id" required disabled/>
        <input type="text" name="fullName" value={formData.fullName || ""} onChange={handleChange} placeholder="Họ và tên" required />
        <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} placeholder="Số điện thoại" required />
        <input type="text" name="address" value={formData.address || ""} onChange={handleChange} placeholder="Địa chỉ" />
        <input type="text" name="nationalID" value={formData.nationalID || ""} onChange={handleChange} placeholder="CMND/CCCD" />
        <input type="date" name="nationalIDIssuedDate" value={formData.nationalIDIssuedDate?.slice(0, 10) || ""} onChange={handleChange} />
        <input type="text" name="nationalIDIssuedPlace" value={formData.nationalIDIssuedPlace || ""} onChange={handleChange} placeholder="Nơi cấp" />
        <input type="date" name="birthDate" value={formData.birthDate?.slice(0, 10) || ""} onChange={handleChange} />
        <input type="text" name="licenseType" value={formData.licenseType || ""} onChange={handleChange} placeholder="Loại bằng lái" />
        <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate?.slice(0, 10) || ""} onChange={handleChange} />
        <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber || ""} onChange={handleChange} placeholder="Số tài khoản ngân hàng" />
        <input type="text" name="bankName" value={formData.bankName || ""} onChange={handleChange} placeholder="Ngân hàng" />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="status"
            checked={formData.status === "Active"}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.checked ? "Active" : "Inactive",
              })
            }
          />
          Hoạt động
        </label>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>Lưu</button>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
