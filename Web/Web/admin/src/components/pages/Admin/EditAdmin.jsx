import React, { useEffect, useState } from "react";
import styles from "./AdminForm.module.css";
import { updateAdmin } from "../../../services/apiAdmin";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditAdminForm({ selectedAdmin, closeModal, refreshAdmins }) {
  const [formData, setFormData] = useState(selectedAdmin);

  useEffect(() => {
    setFormData(selectedAdmin);
  }, [selectedAdmin]);

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
        updatedAt: new Date().toISOString(),
      };
      await updateAdmin(formData.id, payload);
      refreshAdmins();
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        text: "Thông tin admin đã được cập nhật.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể cập nhật admin, vui lòng thử lại!",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sửa Admin</h2>
      <form onSubmit={handleSubmit}>
        <input name="id" value={formData.id} disabled />
        <input name="fullName" value={formData.fullName || ""} onChange={handleChange} placeholder="Họ tên" required />
        <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" required />
        <input name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} placeholder="Số điện thoại" />
        <input name="avatarUrl" value={formData.avatarUrl || ""} onChange={handleChange} placeholder="Avatar URL" />
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
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
