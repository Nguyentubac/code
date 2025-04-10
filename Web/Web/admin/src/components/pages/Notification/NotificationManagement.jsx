import React, { useEffect, useState } from "react";
import styles from "./NotificationManagement.module.css";
import { getNotifications } from "../../../services/apiNotification";
import Modal from "../../Modal/Modal";
import AddNotificationForm from "./AddNotificationForm";
import EditNotificationForm from "./EditNotificationForm";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ userId: "", type: "", status: "" });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Lỗi tải thông báo:", err);
      setError("Không thể tải danh sách thông báo.");
    }
  };

  const filtered = notifications.filter((n) => {
    const matchUser = filter.userId ? String(n.userId) === filter.userId : true;
    const matchType = filter.type ? n.type === filter.type : true;
    const matchStatus = filter.status ? String(n.status) === filter.status : true;
    return matchUser && matchType && matchStatus;
  });

  const formatDate = (date) => new Date(date).toLocaleString("vi-VN");

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa thông báo này?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Logic xóa thông báo
          // await deleteNotification(id);
          fetchNotifications(); // Lấy lại danh sách sau khi xóa
          Swal.fire({
            icon: 'success',
            title: 'Thông báo đã được xóa thành công!',
            showConfirmButton: true
          });
        } catch (error) {
          console.error("Lỗi xóa thông báo:", error);
          Swal.fire({
            icon: 'error',
            title: 'Không thể xóa thông báo.',
            showConfirmButton: true
          });
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý Thông báo</h2>

      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={() => setIsAddOpen(true)}>+ Thêm</button>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Lọc theo UserId"
          value={filter.userId}
          onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lọc theo Loại"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="1">Đã đọc</option>
          <option value="0">Chưa đọc</option>
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Admin gửi</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.userId ?? "-"}</td>
                <td>{n.title}</td>
                <td>{n.message}</td>
                <td>{n.type}</td>
                <td>{n.status === 1 ? "✔ Đã đọc" : "❌ Chưa đọc"}</td>
                <td>{n.senderIsAdmin ? "✔" : "✖"}</td>
                <td>{formatDate(n.createdAt)}</td>
                <td>
                  <button onClick={() => { setSelected(n); setIsEditOpen(true); }}>Sửa</button>
                  <button onClick={() => handleDelete(n.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddNotificationForm closeModal={() => setIsAddOpen(false)} refreshNotifications={fetchNotifications} />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selected ? (
          <EditNotificationForm notification={selected} closeModal={() => setIsEditOpen(false)} refreshNotifications={fetchNotifications} />
        ) : <p>Không tìm thấy thông báo để sửa</p>}
      </Modal>
    </div>
  );
}
