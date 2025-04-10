import React, { useState } from "react";
import Modal from "../../common/Modal";
import AddRouteTripForm from "./AddRouteTripForm";
import EditRouteTripForm from "./EditRouteTripForm";
import Swal from "sweetalert2";

const RouteTripAction = ({ selected, refreshData, resetSelection }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleAdd = () => {
    setIsEdit(false);
    setModalOpen(true);
  };

  const handleEdit = () => {
    if (!selected) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn chuyến tuyến',
        text: 'Vui lòng chọn chuyến tuyến để sửa.',
      });
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
      <div className="actionButtons">
        <button onClick={handleAdd}>➕ Thêm chuyến tuyến</button>
        <button onClick={handleEdit}>✏️ Sửa chuyến tuyến</button>
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
