import React, { useEffect, useState } from "react";
import styles from "./UserAction.module.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import api from "../../services/api2";

const UserAction = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ Không tìm thấy token, chưa kết nối SignalR.");
      return;
    }

    const connection = new HubConnectionBuilder()
      .withUrl(`${api.defaults.baseURL}/hubs/notifications`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    let isMounted = true;

    connection
      .start()
      .then(() => {
        if (isMounted) console.log("✅ Đã kết nối SignalR");
      })
      .catch((err) => {
        console.error("❌ Lỗi kết nối SignalR:", err);
      });

    connection.on("ReceiveUnreadCount", (count) => {
      if (isMounted) setUnreadCount(count);
    });

    return () => {
      isMounted = false;
      connection.stop();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.userActions}>
      <span className={styles.icon}>
        🔔 {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </span>
      <button className={styles.link}>Account</button>
      <button onClick={handleLogout} className={styles.link}>
        Log out
      </button>
    </div>
  );
};

export default UserAction;
