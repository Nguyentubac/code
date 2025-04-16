import React, { useEffect, useState } from "react";
import { getRides } from "../../../services/apiRide";
import styles from "./PaymentDetailModal.module.css";
import PaymentInvoice from "./PaymentInvoice";

export default function PaymentDetailModal({ payment, onClose }) {
    const [relatedRides, setRelatedRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const data = await getRides();
                const linked = data.filter((r) => r.paymentId === payment.id);
                setRelatedRides(linked);
            } catch (err) {
                console.error("❌ Lỗi tải ride liên quan:", err);
            }
        };
        fetchRides();
    }, [payment]);

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) {
          return "0₫";
        }
        return Number(amount).toLocaleString() + "₫";
      };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h3>📋 Chi tiết thanh toán #{payment.id}</h3>

                <ul className={styles.infoList}>
                    <li><strong>Phương thức:</strong> {["COD", "Momo", "VNPay"][payment.paymentMethod]}</li>
                    <li><strong>Số tiền gốc:</strong> {formatAmount(payment.amount)}₫</li>
                    <li><strong>Giảm giá:</strong> {formatAmount(payment.discountAmount)}₫</li>
                    <li><strong>Tổng thanh toán:</strong> {formatAmount(payment.totalAmount)}₫</li>
                    <li><strong>Trạng thái:</strong> {payment.paymentStatus === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</li>
                    <li><strong>Ngày tạo:</strong> {new Date(payment.createdAt).toLocaleString()}</li>
                </ul>

                <h4>🚐 Chuyến đi liên quan</h4>
                {relatedRides.length === 0 ? (
                    <p>Không có chuyến đi nào gắn với thanh toán này.</p>
                ) : (
                    <table className={styles.rideTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Điểm đón</th>
                                <th>Điểm trả</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatedRides.map((ride) => (
                                <tr key={ride.id}>
                                    <td>{ride.id}</td>
                                    <td>{ride.pickupLocation}</td>
                                    <td>{ride.dropoffLocation}</td>
                                    <td>{new Date(ride.pickupTime).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className={styles.actions}>
                    {/* Truyền onClose để đóng modal */}
                    <PaymentInvoice payment={payment} rides={relatedRides} onClose={onClose} />
                    {/* <button onClick={onClose}>Đóng</button> */}
                </div>
            </div>
        </div>
    );
}
