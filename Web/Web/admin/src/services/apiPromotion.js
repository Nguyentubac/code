import api from "./api"; // axios

export const getAllPromotions = async () => {
  const res = await api.get("/promotions");
  return res.data;
};

export const createPromotion = async (data) => {
  const res = await api.post("/promotions", data);
  return res.data;
};

export const updatePromotion = async (id, data) => {
  const res = await api.put(`/promotions/${id}`, data);
  return res.data;
};

export const deletePromotion = async (id) => {
  return await api.delete(`/promotions/${id}`);
};