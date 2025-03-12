import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../../api/authApi";
import { showSuccessAlert } from "../../../message/SuccesAlert";
import { showErrorAlert } from "../../../message/ErrorAlert";
import { FaUser, FaLock } from "react-icons/fa";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // console.log("🚀 Nút đăng nhập đã được bấm!");
    
        try {
            const data = await login(email, password);
            // console.log("✅ API trả về:", data);
    
            showSuccessAlert("Đăng nhập thành công!").then(() => {
                window.location.href = "/Dasboard";
            });
    
        } catch (err) {
            // console.error("❌ Lỗi khi gọi API:", err);
            showErrorAlert(err.message);
        }
    };
    

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.modalTitle}>Đăng nhập</h2>

            <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input 
                    type="text" 
                    placeholder="Nhập email của bạn" 
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <FaLock className={styles.icon} />
                <input 
                    type="password" 
                    placeholder="Mật khẩu" 
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={styles.submitButton} onClick={handleLogin}>Đăng nhập</button>
        </div>
    );
};

export default Login;