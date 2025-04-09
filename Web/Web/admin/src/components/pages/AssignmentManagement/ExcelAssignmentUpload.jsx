import React from "react";
import * as XLSX from "xlsx";
import { assignDriverToVehicle } from "../../../services/apiVehicleDriver";

export default function ExcelAssignmentUpload({ onUploadSuccess }) {
  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      for (const row of rows) {
        if (!row.driverId || !row.vehicleId) continue;
        try {
          await assignDriverToVehicle({
            driverId: parseInt(row.driverId),
            vehicleId: parseInt(row.vehicleId),
          });
        } catch (err) {
          console.error("Lỗi khi phân công dòng:", row, err);
        }
      }

      alert("Phân công từ Excel hoàn tất.");
      onUploadSuccess?.();
    } catch (err) {
      alert("Lỗi xử lý file Excel: " + err.message);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <label><strong>Nhập file Excel phân công (.xlsx):</strong></label><br />
      <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
    </div>
  );
}
