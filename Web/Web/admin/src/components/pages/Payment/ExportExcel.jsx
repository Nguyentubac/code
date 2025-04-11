import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({ data = [], fileName = "Payments.xlsx" }) {
  const handleExport = () => {
    if (!data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data.map((p) => ({
      "ID": p.id,
      "Phương thức": ["COD", "Momo", "VNPay"][p.paymentMethod],
      "Số tiền": p.amount,
      "Giảm giá": p.discountAmount || 0,
      "Tổng cộng": p.totalAmount || 0,
      "Trạng thái": p.paymentStatus === 1 ? "Đã thanh toán" : "Chưa thanh toán",
      "Ngày tạo": new Date(p.createdAt).toLocaleString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSach");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  return (
    <button onClick={handleExport}>
      📥 Xuất Excel
    </button>
  );
}
