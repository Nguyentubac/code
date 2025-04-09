import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderBar.module.css";
import NotificationDropdown from "./NotificationDropdown";
//import avatarImg from "../../assets/avatar.png"; // dùng ảnh mặc định hoặc link ảnh user

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>📦 VuBac Admin</div>
      <div className={styles.actions}>
        <NotificationDropdown />
        <div className={styles.avatarContainer}>
          {/* <img src={avatarImg} alt="avatar" className={styles.avatar} /> */}
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
