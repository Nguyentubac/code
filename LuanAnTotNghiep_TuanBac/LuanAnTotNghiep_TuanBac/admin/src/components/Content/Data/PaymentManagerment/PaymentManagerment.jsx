import React, { useState } from "react";
import styles from "./PaymentManagerment.module.css";

const PaymentManagerment = () => {
  const [payments] = useState([
    { id: 1, rideId: 101, paymentMethod: "Credit Card", amount: 25.5, paymentStatus: "Completed", createdAt: "2024-03-07", updatedAt: "2024-03-07" },
    { id: 2, rideId: 102, paymentMethod: "PayPal", amount: 15.0, paymentStatus: "Pending", createdAt: "2024-03-06", updatedAt: "2024-03-06" },
    { id: 3, rideId: 103, paymentMethod: "PayPal", amount: 15.0, paymentStatus: "Pending", createdAt: "2024-03-06", updatedAt: "2024-03-06" },
    { id: 4, rideId: 104, paymentMethod: "PayPal", amount: 15.0, paymentStatus: "Pending", createdAt: "2024-03-06", updatedAt: "2024-03-06" },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Id</th>
            <th>Ride Id</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(payment.id)}
                  onChange={() => toggleSelectRow(payment.id)}
                />
              </td>
              <td>{payment.id}</td>
              <td>{payment.rideId}</td>
              <td>{payment.paymentMethod}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.paymentStatus}</td>
              <td>{payment.createdAt}</td>
              <td>{payment.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagerment;