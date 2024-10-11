import api from './api';

export const getProjects = async () => {
    const response = await api.get('/api/v1/projects');
    return response.data;
}

export const getProjectById = async (id) => {
    const response = await api.get(`/api/v1/projects/${id}`);
    return response.data;
}


export const createProject = async (project) => {
    const response = await api.post('/api/v1/projects', project);
    return response.data;
}

export const updateProject = async (id, project) => {
    const response = await api.put(`/api/v1/projects/${id}`, project);
    return response.data;
}

export const deleteProject = async (id) => {
    return api.delete(`/api/v1/projects/${id}`);
}