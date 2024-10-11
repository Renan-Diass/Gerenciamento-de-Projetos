import React, { useState, useEffect } from 'react';
import { getProjects } from '../../api/project';
import { createTask, deleteTask, getTasks } from '../../api/task';
import { toast } from 'react-toastify';
import './styles.css';

const TaskForm = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [conclusionDate, setConclusionDate] = useState('');
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await getProjects();
            setProjects(response);
        };

        fetchProjects();
        fetchTasks();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedProject || !title) {
            alert('Por favor, selecione um projeto e insira um título.');
            return;
        }

        const newTask = {
            title,
            description,
            projectId: selectedProject,
            conclusionDt: conclusionDate,
            status: 'pendente',
        };

        try {
            const response = await createTask(newTask);
            if (!response) {
                toast('Erro ao criar a tarefa!');
                return;
            }

            setTitle('');
            setDescription('');
            setSelectedProject('');
            setConclusionDate('');
            
            fetchTasks();

        } catch (error) {
            if (error.response?.status === 403) {
                return toast("Sem permissão.");
            }
            if (error.response?.status === 401 || error.response?.status === 404) {
                return toast('Erro inesperado, tente novamente mais tarde!');
            }
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const response = await deleteTask(id);
            if (!response) {
                toast('Erro ao deletar tarefa!');
                return;
            }

            fetchTasks();
        } catch (error) {
            return toast('Erro ao deletar tarefa, tente novamente.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="project">Selecionar Projeto:</label>
                    <select
                        id="project"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                    >
                        <option value="">Selecione um projeto</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="conclusionDt">Data de Conclusão:</label>
                    <input
                        type="date"
                        id="conclusionDt"
                        value={conclusionDate}
                        onChange={(e) => setConclusionDate(e.target.value)}
                    />
                </div>
                <button type="submit">Criar Tarefa</button>
            </form>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.title}</span>
                        <span>{task.description}</span>
                        <span>Autor ID: {task.autorId}</span>
                        <div>
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TaskForm;
