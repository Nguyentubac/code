import React, { useState, useEffect } from "react";
import styles from "./RouteTrip.module.css";
import { updateRouteTrip } from "../../../services/apiRouteTrip";

const EditRouteTripForm = ({ routeTrip, closeModal, refreshData }) => {
  const [formData, setFormData] = useState(routeTrip);

  useEffect(() => {
    setFormData(routeTrip);
  }, [routeTrip]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRouteTrip(formData.id, formData);
      refreshData();
      closeModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật RouteTrip:", error);
      alert("Không thể cập nhật RouteTrip.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Cập nhật chuyến tuyến</h2>
      <input
        name="routeId"
        type="number"
        value={formData.routeId}
        onChange={handleChange}
        placeholder="Route ID"
        required
      />
      <input
        name="driverId"
        type="number"
        value={formData.driverId}
        onChange={handleChange}
        placeholder="Driver ID"
        required
      />
      <input
        name="vehicleId"
        type="number"
        value={formData.vehicleId}
        onChange={handleChange}
        placeholder="Vehicle ID"
        required
      />
      <input
        name="startTime"
        type="datetime-local"
        value={formData.startTime}
        onChange={handleChange}
        required
      />
      <input
        name="endTime"
        type="datetime-local"
        value={formData.endTime}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value={0}>Chờ</option>
        <option value={1}>Đang chạy</option>
        <option value={2}>Hoàn thành</option>
        <option value={3}>Hủy</option>
      </select>
      <div className={styles.buttonGroup}>
        <button type="submit">Lưu</button>
        <button type="button" onClick={closeModal}>Hủy</button>
      </div>
    </form>
  );
};

export default EditRouteTripForm;
