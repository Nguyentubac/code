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

export default function RideManagement() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

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

  const filteredRides = rides.filter((ride) => {
    const matchStatus = !filterStatus || ride.status === filterStatus;
    const matchDate =
      !filterDate ||
      new Date(ride.pickupTime).toISOString().slice(0, 10) === filterDate;
    return matchStatus && matchDate;
  });

  const handleAddRide = async (formData) => {
    try {
      await createRide(formData);
      fetchRides();
      setShowAddForm(false);
    } catch (error) {
      console.error("Lỗi thêm chuyến đi:", error);
    }
  };

  const handleEditRide = async (formData) => {
    try {
      await updateRide(formData.id, formData);
      fetchRides();
      setShowEditForm(false);
    } catch (error) {
      console.error("Lỗi cập nhật chuyến đi:", error);
    }
  };

  const handleDeleteRide = async () => {
    if (!selectedRide) return;
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá chuyến đi này?");
    if (confirmDelete) {
      try {
        await deleteRide(selectedRide.id);
        setSelectedRide(null);
        fetchRides();
      } catch (error) {
        console.error("Lỗi xoá chuyến đi:", error);
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
        selectedRide={selectedRide}
      />

      <div className={styles.filterBar}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Scheduled">Đã lên lịch</option>
          <option value="Completed">Hoàn tất</option>
          <option value="Cancelled">Đã huỷ</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className={styles.filterDate}
        />
      </div>

      {showAddForm && (
        <AddRideForm
          onSubmit={handleAddRide}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && selectedRide && (
        <EditRideForm
          ride={selectedRide}
          onSubmit={handleEditRide}
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
          {filteredRides.map((ride) => (
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

