import api from "./api";

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách thông báo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tải danh sách thông báo");
  }
};

export const getNotification = async (id) => {
  try {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải thông tin thông báo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể tải thông tin thông báo");
  }
};

export const addNotification = async (notification) => {
  try {
    const response = await api.post("/notifications", notification);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm thông báo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể thêm thông báo");
  }
};

export const updateNotification = async (id, notification) => {
  try {
    await api.put(`/notifications/${id}`, notification);
  } catch (error) {
    console.error("Lỗi khi cập nhật thông báo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Không thể cập nhật thông báo");
  }
};
export const getUnreadNotificationCount = async () => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};


export default {
  getNotifications,
  getNotification,
  addNotification,
  updateNotification,
  getUnreadNotificationCount,
};
