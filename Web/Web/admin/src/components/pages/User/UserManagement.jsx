import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../services/apiUser";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import styles from "./UserManagement.module.css"; // Import CSS Module
import Action from "./Action"; // Import Action Component
import Swal from "sweetalert2";
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // Lưu danh sách user được chọn
  useEffect(() => {
    fetchUsers();
  }, []);
  error;
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      setError("Không thể tải danh sách người dùng.");
    }
  };

  const handleDeleteUsers = async () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Chưa chọn người dùng",
        text: "Vui lòng chọn ít nhất một người dùng để xóa.",
      });
      return;
    }

    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn xóa ${selectedUsers.length} người dùng?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true, // Đổi vị trí các nút
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(selectedUsers.map((id) => deleteUser(id)));
        setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);

        Swal.fire({
          icon: "success",
          title: "Xóa thành công!",
          text: `${selectedUsers.length} người dùng đã bị xóa.`,
        });
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        setError("Không thể xóa người dùng.");
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể xóa người dùng, vui lòng thử lại.",
        });
      }
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };



  // Cấu trúc cột cho bảng
  const columns = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={selectedUsers.length === users.length && users.length > 0}
          onChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedUsers.includes(row.original.id)}
          onChange={() => handleSelectUser(row.original.id)}
        />
      ),
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "fullName", header: "Họ và Tên" },
    { accessorKey: "gender", header: "Giới tính" },
    { accessorKey: "birthDate", header: "Ngày sinh", cell: (info) => { const value = info.getValue(); if (!value) return "Chưa có"; const date = new Date(value); const day = String(date.getDate()).padStart(2, "0"); const month = String(date.getMonth() + 1).padStart(2, "0"); const year = date.getFullYear(); return `${day}/${month}/${year}`; }, },
    { accessorKey: "phoneNumber", header: "Số điện thoại" },
    { accessorKey: "address", header: "Địa chỉ" },
    { accessorKey: "createdAt", header: "Ngày tạo", cell: (info) => { const value = info.getValue(); if (!value) return "Chưa có"; const date = new Date(value); const day = String(date.getDate()).padStart(2, "0"); const month = String(date.getMonth() + 1).padStart(2, "0"); const year = date.getFullYear(); return `${day}/${month}/${year}`; }, },
    { accessorKey: "updatedAt",header: "Cập nhật lúc",cell: (info) => new Date(info.getValue()).toLocaleDateString('en-GB')},
    { accessorKey: "isActive",header: "Trạng thái",cell: (info) => 
      (<span className={info.getValue() ? styles.activeStatus : styles.inactiveStatus}>
          {info.getValue() ? "✔ Hoạt động" : "❌ Không hoạt động"}
        </span>
      ),
    },
  ];

  // Khởi tạo React Table
  const tableInstance = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div>
      <div className={styles.userManagement}>
        {/* Action buttons */}
        <Action
          users={users} // ✅ TRUYỀN users vào để tìm user theo ID
          refreshUsers={fetchUsers}
          selectedUsers={selectedUsers}
          onDelete={handleDeleteUsers}
        />


        {/* Search bar */}
        <div className={styles.searchContainer}>

          <input
            type="text"
            placeholder="Tìm kiếm người dùng.../id/tên/sđt/email..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Table */}
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
                    className={
                      selectedUsers.includes(row.original.id) ? styles.selectedRow : ""
                    }
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
                  <td colSpan="10" className={styles.noData}>
                    Không tìm thấy người dùng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  ;

}
