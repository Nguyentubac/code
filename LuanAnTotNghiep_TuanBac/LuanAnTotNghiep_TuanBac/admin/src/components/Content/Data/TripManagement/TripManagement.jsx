import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import styles from "./TripManagement.module.css";

const TripManagement = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("./src/components/Content/Data/Trip.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedTrips = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTrips(sortedTrips);
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.tripTable}>
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Driver</th>
            <th>Passengers</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.tripId} className={trip.status === "Completed" ? styles.completedTrip : ""}>
              <td>{trip.tripId}</td>
              <td>{trip.driver}</td>
              <td>{trip.passengers}</td>
              <td>{trip.status}</td>
              <td>
                <button className={styles.viewButton} onClick={() => navigate(`/trip/${trip.tripId}`)}>
                  Xem thêm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripManagement;
