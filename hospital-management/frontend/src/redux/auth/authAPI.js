import api from "../../api/axios";


export const loginAPI = async ({ email, password }) => {
  const res = await api.post("/auth/login", {
    email,
    password
  });
  return res.data;
};

export const registerAPI = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};
