import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { getPayments, updatePayment } from "../../../services/apiPayment";
import Swal from "sweetalert2";
import styles from "./PaymentManagement.module.css";
import ExportExcel from "./ExportExcel";
import PaymentDetailModal from "./PaymentDetailModal";

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, statusFilter, month, year, sortOrder]);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error("❌ Lỗi tải thanh toán:", err);
    }
  };

  const filterPayments = () => {
    let result = [...payments];

    // Lọc theo trạng thái thanh toán
    if (statusFilter !== "") {
      result = result.filter((p) => p.paymentStatus.toString() === statusFilter);
    }

    // Lọc theo tháng và năm
    if (month) {
      result = result.filter((p) => new Date(p.createdAt).getMonth() + 1 === Number(month));
    }

    if (year) {
      result = result.filter((p) => new Date(p.createdAt).getFullYear() === Number(year));
    }

    // Lọc và sắp xếp theo ngày tạo
    if (sortOrder === "asc") {
      result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Tăng dần
    } else {
      result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Giảm dần
    }

    setFiltered(result);
  };

  const handleConfirm = async (payment) => {
    const confirm = await Swal.fire({
      title: "Xác nhận thanh toán?",
      text: `Xác nhận đã thanh toán hóa đơn #${payment.id}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    });

    if (confirm.isConfirmed) {
      try {
        await updatePayment(payment.id, {
          ...payment,
          paymentStatus: 1,
        });
        await fetchPayments();
        Swal.fire("✅ Đã xác nhận!", "", "success");
      } catch (err) {
        Swal.fire("❌ Thất bại", "Không thể cập nhật thanh toán", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setSelected(null);
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
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "paymentMethod",
      header: "PTTT",
      cell: (info) => {
        const method = info.getValue();
        if (method === 0) return "COD";
        if (method === 1) return "Momo";
        if (method === 2) return "VNPay";
        return "Khác";
      },
    },
    { accessorKey: "amount", header: "Số tiền" },
    { accessorKey: "discountAmount", header: "Giảm giá" },
    { accessorKey: "totalAmount", header: "Tổng cộng" },
    {
      accessorKey: "paymentStatus",
      header: "Trạng thái",
      cell: (info) =>
        info.getValue() === 1 ? (
          <span className={styles.statusSuccess}>✅ Đã thanh toán</span>
        ) : (
          <span className={styles.statusPending}>⌛ Chưa thanh toán</span>
        ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: (info) => formatDate(info.getValue()),
    },
    {
      accessorKey: "updatedAt",
      header: "Cập nhật lúc",
      cell: (info) => formatDate(info.getValue()),
    },
    { accessorKey: "promotionId", header: "KM" },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={() => handleConfirm(row.original)}>
            ✅ Xác nhận
          </button>
          <button className={styles.viewBtn} onClick={() => setSelected(row.original)}>
            🔍 Chi tiết
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>💳 Quản lý thanh toán</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="0">Chưa thanh toán</option>
          <option value="1">Đã thanh toán</option>
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">-- Tháng --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
        <input type="number" placeholder="Năm" value={year} onChange={(e) => setYear(e.target.value)} min="2020" />
        {/* <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Thời gian (Tăng dần)</option>
          <option value="desc">Thời gian (Giảm dần)</option>
        </select> */}
      </div>

      <ExportExcel data={filtered} fileName={`Payments_${month}_${year}.xlsx`} />

      <div className={styles.tableContainer}>
        <table className={styles.excelTable}>
          <thead>
            {table.getHeaderGroups() && table.getHeaderGroups().length > 0 ? (
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={styles.sortableHeader}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === "desc" ? " 🔽" : " 🔼") : ""}
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className={styles.noData}>
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className={styles.noData}>Không tìm thấy thanh toán.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && <PaymentDetailModal payment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
