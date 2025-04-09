import React, { useState } from "react";
import styles from "../User/Action.module.css";
import Modal from "../../Modal/Modal";
import AddVehicleForm from "./AddVehicleForm";
import EditVehicleForm from "./EditVehicleForm";

export default function VehicleAction({
  refreshVehicles,
  selectedVehicles,
  vehicles,
  onDelete,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const selectedVehicleObject =
    selectedVehicles.length === 1
      ? vehicles.find((v) => v.id === selectedVehicles[0])
      : null;

  return (
    <div className={styles.actionContainer}>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionBtn} ${styles.addUserBtn}`}
          onClick={() => setIsAddOpen(true)}
        >
          <i className="fas fa-plus-circle"></i> Thêm Phương Tiện
        </button>

        <button
          className={`${styles.actionBtn} ${styles.editUserBtn}`}
          onClick={() => setIsEditOpen(true)}
          disabled={selectedVehicles.length !== 1}
        >
          <i className="fas fa-edit"></i> Sửa Phương Tiện
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
          disabled={selectedVehicles.length === 0}
        >
          <i className="fas fa-trash"></i> Xoá Phương Tiện
        </button>
      </div>

      {/* Modal Thêm */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddVehicleForm
          closeModal={() => setIsAddOpen(false)}
          refreshVehicles={refreshVehicles}
        />
      </Modal>

      {/* Modal Sửa */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedVehicleObject ? (
          <EditVehicleForm
            selectedVehicle={selectedVehicleObject}
            closeModal={() => setIsEditOpen(false)}
            refreshVehicles={refreshVehicles}
          />
        ) : (
          <p style={{ padding: "2rem" }}>Không tìm thấy phương tiện để sửa.</p>
        )}
      </Modal>
    </div>
  );
}
