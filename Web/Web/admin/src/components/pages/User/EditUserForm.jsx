import React, { useState, useEffect } from "react";
import { updateUser } from "../../../services/apiUser"; // Import API update
import styles from "./EditUserForm.module.css";

export default function EditUserForm({ selectedUser, closeModal, refreshUsers }) {
    const [formData, setFormData] = useState(selectedUser);
    const today = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        setFormData(selectedUser);
    }, [selectedUser]);

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
            await updateUser(formData.id, formData);
            refreshUsers(); // Cập nhật danh sách sau khi sửa
            closeModal();
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Sửa Thông Tin Người Dùng</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required disabled/>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled/>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
                <input type="date" name="birthDate" value={formData.birthDate?.slice(0, 10) || ""} onChange={handleChange} required  max={today} />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}/> Hoạt động
                </label>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn}>Lưu</button>
                    <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
                </div>
            </form>
        </div>
    );
}
