import React, { useState } from "react";
import styles from "./Action.module.css";
import Modal from "../../Modal/Modal";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

export default function Action({
  refreshUsers,
  selectedUsers,
  users,
  onDelete
}) {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  //const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  // ✅ Tìm user object từ ID
  const selectedUserObject =
    selectedUsers.length === 1
      ? users.find((user) => user.id === selectedUsers[0])
      : null;

  return (
    <div className={styles.actionContainer}>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionBtn} ${styles.addUserBtn}`}
          onClick={() => setIsAddUserOpen(true)}
        >
          <i className="fas fa-user-plus"></i> Thêm Người Dùng
        </button>

        <button
          className={`${styles.actionBtn} ${styles.editUserBtn}`}
          onClick={() => setIsEditUserOpen(true)}
          disabled={selectedUsers.length !== 1}
        >
          <i className="fas fa-edit"></i> Sửa Người Dùng
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
          disabled={selectedUsers.length === 0}
        >
          <i className="fas fa-trash"></i> Xóa Người Dùng
        </button>
      </div>

      {/* Modal Thêm */}
      <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
        <AddUserForm
          closeModal={() => setIsAddUserOpen(false)}
          refreshUsers={refreshUsers}
        />
      </Modal>

      {/* ✅ Modal Sửa */}
      <Modal isOpen={isEditUserOpen} onClose={() => setIsEditUserOpen(false)}>
        {selectedUserObject ? (
          <EditUserForm
            selectedUser={selectedUserObject}
            closeModal={() => setIsEditUserOpen(false)}
            refreshUsers={refreshUsers}
          />
        ) : (
          <p style={{ padding: "2rem" }}>Không tìm thấy người dùng cần sửa.</p>
        )}
      </Modal>
    </div>
  );
}
