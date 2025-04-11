import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PaymentInvoice({ payment, rides = [] }) {
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

  return (
    <div>
      <div ref={invoiceRef} style={{ padding: "1rem", fontFamily: "Arial" }}>
        <h3>HÓA ĐƠN THANH TOÁN #{payment.id}</h3>
        <p><strong>Phương thức:</strong> {["COD", "Momo", "VNPay"][payment.paymentMethod]}</p>
        <p><strong>Số tiền:</strong> {payment.amount.toLocaleString()}₫</p>
        <p><strong>Giảm giá:</strong> {payment.discountAmount?.toLocaleString() || 0}₫</p>
        <p><strong>Tổng cộng:</strong> {payment.totalAmount?.toLocaleString()}₫</p>
        <p><strong>Trạng thái:</strong> {payment.paymentStatus === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        <p><strong>Ngày tạo:</strong> {new Date(payment.createdAt).toLocaleString()}</p>

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

      <button onClick={handleExportPDF}>📄 Xuất PDF</button>
    </div>
  );
}
