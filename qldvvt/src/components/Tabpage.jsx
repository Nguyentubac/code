import React, { useState } from 'react';
import styles from './Tabpage.module.css';
import DriverInfoPage from './../pages/DriverInfoPage';
function Tabpage() {
  // state lưu tab đang active
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'DriverConfirmations', content: <div>{<DriverInfoPage/>}</div> },
    { label: 'Notifications', content: <div>Đây là nội dung của Tab 3</div> },
    { label: 'Payments', content: <div>Đây là nội dung của Tab 3</div> },
    // Có thể thêm nhiều tab tuỳ ý
  ];

  return (
    <div className={styles.container}>
      {/* Thanh tiêu đề tab */}
      <ul className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${styles.tabItem} ${
              activeTab === index ? styles.active : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Khu vực hiển thị nội dung của tab đang active */}
      <div className={styles.tabContent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default Tabpage;
