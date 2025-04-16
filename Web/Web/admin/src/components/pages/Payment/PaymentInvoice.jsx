import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./PaymentInvoice.module.css"; // Import CSS module

export default function PaymentInvoice({ payment, rides = [], onClose }) {
  const invoiceRef = useRef();

  const handleExportPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`Invoice_${payment.id}.pdf`);
  };

  // Bảo vệ việc gọi toLocaleString() khi các giá trị là null hoặc undefined
  const formatAmount = (amount) => {
    return (amount ?? 0).toLocaleString() + "₫";
  };

  return (
    <div className={styles.invoiceContainer}>
      <div ref={invoiceRef}>
        <div className={styles.invoiceHeader}>
          <h3>HÓA ĐƠN THANH TOÁN #{payment.id}</h3>
        </div>

        <div className={styles.invoiceDetails}>
          <p><strong>Phương thức:</strong> {["COD", "Momo", "VNPay"][payment.paymentMethod] || "Khác"}</p>
          <p><strong>Số tiền:</strong> {formatAmount(payment.amount)}</p>
          <p><strong>Giảm giá:</strong> {formatAmount(payment.discountAmount)}</p>
          <p><strong>Tổng cộng:</strong> {formatAmount(payment.totalAmount)}</p>
          <p><strong>Trạng thái:</strong> {payment.paymentStatus === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</p>
          <p><strong>Ngày tạo:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
        </div>

        <div className={styles.rideSection}>
          <h4>🚐 Chuyến đi liên quan:</h4>
          {rides.length === 0 ? (
            <p>Không có chuyến đi liên kết.</p>
          ) : (
            <ul>
              {rides.map((r) => (
                <li key={r.id}>
                  #{r.id} – {r.pickupLocation} ➝ {r.dropoffLocation} ({new Date(r.pickupTime).toLocaleString()})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={handleExportPDF}>📄 Xuất PDF</button>
        <button className={styles.closeBtn} onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
