import api from "./api";

export const getTasks = async () => {
    const response = await api.get("/api/v1/tasks");
    return response.data;
    }

export const getTaskById = async (id
    ) => {
    const response = await api.get(`/api/v1/tasks/${id}`);
    return response.data;
    }

export const createTask = async (task) => {
    const response = await api.post("/api/v1/tasks", task);
    return response.data;
    }

export const updateTask = async (id, task) => {
    const response = await api.put(`/api/v1/tasks/${id}`, task);
    return response.data;
    }

export const deleteTask = async (id) => {
    return api.delete(`/api/v1/tasks/${id}`);
    }
