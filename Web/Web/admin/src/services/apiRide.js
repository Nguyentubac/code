import api from "./api";

// Lấy tất cả chuyến đi
export const getRides = async () => {
  const res = await api.get('/Rides');
  return res.data;
};

// Lấy 1 chuyến đi theo ID
export const getRideById = async (id) => {
  const res = await api.get(`/Rides/${id}`);
  return res.data;
};

// Thêm chuyến đi mới
export const createRide = async (ride) => {
  const res = await api.post("/Rides", ride);
  return res.data;
};

// Cập nhật chuyến đi
export const updateRide = async (id, ride) => {
  const res = await api.put(`/Rides/${id}`, ride);
  return res.data;
};

// Xoá chuyến đi
export const deleteRide = async (id) => {
  const res = await api.delete(`/Rides/${id}`);
  console.log("✅ Phản hồi xoá ride:", res.status);
  return res;
};
export const getPickupStats = async (month, year) => {
  try {
    const res = await api.get("/Rides/pickup-stats", {
      params: { month, year },
    });
    console.log("✅ Dữ liệu thống kê điểm đón:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy thống kê điểm đón:", error?.response?.data || error.message);
    throw error;
  }
};
