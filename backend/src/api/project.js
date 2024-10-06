const ProjectController = require('../controller/project');

class ProjectApi {
    async createProject(req, res) {
        console.log('AAA')
        const { name, description, autorId } = req.body;

        if (!name || !description || !autorId) {
            return res.status(400).send({ error: 'Name, description, and authorId are required.' });
        }

        try {
            const project = await ProjectController.createProjects(name, description, autorId);
            return res.status(201).send(project);
        } catch (e) {
            return res.status(400).send({ error: `Error when creating a project: ${e.message}` });
        }
    }

    async updateProject(req, res) {
        const { id } = req.params;
        const { name, description, autorId } = req.body;

        // Validação simples
        if (!name || !description) {
            return res.status(400).send({ error: 'Name and description are required.' });
        }

        try {
            const project = await ProjectController.updateProjects(Number(id), name, description, autorId);
            return res.status(200).send(project); // Status 200 para atualização
        } catch (e) {
            return res.status(400).send({ error: `Error when updating project: ${e.message}` });
        }
    }

    async deleteProject(req, res) {
        const { id } = req.params;

        try {
            await ProjectController.deleteProjects(Number(id));
            return res.status(204).send({ message: 'Project deleted' });
        } catch (e) {
            return res.status(400).send({ error: `Error when deleting project: ${e.message}` });
        }
    }

    async findProjects(req, res) {
        try {
            const projects = await ProjectController.findAllProjects();
            return res.status(200).send(projects);
        } catch (e) {
            return res.status(400).send({ error: `Error when listing projects: ${e.message}` });
        }
    }

    async findProjectsTasks(req, res) {
        const { projectId } = req.params;
        const { status } = req.query;

        try {
            const tasks = await ProjectController.findProjectsTask(projectId, status);
            return res.status(200).send(tasks);
        } catch (e) {
            return res.status(400).send({ error: `Error when listing tasks: ${e.message}` });
        }
    }
}

module.exports = { api: new ProjectApi() };
