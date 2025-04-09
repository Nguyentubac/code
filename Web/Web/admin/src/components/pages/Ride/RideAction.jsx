import React from "react";
import styles from "./RideAction.module.css";

const RideAction = ({ onAdd, onEdit, onDelete, selectedRide }) => {
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
        onClick={onDelete}
        disabled={!selectedRide}
        className={styles.deleteBtn}
      >
        🗑️ Xoá
      </button>
    </div>
  );
};

export default RideAction;
