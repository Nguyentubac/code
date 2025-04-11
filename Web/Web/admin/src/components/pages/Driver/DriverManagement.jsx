import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { getDrivers, deleteDriver } from "../../../services/apiDriver";
import styles from "../User/UserManagement.module.css";
import DriverAction from "./DriverAction";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách tài xế:", err);
      setError("Không thể tải danh sách tài xế.");
    }
  };

  const handleSelectDriver = (id) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDrivers.length === drivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(drivers.map((d) => d.id));
    }
  };

  const handleDeleteDrivers = async () => {
    if (selectedDrivers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Không có tài xế nào được chọn",
        text: "Vui lòng chọn ít nhất một tài xế để xoá.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Xoá tài xế",
      text: `Bạn có chắc chắn muốn xoá ${selectedDrivers.length} tài xế?`,
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
    });

    if (confirmResult.isConfirmed) {
      try {
        await Promise.all(selectedDrivers.map((id) => deleteDriver(id)));
        setDrivers(drivers.filter((d) => !selectedDrivers.includes(d.id)));
        setSelectedDrivers([]);
        Swal.fire({
          icon: "success",
          title: "Xoá thành công",
          text: "Tài xế đã được xoá.",
        });
      } catch (err) {
        console.error("Xoá tài xế thất bại:", err);
        setError("Không thể xoá tài xế.");
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi xoá tài xế.",
        });
      }
    }
  };

  const formatDate = (value) => {
    if (!value) return "Chưa có";
    const date = new Date(value);
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const columns = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={selectedDrivers.length === drivers.length && drivers.length > 0}
          onChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedDrivers.includes(row.original.id)}
          onChange={() => handleSelectDriver(row.original.id)}
        />
      ),
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "fullName", header: "Họ và tên" },
    { accessorKey: "vehicleType", header: "Loại xe" },
    { accessorKey: "earnings", header: "Thu nhập" },
    { accessorKey: "phoneNumber", header: "Số điện thoại" },
    { accessorKey: "birthDate", header: "Ngày sinh", cell: (info) => formatDate(info.getValue()) },
    { accessorKey: "address", header: "Địa chỉ" },
    { accessorKey: "nationalID", header: "CMND/CCCD" },
    {
      accessorKey: "nationalIDIssuedDate",
      header: "Ngày cấp",
      cell: (info) => formatDate(info.getValue()),
    },
    { accessorKey: "nationalIDIssuedPlace", header: "Nơi cấp" },
    { accessorKey: "licenseType", header: "Loại bằng lái" },
    {
      accessorKey: "licenseExpiryDate",
      header: "Hết hạn bằng lái",
      cell: (info) => formatDate(info.getValue()),
    },
    { accessorKey: "bankAccountNumber", header: "Số tài khoản" },
    { accessorKey: "bankName", header: "Ngân hàng" },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: (info) => formatDate(info.getValue()),
    },
    { 
      accessorKey: "updatedAt", 
      header: "Cập nhật lúc", 
      cell: (info) => new Date(info.getValue()).toLocaleDateString('en-GB') 
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: (info) => (
        <span className={info.getValue() === "Active" ? styles.activeStatus : styles.inactiveStatus}>
          {info.getValue() === "Active" ? "✔ Hoạt động" : "❌ Không hoạt động"}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: drivers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.userManagement}>
      <DriverAction
        drivers={drivers}
        selectedDrivers={selectedDrivers}
        refreshDrivers={fetchDrivers}
        onDelete={handleDeleteDrivers}
      />
      <br />
      <h2>Quản lý Tài Xế</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Tìm kiếm tài xế..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.tableContainer}>
        <table className={styles.excelTable}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={selectedDrivers.includes(row.original.id) ? styles.selectedRow : ""}
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
                  Không tìm thấy tài xế.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
