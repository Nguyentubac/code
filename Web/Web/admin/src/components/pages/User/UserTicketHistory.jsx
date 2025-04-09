// import React, { useEffect, useState } from "react";
// import { getTicketsByUser } from "../../../services/apiTicket"; // hoặc apiUser nếu chung

// export default function UserTicketHistory({ userId, onClose }) {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTickets();
//   }, [userId]);

//   const fetchTickets = async () => {
//     try {
//       const data = await getTicketsByUser(userId);
//       setTickets(data);
//     } catch (err) {
//       console.error("Lỗi khi lấy lịch sử vé:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "1rem", minWidth: "400px" }}>
//       <h3>Lịch Sử Đặt Vé</h3>
//       {loading ? (
//         <p>Đang tải dữ liệu...</p>
//       ) : tickets.length === 0 ? (
//         <p>Người dùng chưa đặt vé nào.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Mã vé</th>
//               <th>Tuyến</th>
//               <th>Thời gian</th>
//               <th>Trạng thái</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket) => (
//               <tr key={ticket.ticketId}>
//                 <td>{ticket.ticketId}</td>
//                 <td>{ticket.route}</td>
//                 <td>{new Date(ticket.time).toLocaleString()}</td>
//                 <td>{ticket.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div style={{ marginTop: "1rem", textAlign: "right" }}>
//         <button onClick={onClose}>Đóng</button>
//       </div>
//     </div>
//   );
// }
