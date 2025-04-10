import React, { useEffect, useState } from "react";
import { getVehicles, updateVehicleStatus } from "../../../services/apiVehicle";
import styles from "./VehicleStatusManagement.module.css";
export default function VehicleStatusManagement() {
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async (showSuccess = false) => {
        try {
          const data = await getVehicles();
          setVehicles(data);
          if (showSuccess) {
            Swal.fire({
              icon: "success",
              title: "Danh sách phương tiện đã được cập nhật!",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (err) {
          console.error("❌ Lỗi tải danh sách phương tiện:", err);
          Swal.fire({
            icon: "error",
            title: "Lỗi khi tải danh sách phương tiện!",
          });
        }
      };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await updateVehicleStatus(id, Number(status)); // ép sang số
            fetchVehicles();
        } catch (err) {
            console.error("❌ Lỗi cập nhật trạng thái:", err);
        }
    };

    const statusOptions = [
        { label: "Bảo trì", value: 0 },
        { label: "Hoạt động", value: 1 },
        { label: "Ngưng sử dụng", value: 2 },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🛠️ Quản lý trạng thái phương tiện</h2>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Biển số</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.plateNumber}</td>
                            <td>
                                <select
                                    value={v.status}
                                    onChange={(e) => handleStatusChange(v.id, e.target.value)}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
