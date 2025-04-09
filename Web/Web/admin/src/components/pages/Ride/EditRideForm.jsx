import React, { useState, useEffect } from "react";
import styles from "./RideForm.module.css";

const EditRideForm = ({ ride, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(ride);

  useEffect(() => {
    setFormData(ride);
  }, [ride]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Sửa chuyến đi</h3>
      <input name="routeId" value={formData.routeId} onChange={handleChange} placeholder="RouteId" required />
      <input name="vehicleId" value={formData.vehicleId} onChange={handleChange} placeholder="VehicleId" required />
      <input name="driverId" value={formData.driverId} onChange={handleChange} placeholder="DriverId" required />
      <input name="pickupTime" type="datetime-local" value={formData.pickupTime} onChange={handleChange} required />
      <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Điểm đón" />
      <input name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} placeholder="Điểm trả" />
      <input name="passengerName" value={formData.passengerName} onChange={handleChange} placeholder="Tên hành khách" />
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="SĐT" />
      <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Ghi chú" />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <div className={styles.buttonGroup}>
        <button type="submit">Cập nhật</button>
        <button type="button" onClick={onCancel}>Huỷ</button>
      </div>
    </form>
  );
};

export default EditRideForm;
