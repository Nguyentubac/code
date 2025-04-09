import React, { useState } from "react";
import Modal from "../../common/Modal";
import AddRouteTripForm from "./AddRouteTripForm";
import EditRouteTripForm from "./EditRouteTripForm";

const RouteTripAction = ({ selected, refreshData, resetSelection }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleAdd = () => {
    setIsEdit(false);
    setModalOpen(true);
  };

  const handleEdit = () => {
    if (!selected) {
      alert("Vui lòng chọn chuyến tuyến để sửa.");
      return;
    }
    setIsEdit(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetSelection();
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleAdd}>➕ Thêm chuyến tuyến</button>
        <button onClick={handleEdit} style={{ marginLeft: "0.5rem" }}>
          ✏️ Sửa chuyến tuyến
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {isEdit ? (
          <EditRouteTripForm
            routeTrip={selected}
            closeModal={closeModal}
            refreshData={refreshData}
          />
        ) : (
          <AddRouteTripForm closeModal={closeModal} refreshData={refreshData} />
        )}
      </Modal>
    </>
  );
};

export default RouteTripAction;
