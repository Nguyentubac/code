import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function DownloadExcelTemplate({ drivers = [], vehicles = [] }) {
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();

    // Sheet chính: PhanCong
    const sheet = workbook.addWorksheet("PhanCong");

    // Header
    sheet.columns = [
      { header: "driverId", key: "driverId", width: 20 },
      { header: "driverName", key: "driverName", width: 25 },
      { header: "vehicleId", key: "vehicleId", width: 20 },
      { header: "vehicleNumber", key: "vehicleNumber", width: 25 },
      { header: "CreatedAt", key: "CreatedAt", width: 25 },
      { header: "AssignedAt", key: "AssignedAt", width: 25 },
      { header: "UnassignedAt", key: "UnassignedAt", width: 25 },
    ];

    // Tạo sẵn 10 dòng trống để người dùng điền
    for (let i = 0; i < 10; i++) {
      sheet.addRow({});
    }

    // Sheet ẩn chứa danh sách chọn
    const listSheet = workbook.addWorksheet("DanhSach", { state: "veryHidden" });
    listSheet.getColumn(1).values = ["driverId", ...drivers.map(d => d.id)];
    listSheet.getColumn(2).values = ["vehicleId", ...vehicles.map(v => v.id)];

    // Gán dropdown cho các ô driverId và vehicleId
    for (let i = 2; i <= 11; i++) {
      sheet.getCell(`A${i}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`=DanhSach!$A$2:$A$${drivers.length + 1}`],
        showErrorMessage: true,
        errorTitle: "Giá trị không hợp lệ",
        error: "Vui lòng chọn từ danh sách.",
      };

      sheet.getCell(`C${i}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`=DanhSach!$B$2:$B$${vehicles.length + 1}`],
        showErrorMessage: true,
        errorTitle: "Giá trị không hợp lệ",
        error: "Vui lòng chọn từ danh sách.",
      };
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "MauPhanCong.xlsx");
  };

  return (
    <button onClick={handleDownload} style={{ marginTop: "10px" }}>
      📥 Tải file mẫu Excel (có dropdown)
    </button>
  );
}
