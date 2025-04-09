import React, { useState } from "react";
import styles from "./DriverAction.module.css";
import Modal from "../../Modal/Modal";
import AddDriverForm from "./AddDriverForm";
import EditDriverForm from "./EditDriverForm";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function DriverAction({
  refreshDrivers,
  selectedDrivers,
  drivers,
  onDelete,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const selectedDriverObject =
    selectedDrivers.length === 1
      ? drivers.find((driver) => driver.id === selectedDrivers[0])
      : null;

  const handleDelete = () => {
    if (selectedDrivers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Không có tài xế nào được chọn",
        text: "Vui lòng chọn ít nhất một tài xế để xoá.",
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "Xoá tài xế",
      text: `Bạn có chắc chắn muốn xoá ${selectedDrivers.length} tài xế?`,
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDelete(selectedDrivers);
        Swal.fire({
          icon: "success",
          title: "Xoá thành công",
          text: "Tài xế đã được xoá.",
        });
      }
    });
  };

  return (
    <div className={styles.actionContainer}>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionBtn} ${styles.addUserBtn}`}
          onClick={() => setIsAddOpen(true)}
        >
          <i className="fas fa-add"></i> Thêm Tài Xế
        </button>
        <button
          className={`${styles.actionBtn} ${styles.editUserBtn}`}
          onClick={() => setIsEditOpen(true)}
          disabled={selectedDrivers.length !== 1}
        >
          <i className="fas fa-edit"></i> Sửa Tài Xế
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={handleDelete}
          disabled={selectedDrivers.length === 0}
        >
          <i className="fas fa-trash"></i> Xoá Tài Xế
        </button>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedDriverObject ? (
          <EditDriverForm
            selectedDriver={selectedDriverObject}
            closeModal={() => setIsEditOpen(false)}
            refreshDrivers={refreshDrivers}
          />
        ) : (
          <p style={{ padding: "2rem" }}>Không tìm thấy tài xế cần sửa.</p>
        )}
      </Modal>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddDriverForm
          closeModal={() => setIsAddOpen(false)}
          refreshDrivers={refreshDrivers}
        />
      </Modal>
    </div>
  );
}
