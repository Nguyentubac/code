import Swal from "sweetalert2";
import styles from "./successalert.module.css"; // Nếu có CSS module

export const showSuccessAlert = (message) => {
  return Swal.fire({
    title: "🎉 Thành công!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
    background: "#f1f1f1",
    color: "#333",
    customClass: {
      popup: styles.popup,
      title: styles.title,
      confirmButton: styles.confirmButton,
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};