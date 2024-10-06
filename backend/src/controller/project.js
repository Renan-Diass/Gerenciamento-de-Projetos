const project = require('../model/project');
const task = require('../model/task');
const UserController = require('./user');

class ProjectController {

    async createProjects(name, description, autorId, transaction) {
        this.validateMandatoryFields({ name, description, autorId });

        await UserController.findUser(Number(autorId));

        const projectValue = await project.create({
            name,
            description,
            autorId
        }, { transaction });

        return projectValue;
    }

    async updateProjects(id, name, description, autorId, transaction) {
        this.validateMandatoryFields({ name, description });

        const projectValue = await this.findProject(id);

        projectValue.name = name;
        projectValue.description = description;
        if (autorId !== undefined) {
            projectValue.autorId = autorId; // Atualiza apenas se fornecido
        }
        
        await projectValue.save({ transaction }); // Aguardar a Promise

        return projectValue;
    }

    async deleteProjects(id, transaction) {
        if (id === undefined) {
            throw new Error('Id is required.');
        }
        const projectValue = await this.findProject(id);
        await projectValue.destroy({ transaction }); // Aguardar a Promise
    }

    async findProject(id) {
        if (id === undefined) {
            throw new Error('Id is mandatory.');
        }

        const projectValue = await project.findByPk(id);

        if (!projectValue) {
            throw new Error('Project not found.');
        }

        return projectValue;
    }

    async findAllProjects() {
        return project.findAll();
    }

    async findProjectsTask(projectId, status) {
        if (projectId === undefined) {
            throw new Error('Project id is mandatory.');
        }

        const statusQuery = {
            where: { projectId }
        };

        if (status) {
            statusQuery.where.status = status;
        }

        const tasks = await task.findAll(statusQuery);

        if (tasks.length === 0) { // Verifique se o array está vazio
            throw new Error('No tasks found.');
        }

        return tasks;
    }

    // Função para validar campos obrigatórios
    validateMandatoryFields(fields) {
        for (const [key, value] of Object.entries(fields)) {
            if (value === undefined) {
                throw new Error(`${key} is mandatory.`);
            }
        }
    }
}

module.exports = new ProjectController();
