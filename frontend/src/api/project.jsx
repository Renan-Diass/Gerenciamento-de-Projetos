import { useCookies } from 'react-cookie';
import api from './api';

export const getProjects = async (page = 1) => {
    const response = await api.get('/api/v1/project', {
        params: {
            page: page,
        }
    });
    return response.data;
}

export const getProjectById = async (id) => {
    const response = await api.get(`/api/v1/project/${id}`);
    return response.data;
}


export const createProject = async (project) => {
    console.log(csrf)
    const response = await api.post('/api/v1/projects', project,{
        data: 'dados aqui'
    }, {
        headers: {
            'CSRF-Token':   csfr// Inclua o token do cookie no cabeçalho
        },
        withCredentials: true, // Para permitir o envio de cookies
    });

    return response.data;
}

export const updateProject = async (id, project) => {
    const csrfToken = await getCsrfToken();
    const response = await api.put(`/api/v1/project/${id}`, project, {
        headers: {
            'CSRF-Token': csrfToken
        },
        withCredentials: true
    });
    return response.data;
}

export const deleteProject = async (id) => {
    const csrfToken = await getCsrfToken();
    return api.delete(`/api/v1/project/${id}`, {
        headers: {
            'CSRF-Token': csrfToken
        },
        withCredentials: true
    });
}