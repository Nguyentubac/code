import Swal from "sweetalert2";
import styles from "./erroralert.module.css"; // Import CSS module

export const showErrorAlert = (message) => {
    return Swal.fire({
    title: "❌ Oops...",
    text: message,
    icon: "error",
    confirmButtonText: "Thử lại",
    confirmButtonColor: "#d33",
    background: "#fff5f5",
    color: "#721c24",
    customClass: {
      popup: styles.popup,
      title: styles.title,
      confirmButton: styles.confirmButton,
    },
    showClass: {
      popup: "animate__animated animate__shakeX",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOut",
    },
  });
};