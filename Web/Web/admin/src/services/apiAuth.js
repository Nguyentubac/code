import api from './api';

export const login = async ({ email, password }) => {
  const res = await api.post("/admins/login", { email, password });
  return res.data;
};
