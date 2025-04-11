import React, { useEffect, useState } from "react";
import {
    getPayments,
    updatePayment,
} from "../../../services/apiPayment";
import Swal from "sweetalert2";
import styles from "../User/UserManagement.module.css";
import PaymentDetailModal from "./PaymentDetailModal";
import ExportExcel from "./ExportExcel";

export default function PaymentManagement() {
    const [payments, setPayments] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selected, setSelected] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        filterPayments();
    }, [payments, statusFilter, month, year]);

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

        if (statusFilter !== "") {
            result = result.filter((p) => p.paymentStatus.toString() === statusFilter);
        }

        if (month) {
            result = result.filter((p) => new Date(p.createdAt).getMonth() + 1 === Number(month));
        }

        if (year) {
            result = result.filter((p) => new Date(p.createdAt).getFullYear() === Number(year));
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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>💳 Quản lý thanh toán</h2>

            {/* Bộ lọc */}
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
                <input
                    type="number"
                    placeholder="Năm"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min="2020"
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <ExportExcel data={filtered} fileName={`Payments_${month}_${year}.xlsx`} />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PTTT</th>
                        <th>Số tiền</th>
                        <th>Giảm giá</th>
                        <th>Tổng cộng</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{["COD", "Momo", "VNPay"][p.paymentMethod] || "Khác"}</td>
                            <td>{p.amount.toLocaleString()}₫</td>
                            <td>{p.discountAmount?.toLocaleString() || 0}₫</td>
                            <td>{p.totalAmount?.toLocaleString()}₫</td>
                            <td>{p.paymentStatus === 1 ? "✅ Đã thanh toán" : "⌛ Chưa thanh toán"}</td>
                            <td>{new Date(p.createdAt).toLocaleString()}</td>
                            <td>
                                {p.paymentStatus === 0 && (
                                    <button onClick={() => handleConfirm(p)} className={styles.confirmBtn}>
                                        Xác nhận
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelected(p)}
                                    className={styles.viewBtn}
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Modal chi tiết */}
            {selected && (
                <PaymentDetailModal
                    payment={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>

    );
}
