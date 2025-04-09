import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Dialog } from "@headlessui/react";
import { assignDriverToVehicle } from "../../services/apiVehicleDriver";
import styles from "./ExcelUploadModal.module.css";

export default function ExcelUploadModal({ onUploadSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    setPreviewData(rows);
  };

  const handleConfirmUpload = async () => {
    for (const row of previewData) {
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
    setIsOpen(false);
    setPreviewData([]);
    setFileName("");
    onUploadSuccess?.();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.uploadBtn}>
        📤 Tải lên Excel
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.modal}>
        <div className={styles.modalBackdrop}>
          <Dialog.Panel className={styles.modalContent}>
            <Dialog.Title>📋 Xem trước dữ liệu phân công</Dialog.Title>

            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            {fileName && <p><strong>File:</strong> {fileName}</p>}

            {previewData.length > 0 ? (
              <table className={styles.previewTable}>
                <thead>
                  <tr>
                    <th>driverId</th>
                    <th>vehicleId</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.driverId}</td>
                      <td>{row.vehicleId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Vui lòng chọn file để xem trước.</p>
            )}

            <div className={styles.modalActions}>
              <button onClick={() => setIsOpen(false)}>❌ Huỷ</button>
              <button onClick={handleConfirmUpload} disabled={!previewData.length}>
                ✅ Phân công
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}