import api from './api';

// Lấy danh sách Admin
export const getAdmins = async () => {
  try {
    const response = await api.get('/Admins');
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách Admin:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tải danh sách Admin");
  }
};
// Lấy 1 Admin theo ID
export const getAdminById = async (id) => {
  try {
    const response = await api.get(`/Admins/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi tải Admin ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tải thông tin Admin");
  }
};

// Tạo mới Admin
export const createAdmin = async (data) => {
  try {
    const response = await api.post('/Admins', data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo Admin:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tạo Admin");
  }
};

// Cập nhật Admin
export const updateAdmin = async (id, data) => {
  try {
    await api.put(`/Admins/${id}`, data);
  } catch (error) {
    console.error(`Lỗi khi cập nhật Admin ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể cập nhật Admin");
  }
};

// Xoá Admin
export const deleteAdmin = async (id) => {
  try {
    await api.delete(`/Admins/${id}`);
  } catch (error) {
    console.error(`Lỗi khi xoá Admin ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể xoá Admin");
  }
};

// Đăng nhập Admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/Admins/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập Admin:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Sai thông tin đăng nhập");
  }
};
