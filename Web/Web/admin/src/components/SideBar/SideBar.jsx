import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

function SideBar({ setSelectedItem }) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(() => {
    const path = location.pathname.split("/")[1];
    return path || "users";
  });

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveItem(path || "users");
  }, [location.pathname]);

  const handleItemClick = (item) => {
    if (item.subItems) {
      setActiveItem(item.key);
    } else {
      setActiveItem(item.key);
      if (typeof setSelectedItem === "function") {
        setSelectedItem(item.key);
      }
      window.location.href = `/${item.key}`;
    }
  };

  const handleSubItemClick = (subKey) => {
    if (typeof setSelectedItem === "function") {
      setSelectedItem(subKey);
    }
    window.location.href = `/${subKey}`;
  };

  const menuItems = [
    {
      key: "vehicles",
      label: "Phương tiện",
      subItems: [
        { key: "vehicles/info", label: "Thông tin phương tiện" },
        { key: "vehicles/status", label: "Trạng thái phương tiện" },
      ],
    },
    { key: "users", label: "Người dùng" },
    { key: "drivers", label: "Tài xế" },
    {
      key: "vehicledriver",
      label: "Phân công",
      subItems: [
        { key: "vehicledriver", label: "Phân công tài xế" },
        { key: "assignment-list", label: "Danh sách phân công" },
      ],
    },
    { key: "Admins", label: "Quản trị" },
    { key: "Notifications", label: "Thông báo" },
    {
      key: "rides",
      label: "Chuyến đi",
      subItems: [
        { key: "Rides", label: "Danh sách chuyến đi" },
        { key: "ride-report", label: "Báo cáo chuyến đi" },
      ],
    },
    {
      key: "payments",
      label: "Thanh toán",
      subItems: [
        { key: "payments", label: "Quản lý thanh toán" },
        { key: "payment-dashboard", label: "Thống kê thanh toán" },
      ],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.key}>
            <div
              className={`${styles.menuItem} ${
                activeItem === item.key ? styles.active : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </div>
            {item.subItems && activeItem === item.key && (
              <ul className={styles.subMenu}>
                {item.subItems.map((sub) => (
                  <li
                    key={sub.key}
                    className={styles.subMenuItem}
                    onClick={() => handleSubItemClick(sub.key)}
                  >
                    {sub.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
