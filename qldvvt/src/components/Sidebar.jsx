import styles from './Sidebar.module.css';
// Ví dụ dùng Font Awesome, bạn import link này trong <head> (public/index.html hoặc Layout)
import 'font-awesome/css/font-awesome.min.css';

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      {/* Menu dọc (icon + text) */}
      <ul className={styles.navMenu}>
        <li className={`${styles.navItem} ${styles.active}`}>
          <i className="fa fa-folder" aria-hidden="true"></i>
          <span>Employee Files</span>
        </li>
        <li className={styles.navItem}>
          <i className="fa fa-file-text" aria-hidden="true"></i>
          <span>Reports</span>
        </li>
        <li className={styles.navItem}>
          <i className="fa fa-dollar" aria-hidden="true"></i>
          <span>Payroll</span>
        </li>
        <li className={styles.navItem}>
          <i className="fa fa-file-invoice-dollar" aria-hidden="true"></i>
          <span>Invoices</span>
        </li>
        <li className={styles.navItem}>
          <i className="fa fa-cog" aria-hidden="true"></i>
          <span>Settings</span>
        </li>
        <li className={styles.navItem}>
          <i className="fa fa-file" aria-hidden="true"></i>
          <span>Documents</span>
        </li>
        {/* ... Thêm các mục khác tuỳ ý ... */}
      </ul>
    </div>
  );
}

export default Sidebar;
