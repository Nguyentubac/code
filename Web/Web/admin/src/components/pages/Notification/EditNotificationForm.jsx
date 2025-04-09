import React, { useState, useEffect } from "react";
import styles from "./NotificationManagement.module.css";
import { updateNotification } from "../../../services/apiNotification";

export default function EditNotificationForm({ notification, closeModal, refreshNotifications }) {
  const [formData, setFormData] = useState(notification);

  useEffect(() => {
    setFormData(notification);
  }, [notification]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked;
    } else if (["userId", "type", "status"].includes(name)) {
      newValue = value === "" ? "" : parseInt(value); 
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      userId: formData.userId ? parseInt(formData.userId) : null,
    };
    try {
      await updateNotification(formData.id, payload);
      refreshNotifications();
      closeModal();
    } catch (error) {
      console.error("Lỗi cập nhật thông báo:", error);
      alert("Không thể cập nhật thông báo.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sửa Thông báo</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.scrollableForm}>
          <input
            name="Id"
            value={formData.id || ""}
            onChange={handleChange}
            type="number"
            disabled
          />
          <input
            name="userId"
            value={formData.userId || ""}
            onChange={handleChange}
            placeholder="UserId (tuỳ chọn)"
            type="number"
          />
          <input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Tiêu đề"
            required
          />
          <textarea
            name="message"
            value={formData.message || ""}
            onChange={handleChange}
            placeholder="Nội dung thông báo"
            required
          />
          <select name="type" value={formData.type} onChange={(e) => setFormData(prev => ({
            ...prev,
            type: parseInt(e.target.value)
          }))} required>
            <option value="">Chọn loại thông báo</option>
            <option value={0}>Hệ thống</option>
            <option value={1}>Khuyến mãi</option>
            <option value={2}>Nhắc nhở</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value={0}>Chưa đọc</option>
            <option value={1}>Đã đọc</option>
          </select>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="senderIsAdmin"
              checked={formData.senderIsAdmin || false}
              onChange={handleChange}
            />
            Gửi bởi Admin
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
