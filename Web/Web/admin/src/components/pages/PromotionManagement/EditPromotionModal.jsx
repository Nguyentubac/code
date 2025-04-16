import React, { useState, useEffect } from "react";
import styles from "./PromotionManagement.module.css";
import Modal from "../../Modal/Modal";

export default function EditPromotionModal({ isOpen, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState(initialData);

    useEffect(() => {
        setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ["discount", "minRideAmount", "maxUsage", "status"];
        const parsedValue = numericFields.includes(name) ? Number(value) : value;
        setForm((prev) => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmit = () => {
        const formWithId = { ...form };
      
        if (initialData?.id) {
          formWithId.id = initialData.id; // ✅ Đảm bảo có id khi cập nhật
        }
      
        console.log("📝 Form gửi lên:", formWithId);
        onSubmit(formWithId);
      };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{initialData?.id ? "✏️ Sửa mã giảm giá" : "➕ Thêm mã mới"}</h3>
            <div className={styles.form}>
                <input name="code" placeholder="Mã" value={form.code} onChange={handleChange} disabled={!!initialData.id} />
                <input name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} />
                <input name="discount" type="number" placeholder="Giảm (%)" value={form.discount} onChange={handleChange} />
                <input name="validFrom" type="date" value={form.validFrom} onChange={handleChange} />
                <input name="validTo" type="date" value={form.validTo} onChange={handleChange} />
                <input name="minRideAmount" type="number" placeholder="Tối thiểu" value={form.minRideAmount} onChange={handleChange} />
                <input name="maxUsage" type="number" placeholder="Lượt dùng tối đa" value={form.maxUsage} onChange={handleChange} />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value={1}>Hoạt động</option>
                    <option value={0}>Không hoạt động</option>
                </select>
                <button onClick={handleSubmit}>{initialData?.id ? "💾 Cập nhật" : "➕ Tạo"}</button>
            </div>
        </Modal>
    );
}
