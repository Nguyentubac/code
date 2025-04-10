import React, { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "../../../services/apiVehicle";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "../User/UserManagement.module.css";
import VehicleAction from "./VehicleAction";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phương tiện:", error);
      setError("Không thể tải danh sách phương tiện.");
    }
  };

  const handleDeleteVehicles = async () => {
    if (selectedVehicles.length === 0) {
      // SweetAlert2 for no selection
      Swal.fire({
        icon: "warning",
        title: "Chưa chọn phương tiện",
        text: "Vui lòng chọn ít nhất một phương tiện để xóa.",
      });
      return;
    }

    // SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn xóa ${selectedVehicles.length} phương tiện?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        // Delete selected vehicles
        await Promise.all(selectedVehicles.map((id) => deleteVehicle(id)));
        setVehicles(vehicles.filter((v) => !selectedVehicles.includes(v.id)));
        setSelectedVehicles([]);

        // Success message with SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          text: `${selectedVehicles.length} phương tiện đã được xóa.`,
        });
      } catch (error) {
        console.error("Lỗi khi xóa phương tiện:", error);
        setError("Không thể xóa phương tiện.");

        // Error message with SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể xóa phương tiện. Vui lòng thử lại.",
        });
      }
    }
  };

  const handleSelectVehicle = (id) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVehicles.length === vehicles.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(vehicles.map((v) => v.id));
    }
  };

  const formatDate = (value) => {
    if (!value) return "Chưa có";
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={selectedVehicles.length === vehicles.length}
          onChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedVehicles.includes(row.original.id)}
          onChange={() => handleSelectVehicle(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "plateNumber",
      header: "Biển số",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "color",
      header: "Màu xe",
    },
    {
      accessorKey: "vehicleType",
      header: "Loại xe",
    },
    {
      accessorKey: "ownerName",
      header: "Chủ sở hữu",
    },
    {
      accessorKey: "capacity",
      header: "Sức chứa",
    },
    {
      accessorKey: "chassisNumber",
      header: "Số khung",
    },
    {
      accessorKey: "engineNumber",
      header: "Số máy",
    },
    {
      accessorKey: "fuelType",
      header: "Nhiên liệu",
    },
    {
      accessorKey: "luxuryFeatures",
      header: "Tiện nghi cao cấp",
    },
    {
      accessorKey: "driverComfortFeatures",
      header: "Tiện ích tài xế",
    },
    {
      accessorKey: "operatingArea",
      header: "Khu vực hoạt động",
    },
    {
      accessorKey: "entertainmentSystem",
      header: "Giải trí",
    },
    {
      accessorKey: "gpsInstalled",
      header: "GPS",
      cell: (info) => (info.getValue() ? "✔ Có" : "❌ Không"),
    },
    {
      accessorKey: "vipService",
      header: "VIP",
      cell: (info) => (info.getValue() ? "✔ Có" : "❌ Không"),
    },
    {
      accessorKey: "registrationDate",
      header: "Đăng ký",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "insuranceExpiry",
      header: "Hạn bảo hiểm",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "lastMaintenance",
      header: "Bảo dưỡng gần nhất",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "lastInspectionDate",
      header: "Kiểm định gần nhất",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "updatedAt",
      header: "Cập nhật lúc",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    },
  ];

  const tableInstance = useReactTable({
    data: vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.userManagement}>
      <VehicleAction
        vehicles={vehicles}
        refreshVehicles={fetchVehicles}
        selectedVehicles={selectedVehicles}
        onDelete={handleDeleteVehicles}
      />
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Tìm kiếm phương tiện.../id/biển số/model..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.excelTable}>
          <thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={styles.sortableHeader}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.length > 0 ? (
              tableInstance.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={selectedVehicles.includes(row.original.id) ? styles.selectedRow : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className={styles.noData}>
                  Không tìm thấy phương tiện.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
