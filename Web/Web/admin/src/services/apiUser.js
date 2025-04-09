import api from "./api";
  // API lấy danh sách người dùng
  export const getUsers = async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể tải danh sách người dùng");
    }
  };
  
  // API thêm người dùng
  export const addUser = async (user) => {
    try {
      const response = await api.post('/user', user);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể thêm người dùng");
    }
  };
  
  // API xóa người dùng
  export const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể xóa người dùng");
    }
  };

  export const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/user/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể cập nhật người dùng");
    }
  };
  