import api from "./api";

// Lấy danh sách tài xế
export const getDrivers = async () => {
  try {
    const response = await api.get("/drivers");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách tài xế:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tải danh sách tài xế");
  }
};

// Thêm tài xế mới
export const addDriver = async (driverData) => {
  try {
    const response = await api.post("/drivers", driverData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm tài xế:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể thêm tài xế");
  }
};

// Xoá tài xế
export const deleteDriver = async (id) => {
  try {
    await api.delete(`/drivers/${id}`);
  } catch (error) {
    console.error("Lỗi khi xoá tài xế:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể xoá tài xế");
  }
};

// Cập nhật thông tin tài xế
export const updateDriver = async (id, driverData) => {
  try {
    const response = await api.put(`/drivers/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật tài xế:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể cập nhật tài xế");
  }
};
