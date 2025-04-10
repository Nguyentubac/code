import React, { useState } from "react";
import { addUser } from "../../../services/apiUser";
import styles from "./AddUserForm.module.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddUserForm({ closeModal, refreshUsers }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    passwordHash: "1111", // Mặc định
    gender: "Nam",
    birthDate: null, // Khởi tạo null cho DatePicker
    phoneNumber: "",
    address: "",
    isActive: true, // Mặc định là hoạt động
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10); // Ngày hôm nay

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const updatedFormData = { ...formData };

      // Gửi dữ liệu lên server
      await addUser(updatedFormData);
      refreshUsers(); // ⚡ Cập nhật danh sách sau khi thêm
      closeModal();

      // Thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Thêm người dùng thành công!",
        text: "Người dùng đã được thêm vào hệ thống.",
      });
    } catch (err) {
      setError(err.message);

      // Thông báo lỗi
      Swal.fire({
        icon: "error",
        title: "Lỗi"+err.message,
        text: "Không thể thêm người dùng, vui lòng thử lại.",
      });
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="passwordHash"
            placeholder="Mật khẩu"
            value={formData.passwordHash}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Họ và Tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>

          {/* Sử dụng react-datepicker cho ngày sinh */}
          <DatePicker
            selected={formData.birthDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="mm/dd/yyyy"
            maxDate={new Date()} // Giới hạn ngày không được lớn hơn ngày hôm nay
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Hoạt động
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
