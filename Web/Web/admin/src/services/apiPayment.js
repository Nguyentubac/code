import api from "./api";

export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};

export const getPaymentById = async (id) => {
  const res = await api.get(`/payments/${id}`);
  return res.data;
};

export const createPayment = async (paymentData) => {
  const res = await api.post("/payments", paymentData);
  return res.data;
};

export const updatePayment = async (id, paymentData) => {
  const res = await api.put(`/payments/${id}`, paymentData);
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await api.delete(`/payments/${id}`);
  return res;
};
