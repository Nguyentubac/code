import React, { useState } from "react";
import styles from "./AdminForm.module.css";
import { createAdmin } from "../../../services/apiAdmin";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function AddAdminForm({ closeModal, refreshAdmins }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    phoneNumber: "",
    avatarUrl: "",
    isActive: true,
  });

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
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await createAdmin(payload);
      refreshAdmins();
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Admin đã được thêm",
        text: "Tạo admin thành công!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể tạo admin, vui lòng thử lại!",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Thêm Admin</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Họ tên" value={formData.fullName} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="passwordHash" placeholder="Mật khẩu" value={formData.passwordHash} onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Số điện thoại" value={formData.phoneNumber} onChange={handleChange} />
        <input name="avatarUrl" placeholder="Avatar URL" value={formData.avatarUrl} onChange={handleChange} />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>Lưu</button>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
        </div>
      </form>
    </div>
  );
}

