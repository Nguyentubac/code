import React from "react";
import styles from "./Modal.module.css"; // Import CSS module

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
