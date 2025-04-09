import React, { useState } from "react";
import styles from "../User/AddUserForm.module.css"; 
import { addDriver } from "../../../services/apiDriver";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function AddDriverForm({ closeModal, refreshDrivers }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    nationalID: "",
    nationalIDIssuedDate: "",
    nationalIDIssuedPlace: "",
    birthDate: "",
    licenseType: "",
    licenseExpiryDate: "",
    bankAccountNumber: "",
    bankName: "",
    vehicleType: "",
    status: true, // true = Active
  });

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

    try {
      const payload = {
        ...formData,
        status: formData.status ? "Active" : "Inactive",
      };

      await addDriver(payload);
      refreshDrivers();
      closeModal();

      Swal.fire({
        icon: "success",
        title: "Tạo tài xế thành công!",
        text: "Tài xế đã được thêm vào hệ thống.",
      });
    } catch (err) {
      console.error("Lỗi khi thêm tài xế:", err);
      Swal.fire({
        icon: "error",
        title: "Thêm tài xế thất bại!",
        text: "Có lỗi khi thêm tài xế, vui lòng thử lại.",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Thêm Tài Xế Mới</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Họ và tên" required />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Số điện thoại" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" />
        <input name="nationalID" value={formData.nationalID} onChange={handleChange} placeholder="CMND/CCCD" required />
        <input type="date" name="nationalIDIssuedDate" value={formData.nationalIDIssuedDate} onChange={handleChange} />
        <input name="nationalIDIssuedPlace" value={formData.nationalIDIssuedPlace} onChange={handleChange} placeholder="Nơi cấp" />
        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} max={today} />
        <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="Loại phương tiện" />
        <input name="licenseType" value={formData.licenseType} onChange={handleChange} placeholder="Loại bằng lái" />
        <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleChange} />
        <input name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Số tài khoản ngân hàng" />
        <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Ngân hàng" />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
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
