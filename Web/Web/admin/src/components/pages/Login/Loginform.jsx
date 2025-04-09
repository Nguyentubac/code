import React, { useState } from "react";
import { loginAdmin } from "../../../services/apiAdmin"; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({ email, password });

      if (response?.token) {
        // ✅ Lưu token vào localStorage
        localStorage.setItem("token", response.token);
        console.log("Đăng nhập thành công ✅");

        navigate("/"); // ✅ Điều hướng về trang chính
      } else {
        alert("Đăng nhập thất bại: Không có token");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
