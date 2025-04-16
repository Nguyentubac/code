import React, { useEffect, useState } from "react";
import { getRides } from "../../../services/apiRide";

export default function RideStats() {
    const [dailyStats, setDailyStats] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getRides();
        const grouped = {};

        data.forEach((ride) => {
            if (!ride.pickupTime) return;

            const dateObj = new Date(ride.pickupTime);
            const date = dateObj.toLocaleDateString("vi-VN").replaceAll("/", "-"); // 👉 dd-MM-yyyy

            grouped[date] = (grouped[date] || 0) + 1;
        });

        const sorted = Object.entries(grouped)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => {
                const [d1, m1, y1] = a.date.split("-").map(Number);
                const [d2, m2, y2] = b.date.split("-").map(Number);
                return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
            });

        setDailyStats(sorted);
    };
    return (
        <div style={{ padding: "1rem" }}>
            <h3>📅 Tổng số chuyến đi theo ngày</h3>
            <br />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Ngày</th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Số chuyến</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyStats.map((entry) => (
                        <tr key={entry.date}>
                            <td style={{ padding: "8px 0" }}>{entry.date}</td>
                            <td>{entry.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
