import api from './api';

// 3² - Criar funções para consumir a API

export const getUsers = async () => {
  const response = await api.get('/api/v1/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/user/${id}`);
  return response.data;
};

export const getContext = async () => {
  const response = await api.get(`/api/v1/user/context`);
  return response.data;
};

const getCsrfToken = async () => {
  const response = await api.get('/csrf-token', { withCredentials: true });
  return response.data.csrfToken;
};

export const createUser = async (user) => {
  const csrfToken = await getCsrfToken(); // Obtém o token CSRF
  const response = await api.post('/api/v1/users', user, {
    headers: {
      'CSRF-Token': csrfToken // Inclui o token CSRF no cabeçalho
    },
    withCredentials: true // Necessário se você estiver usando CORS
  });
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1/user/${id}`);
};

export const loginUser = async (email, password) => {
  const csrfToken = await getCsrfToken(); // Obtém o token CSRF
  const body = { email, password };
  const response = await api.post('/api/v1/login', body, {
    headers: {
      'CSRF-Token': csrfToken, // Inclui o token CSRF no cabeçalho
      'Content-Type': 'application/json'
    },
    withCredentials: true // Necessário se você estiver usando CORS
  });
  return response.data;
};