import api from "./api";

// Lấy toàn bộ phân công
export const getAssignments = async () => {
  try {
    const res = await api.get("/vehicleDriver");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phân công:", error.response?.data || error.message);
    throw error;
  }
};

// Tạo phân công mới (Assign)
export const assignDriverToVehicle = async ({ vehicleId, driverId }) => {
  try {
    const res = await api.post("/vehicleDriver", {
      vehicleId,
      driverId,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi phân công:", error.response?.data || error.message);
    throw error;
  }
};

// Gỡ phân công (Unassign)
export const unassignDriver = async (assignmentId) => {
  try {
    await api.put(`/vehicleDriver/unassign/${assignmentId}`);
  } catch (error) {
    console.error("Lỗi khi hủy phân công:", error.response?.data || error.message);
    throw error;
  }
};
