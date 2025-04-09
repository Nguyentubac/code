import api from "./api";

// Lấy danh sách RouteTrip
export const getRouteTrips = async () => {
  const res = await api.get("/routetrips");
  return res.data;
};

// Lấy 1 RouteTrip theo ID
export const getRouteTripById = async (id) => {
  const res = await api.get(`/routetrips/${id}`);
  return res.data;
};

// Thêm mới RouteTrip
export const createRouteTrip = async (routeTrip) => {
  const res = await api.post("/routetrips", routeTrip);
  return res.data;
};

// Cập nhật RouteTrip
export const updateRouteTrip = async (id, routeTrip) => {
  const res = await api.put(`/routetrips/${id}`, routeTrip);
  return res.data;
};

// Xóa RouteTrip
export const deleteRouteTrip = async (id) => {
  await api.delete(`/routetrips/${id}`);
};
