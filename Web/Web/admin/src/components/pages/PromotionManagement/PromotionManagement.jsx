import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../../services/apiPromotion";
import styles from "./PromotionManagement.module.css";
import EditPromotionModal from "./EditPromotionModal";
export default function PromotionManagement() {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discount: 0,
    validFrom: "",
    validTo: "",
    status: 1,
    minRideAmount: 0,
    maxUsage: 100,
  });
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchPromotions = async () => {
    const data = await getAllPromotions();
    setPromotions(data);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm({
      code: "",
      description: "",
      discount: 0,
      validFrom: "",
      validTo: "",
      status: 1,
      minRideAmount: 0,
      maxUsage: 100,
    });
    setShowModal(true);
  };

  const openEditModal = (promo) => {
    setIsEdit(true);
    setEditingId(promo.id);
    setForm({
      id: promo.id, // ✅ thêm dòng này!
      code: promo.code,
      description: promo.description,
      discount: promo.discount,
      validFrom: promo.validFrom.slice(0, 10),
      validTo: promo.validTo.slice(0, 10),
      status: promo.status,
      minRideAmount: promo.minRideAmount,
      maxUsage: promo.maxUsage,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updatePromotion(form.id, form);
        Swal.fire("Cập nhật thành công!", "", "success");
      } else {
        await createPromotion(form);
        Swal.fire("Tạo mã thành công!", "", "success");
      }
      setShowModal(false);
      fetchPromotions();
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi", "Không thể xử lý yêu cầu", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Bạn chắc chắn xoá?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
    });
    if (confirm.isConfirmed) {
      await deletePromotion(id);
      fetchPromotions();
      Swal.fire("Đã xoá", "", "success");
    }
  };

  return (
    <div className={styles.container}>
      <h2>🎁 Quản lý mã giảm giá</h2>
      <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={openAddModal}>
        ➕ Thêm mã
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Giảm</th>
            <th>Thời hạn</th>
            <th>Đã dùng / Tối đa</th>
            <th>Tối thiểu</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((p) => (
            <tr key={p.id}>
              <td>{p.code}</td>
              <td>{p.discount}%</td>
              <td>{p.validFrom.slice(0, 10)} → {p.validTo.slice(0, 10)}</td>
              <td>{p.usedCount}/{p.maxUsage}</td>
              <td>{p.minRideAmount.toLocaleString()}đ</td>
              <td>{p.status === 1 ? "✅" : "❌"}</td>
              <td className={styles.actions}>
                <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(p)}>
                  ✏️
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(p.id)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm/sửa */}
      {showModal && (
        <EditPromotionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={form}
        onSubmit={handleSubmit}
      />
      )}
    </div>
  );
}
