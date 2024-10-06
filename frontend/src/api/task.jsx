import api from "./api";

const getCsrfToken = async () => {
    const response = await api.get('/csrf-token', { withCredentials: true });
    return response.data.csrfToken;
  };

export const getTasks = async (page = 1) => {
    const response = await api.get("/api/v1/task", {
        params: {
        page: page,
        },
    });
    return response.data;
    }

export const getTaskById = async (id
    ) => {
    const response = await api.get(`/api/v1/task/${id}`);
    return response.data;
    }

export const createTask = async (task) => {
    const csrfToken = await getCsrfToken(); 
    const response = await api.post("/api/v1/task", task, {
        headers: {
          'CSRF-Token': csrfToken 
        },
        withCredentials: true
      });
    return response.data;
    }

export const updateTask = async (id, task) => {
    const csrfToken = await getCsrfToken(); 
    const response = await api.put(`/api/v1/task/${id}`, task, {
        headers: {
          'CSRF-Token': csrfToken 
        },
        withCredentials: true
      });
    return response.data;
    }

export const deleteTask = async (id) => {
    const csrfToken = await getCsrfToken();
    return api.delete(`/api/v1/task/${id}`,
    {
        headers: {
          'CSRF-Token': csrfToken 
        },
        withCredentials: true
      }
    );
    }
