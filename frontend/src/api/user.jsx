import api from './api';

export const getUsers = async () => {
  const response = await api.get('/api/v1/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/users/${id}`);
  return response.data;
};


export const createUser = async (user) => {
  const response = await api.post('/api/v1/users', user, {
    withCredentials: true
  });
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1/user/${id}`);
};

export const loginUser = async (email, password) => {
  const body = { email, password };
  const response = await api.post('/api/v1/login', body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};