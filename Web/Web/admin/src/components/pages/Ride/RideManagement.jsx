import React, { useEffect, useState } from "react";
import {
  getRides,
  createRide,
  updateRide,
  deleteRide,
} from "../../../services/apiRide";
import AddRideForm from "./AddRideForm";
import EditRideForm from "./EditRideForm";
import RideAction from "./RideAction";
import styles from "./RideManagement.module.css";
import Swal from 'sweetalert2';
import Modal from "../../Modal/Modal";
import RideStats from "./RideStats";

export default function RideManagement() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
      setShowAddForm(false);
    } catch (error) {
      console.error("Lỗi thêm chuyến đi:", error);
    }
  };
  const handleCancelRide = async () => {
    if (!selectedRide) return;
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc muốn hủy chuyến đi này?',
      showCancelButton: true,
      confirmButtonText: 'Hủy chuyến',
      cancelButtonText: 'Không',
    });

    if (confirm.isConfirmed) {
      try {
        await updateRide(selectedRide.id, {
          ...selectedRide,
          status: 2,
          pickupTime: selectedRide.pickupTime ? new Date(selectedRide.pickupTime).toISOString() : null,
          dropoffTime: selectedRide.dropoffTime ? new Date(selectedRide.dropoffTime).toISOString() : null,
        });

        await fetchRides();
        Swal.fire({
          icon: "success",
          title: "Đã hủy chuyến thành công!",
        });
        setSelectedRide(null);
      } catch (err) {
        console.error("❌ Chi tiết lỗi khi hủy chuyến:", err);
        Swal.fire({
          icon: "error",
          title: "Lỗi khi hủy chuyến",
          text: err.response?.data?.message || JSON.stringify(err.response?.data) || "Đã xảy ra lỗi không xác định.",
        });
      }
    }
  };


  const handleDeleteRide = async () => {
    if (!selectedRide) return;

    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc muốn xoá chuyến đi này?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await deleteRide(selectedRide.id);

        if (res.status === 204) {
          Swal.fire({
            icon: 'success',
            title: 'Chuyến đi đã được xóa thành công!',
          });

          setRides((prev) => prev.filter((r) => r.id !== selectedRide.id));
          setSelectedRide(null);
        } else {
          console.warn("❗ Không nhận được mã phản hồi 204 như mong đợi:", res);
          Swal.fire({
            icon: 'error',
            title: 'Không xoá được chuyến đi.',
            text: `Mã phản hồi từ máy chủ: ${res.status}`,
          });
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi deleteRide():", error);

        if (error.response) {
          console.log("📦 Lỗi chi tiết từ server:", {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
        }

        Swal.fire({
          icon: 'error',
          title: 'Lỗi khi xoá chuyến đi.',
          text: error.response?.data || "Đã có lỗi xảy ra khi kết nối máy chủ.",
        });
      }
    }
  };


  const handleSelect = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý chuyến đi</h2>

      <RideAction
        onAdd={() => setShowAddForm(true)}
        onEdit={() => setShowEditForm(true)}
        onDelete={handleDeleteRide}
        onCancel={handleCancelRide}
        selectedRide={selectedRide}
      />


      {showAddForm && (
        <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddRideForm onSubmit={handleAddRide} onCancel={() => setShowAddForm(false)} />
        </Modal>
      )}

      {showEditForm && selectedRide && (
        <EditRideForm
          ride={selectedRide}
          onSubmit={handleAddRide}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Route</th>
            <th>Xe</th>
            <th>Tài xế</th>
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
              <td>{ride.routeTripScheduleId}</td>
              <td>{ride.vehiclePlate} ({ride.vehicleId})</td>
              <td>{ride.driverName} ({ride.driverId})</td>
              <td>{ride.passengerName}</td>
              <td>{ride.pickupLocation}</td>
              <td>{ride.dropoffLocation}</td>
              <td className={
                ride.status === 0 ? styles.statusPending :
                  ride.status === 1 ? styles.statusRunning :
                    ride.status === 2 ? styles.statusCancelled :
                      ride.status === 3 ? styles.statusCompleted : ""
              }>
                {
                  ride.status === 0 ? "Chưa bắt đầu" :
                    ride.status === 1 ? "Đang chạy" :
                      ride.status === 2 ? "Đã hủy" :
                        ride.status === 3 ? "Hoàn thành" :
                          "Không rõ"
                }
              </td>
              <td>{ride.pickupTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <RideStats/>
    </div>
  );
}
