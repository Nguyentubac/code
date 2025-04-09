import React, { useState } from "react";
import { addUser } from "../../../services/apiUser"; // Import API
import styles from "./AddUserForm.module.css";

export default function AddUserForm({ closeModal,refreshUsers }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    passwordHash :"1111",
    gender: "Nam",
    birthDate: "",
    phoneNumber: "",
    address: "",
    isActive: true, // Mặc định là hoạt động
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addUser(formData);
      refreshUsers(); // ⚡ Cập nhật danh sách sau khi thêm
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Thêm Người Dùng</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className={styles.scrollableForm}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="passwordHash" placeholder="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
        <input type="text" name="fullName" placeholder="Họ và Tên" value={formData.fullName} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
        <input type="date" name="birthDate" value={formData.birthDate?.slice(0, 10) || ""} onChange={handleChange} required  max={today} />
        <input type="text" name="phoneNumber" placeholder="Số điện thoại" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} required />
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}/> Hoạt động
        </label>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
        </div>
        </div>
      </form>
    </div>
  );
}
