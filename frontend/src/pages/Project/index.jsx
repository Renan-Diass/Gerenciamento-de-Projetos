import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createProject, deleteProject, getProjects } from "../../api/project";
import './styles.css'; // Importando o arquivo de estilos

export default function Project() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projects, setProjects] = useState([]);
    const buscarProjetos = async () => {
        const response = await getProjects();
        setProjects(response);
    };

    useEffect(() => {

        buscarProjetos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || description === '') {
            return toast('Name and description are required.');
        }

        try {
            const response = await createProject({ name, description });
            if (!response) {
                return toast('Error creating project!');
            }
            setProjects([...projects, response]);
            setName('');
            setDescription('');
        } catch (error) {
            if (error.response?.status === 403) {
                return toast("Sem permissão.");
            }
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    const handleDeleteProject = async (id) => {
        const respone = await deleteProject(id);
        if (!respone) {
            return toast('Error deleting project!');
        }
        buscarProjetos();

    };

    return (
        <div className="project-container">
            <h1>Project Management</h1>
            <form className="project-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project Name"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                    required
                />
                <button type="submit">Add Project</button>
            </form>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id} className="project-item">
                        <div className="project-details">
                            <span className="project-name">{project.name}</span>
                            <span className="project-description">{project.description}</span>
                            <span className="project-author">Author ID: {project.autorId}</span>
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
