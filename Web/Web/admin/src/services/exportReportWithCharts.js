import ExcelJS from "exceljs";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export const exportReportWithCharts = async ({ chartRefs, data }) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Báo cáo chuyến đi");

  // Ghi dữ liệu bảng
  sheet.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Xe", key: "vehicleDriverId", width: 10 },
    { header: "Tài xế", key: "userId", width: 10 },
    { header: "Điểm đón", key: "pickupLocation", width: 25 },
    { header: "Điểm trả", key: "dropoffLocation", width: 25 },
    { header: "Giờ xuất bến", key: "pickupTime", width: 20 },
    { header: "Trạng thái", key: "statusText", width: 15 },
  ];

  data.forEach((ride) => {
    sheet.addRow({
      ...ride,
      pickupTime: ride.pickupTime ? new Date(ride.pickupTime).toLocaleString() : "—",
      statusText:
        ride.status === 0 ? "Đã lên lịch" : ride.status === 1 ? "Hoàn thành" : "Đã hủy",
    });
  });

  // Thêm ảnh biểu đồ vào file Excel
  for (let i = 0; i < chartRefs.length; i++) {
    const chartRef = chartRefs[i];
    if (chartRef?.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");

      const img = workbook.addImage({
        base64: imgData,
        extension: "png",
      });

      sheet.addImage(img, {
        tl: { col: 0, row: sheet.rowCount + 2 },
        ext: { width: 400, height: 250 },
      });
    }
  }

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "BaoCaoChuyenDi.xlsx");
};
