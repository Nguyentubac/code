import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "../User/UserManagement.module.css";
import {
  getAdmins,
  deleteAdmin,
} from "../../../services/apiAdmin";
import AdminAction from "./AdminsAction";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (err) {
      setError("Không thể tải danh sách admin.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSelect = (id) => {
    setSelectedAdmins((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAdmins.length === admins.length) {
      setSelectedAdmins([]);
    } else {
      setSelectedAdmins(admins.map((a) => a.id));
    }
  };

  const handleDelete = async () => {
    if (!selectedAdmins.length) return;
    if (!window.confirm("Bạn có chắc chắn muốn xoá các admin đã chọn?")) return;

    try {
      await Promise.all(selectedAdmins.map((id) => deleteAdmin(id)));
      await fetchAdmins();
      setSelectedAdmins([]);
      Swal.fire({
        icon: "success",
        title: "Xoá thành công",
        text: "Các admin đã được xoá.",
      });
    } catch (err) {
      setError("Không thể xoá admin.");
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi xoá admin.",
      });
    }
  };

  const columns = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={selectedAdmins.length === admins.length && admins.length > 0}
          onChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedAdmins.includes(row.original.id)}
          onChange={() => handleSelect(row.original.id)}
        />
      ),
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "fullName", header: "Họ tên" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phoneNumber", header: "SĐT" },
    { accessorKey: "isActive", header: "Trạng thái", cell: (info) => (
      info.getValue() ? <span className={styles.activeStatus}>✔ Hoạt động</span> : <span className={styles.inactiveStatus}>❌ Vô hiệu</span>
    )},
    { accessorKey: "createdAt", header: "Ngày tạo", cell: (info) => {
      const val = info.getValue();
      return val ? new Date(val).toLocaleString() : "–";
    }},
    { accessorKey: "lastLoginAt", header: "Lần đăng nhập", cell: (info) => {
      const val = info.getValue();
      return val ? new Date(val).toLocaleString() : "–";
    }},
  ];

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.userManagement}>
      <AdminAction
        admins={admins}
        selectedAdmins={selectedAdmins}
        refreshAdmins={fetchAdmins}
        onDelete={handleDelete}
      />

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Tìm kiếm admin..."
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={selectedAdmins.includes(row.original.id) ? styles.selectedRow : ""}
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
                  Không tìm thấy admin nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
