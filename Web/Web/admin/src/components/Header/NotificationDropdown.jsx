import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import api from "../../services/api2";
import styles from "./NotificationDropdown.module.css";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const connection = new HubConnectionBuilder()
      .withUrl(`${api.defaults.baseURL}/hubs/notifications`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("🔔 Kết nối SignalR thành công"))
      .catch((err) => console.error("❌ Lỗi kết nối SignalR:", err));

    connection.on("ReceiveUnreadCount", (count) => setUnreadCount(count));
    connection.on("ReceiveNewNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => connection.stop();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <div className={styles.icon} onClick={toggleDropdown}>
        🔔{unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </div>
      {open && (
        <div className={styles.dropdown}>
          <h4>Thông báo mới</h4>
          {notifications.length === 0 ? (
            <p className={styles.empty}>Không có thông báo mới.</p>
          ) : (
            <ul className={styles.list}>
              {notifications.map((n, idx) => (
                <li key={idx} className={styles.item}>
                  <strong>{n.title}</strong>
                  <p>{n.message}</p>
                  <span className={styles.time}>
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
