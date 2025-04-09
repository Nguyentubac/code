
import axios from "axios";
const API_URL = 'https://localhost:7278/api'; // Thay đổi URL phù hợp với backend của bạn
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
