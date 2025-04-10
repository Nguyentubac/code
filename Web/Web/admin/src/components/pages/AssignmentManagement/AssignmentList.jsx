import React, { useEffect, useState } from "react";
import styles from "./AssignmentManagement.module.css";
import { getAssignments } from "../../../services/apiVehicleDriver";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error("❌ Lỗi tải danh sách phân công:", err);
      }
    };
    fetchAssignments();
  }, []);

  const filteredAssignments = filterDate
    ? assignments.filter((a) =>
        a.assignedDate?.startsWith(filterDate)
      )
    : assignments;

  return (
    <div className={styles.container}>
      <h2>📋 Danh Sách Phân Công</h2>

      <div className={styles.filterPanel}>
        <label>
          🗓️ Lọc theo ngày:{" "}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button onClick={() => setFilterDate(new Date().toISOString().slice(0, 10))}>Today</button>
        </label>
        {/* sửa */}
      </div>


      {filteredAssignments.length === 0 ? (
        <p className={styles.empty}>Không có dữ liệu phân công nào.</p>
      ) : (
        <table className={styles.assignmentTable}>
          <thead>
            <tr>
              <th>Xe</th>
              <th>Tài xế</th>
              <th>Ngày phân công</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((a) => (
              <tr key={a.id}>
                <td>{a.vehicle?.plateNumber} - {a.vehicle?.model}</td>
                <td>{a.driver?.fullName}</td>
                <td>{new Date(a.assignedAt).toLocaleString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignmentList;
