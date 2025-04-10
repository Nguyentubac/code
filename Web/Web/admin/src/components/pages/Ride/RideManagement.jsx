import React, { useEffect, useState } from "react";
import {
  getRides,
  createRide,
  updateRide,
  deleteRide,
} from "../../../services/apiRide";
import AddRideForm from "./AddRideForm";  // Import form thêm chuyến đi
import EditRideForm from "./EditRideForm";
import RideAction from "./RideAction";
import styles from "./RideManagement.module.css";
import Swal from 'sweetalert2'; // Import SweetAlert2
import Modal from "../../Modal/Modal"; // Giả sử Modal được cài đặt tương tự như UserManagement

export default function RideManagement() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Quản lý modal thêm chuyến đi
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchRides = async () => {
    try {
      const data = await getRides();
      setRides(data);
    } catch (error) {
      console.error("Lỗi tải danh sách chuyến đi:", error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleAddRide = async (formData) => {
    try {
      await createRide(formData);
      fetchRides();
      setShowAddForm(false); // Đóng form sau khi thêm
    } catch (error) {
      console.error("Lỗi thêm chuyến đi:", error);
    }
  };

  const handleDeleteRide = async () => {
    if (!selectedRide) return;
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc muốn xoá chuyến đi này?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRide(selectedRide.id);
          setSelectedRide(null);
          fetchRides();
          Swal.fire({
            icon: 'success',
            title: 'Chuyến đi đã được xóa thành công!',
            showConfirmButton: true
          });
        } catch (error) {
          console.error("Lỗi xoá chuyến đi:", error);
          Swal.fire({
            icon: 'error',
            title: 'Không thể xoá chuyến đi.',
            showConfirmButton: true
          });
        }
      }
    });
  };

  const handleSelect = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý chuyến đi</h2>

      <RideAction
        onAdd={() => setShowAddForm(true)} // Mở form thêm chuyến đi khi nhấn nút
        onEdit={() => setShowEditForm(true)}
        onDelete={handleDeleteRide}
        selectedRide={selectedRide}
      />

      {/* Modal Thêm chuyến đi */}
      {showAddForm && (
        <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddRideForm onSubmit={handleAddRide} onCancel={() => setShowAddForm(false)} />
        </Modal>
      )}

      {showEditForm && selectedRide && (
        <EditRideForm
          ride={selectedRide}
          onSubmit={handleAddRide} // Hoặc tạo hàm riêng cho chỉnh sửa
          onCancel={() => setShowEditForm(false)}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>RouteId</th>
            <th>VehicleId</th>
            <th>DriverId</th>
            <th>Hành khách</th>
            <th>Điểm đón</th>
            <th>Điểm trả</th>
            <th>Trạng thái</th>
            <th>Thời gian đón</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr
              key={ride.id}
              onClick={() => handleSelect(ride)}
              className={selectedRide?.id === ride.id ? styles.selectedRow : ""}
            >
              <td>{ride.id}</td>
              <td>{ride.routeId}</td>
              <td>{ride.vehicleId}</td>
              <td>{ride.driverId}</td>
              <td>{ride.passengerName}</td>
              <td>{ride.pickupLocation}</td>
              <td>{ride.dropoffLocation}</td>
              <td>{ride.status}</td>
              <td>{new Date(ride.pickupTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
