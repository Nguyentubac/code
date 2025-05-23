import React, { useState } from "react";
import styles from "./NotificationManagement.module.css";
import { addNotification } from "../../../services/apiNotification";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function AddNotificationForm({ closeModal, refreshNotifications }) {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    message: "",
    type: "",
    status: 0,
    senderIsAdmin: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      userId: formData.userId ? parseInt(formData.userId) : null,
      createdAt: new Date().toISOString(),
    };
    try {
      await addNotification(payload);
      refreshNotifications();
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Thông báo đã được thêm thành công!',
        showConfirmButton: true
      });
    } catch (error) {
      console.error("Lỗi thêm thông báo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Không thể thêm thông báo.',
        text: 'Vui lòng thử lại sau!',
        showConfirmButton: true
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Thêm Thông báo</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.scrollableForm}>
          <div className={styles.scrollableForm}>
            <input
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="UserId (tuỳ chọn)"
              type="number"
            />
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tiêu đề"
              required
            />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nội dung thông báo"
              required
            />
            <select id="type" name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Chọn loại thông báo</option>
              <option value={1}>Hệ thống</option>
              <option value={2}>Khuyến mãi</option>
              <option value={3}>Nhắc nhở</option>
            </select>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value={0}>Chưa đọc</option>
              <option value={1}>Đã đọc</option>
            </select>

            <label className={styles.checkboxLabel} htmlFor="senderIsAdmin">
              <input
                id="senderIsAdmin"
                type="checkbox"
                name="senderIsAdmin"
                checked={formData.senderIsAdmin}
                onChange={handleChange}
              />
              Gửi bởi Admin
            </label>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>Lưu</button>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
