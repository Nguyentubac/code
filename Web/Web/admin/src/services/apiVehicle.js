import api from "./api";

export const getVehicles = async () => {
    try {
        const response = await api.get("/vehicle");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải danh sách phương tiện:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Không thể tải danh sách phương tiện");
    }
};

export const getVehicle = async (id) => {
    try {
        const response = await api.get(`/vehicle/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải thông tin phương tiện:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Không thể tải thông tin phương tiện");
    }
};


export const addVehicle = async (vehicle) => {
    try {
        const response = await api.post("/vehicle", vehicle);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm phương tiện:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Không thể thêm phương tiện");
    }
};

export const updateVehicle = async (id, vehicle) => {
    try {
        await api.put(`/vehicle/${id}`, vehicle);
    } catch (error) {
        console.error("Lỗi khi cập nhật phương tiện:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Không thể cập nhật phương tiện");
    }
};

export const deleteVehicle = async (id) => {
    try {
        await api.delete(`/vehicle/${id}`);
    } catch (error) {
        console.error("Lỗi khi xóa phương tiện:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Không thể xóa phương tiện");
    }
};

// Thêm default export
export default {
    getVehicles,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
};
