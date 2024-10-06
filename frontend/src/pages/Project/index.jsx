import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { toast } from "react-toastify"
import { createProject } from "../../api/project"
import { useCookies } from "react-cookie"

export default function Project() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [autorId, setAutorId] = useState('')

    const [projects, setProjects] = useState([])

    //const [cookies] = useCookies(['_csrf']);
    //const cookieValue = cookies['_csrf'];

    const cookieValue = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || description === '') {
            return toast('Name and description are required.');
        }

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setAutorId(decoded.id);
            }
            
            const response = await createProject({name, description, autorId});
            setProjects([...projects, response]);
            setName('');
            setDescription('');
            setAutorId('');
        } catch (error) {
            console.log(error)
            if (error.response === 403) {
                return toast("Sem permissão.");
            }
            if (error.response === 401 || error.response === 404) {
                return toast('Email ou password inválido, tente novamente!');
            }
            console.log(error)
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
    }


    return (
        <div className="project-container">
            <h1>Project</h1>
            <div className="project-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={autorId}
                    onChange={(e) => setAutorId(e.target.value)}
                    placeholder="AutorId"
                />
                <button onClick={handleSubmit}>Add</button>
            </div>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id}>
                        <span>{project.name}</span>
                        <span>{project.description}</span>
                        <span>{project.autorId}</span>
                        <div>
                            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}