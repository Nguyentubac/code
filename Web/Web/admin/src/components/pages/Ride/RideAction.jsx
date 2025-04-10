import React from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from "./RideAction.module.css";

const RideAction = ({ onAdd, onEdit, onDelete, selectedRide }) => {

  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa chuyến đi này?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(); // Call the delete function if confirmed
        Swal.fire(
          'Đã xóa!',
          'Chuyến đi đã được xóa.',
          'success'
        );
      }
    });
  };

  return (
    <div className={styles.actionContainer}>
      <button onClick={onAdd} className={styles.addBtn}>➕ Thêm chuyến đi</button>
      <button
        onClick={onEdit}
        disabled={!selectedRide}
        className={styles.editBtn}
      >
        ✏️ Sửa
      </button>
      <button
        onClick={handleDelete} // Use SweetAlert for delete confirmation
        disabled={!selectedRide}
        className={styles.deleteBtn}
      >
        🗑️ Xoá
      </button>
    </div>
  );
};

export default RideAction;
