import React, { useState } from "react";
import styles from "./AdminsAction.module.css";
import Modal from "../../Modal/Modal";
import AddAdminForm from "./AddAdmin";
import EditAdminForm from "./EditAdmin";

export default function AdminAction({
  refreshAdmins,
  selectedAdmins,
  admins,
  onDelete,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const selectedAdminObject =
    selectedAdmins.length === 1
      ? admins.find((admin) => admin.id === selectedAdmins[0])
      : null;

  return (
    <div className={styles.actionContainer}>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionBtn} ${styles.addUserBtn}`}
          onClick={() => setIsAddOpen(true)}
        >
          <i className="fas fa-user-plus"></i> Thêm Admin
        </button>

        <button
          className={`${styles.actionBtn} ${styles.editUserBtn}`}
          onClick={() => setIsEditOpen(true)}
          disabled={selectedAdmins.length !== 1}
        >
          <i className="fas fa-edit"></i> Sửa Admin
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
          disabled={selectedAdmins.length === 0}
        >
          <i className="fas fa-trash"></i> Xoá Admin
        </button>
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddAdminForm
          closeModal={() => setIsAddOpen(false)}
          refreshAdmins={refreshAdmins}
        />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedAdminObject ? (
          <EditAdminForm
            selectedAdmin={selectedAdminObject}
            closeModal={() => setIsEditOpen(false)}
            refreshAdmins={refreshAdmins}
          />
        ) : (
          <p style={{ padding: "2rem" }}>Không tìm thấy admin cần sửa.</p>
        )}
      </Modal>
    </div>
  );
}
