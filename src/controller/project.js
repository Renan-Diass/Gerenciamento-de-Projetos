const project = require('../model/project')
const task = require('../model/task')
const TaskController = require('./task')
const UserController = require('./user')


class projectController {

    async createProjects(name, description, autorId, transaction) {
        if (name === undefined) {
            throw new Error('name is mandatory')
        }
        if (description === undefined) {
            throw new Error('description is mandatory')
        }
        if (autorId === undefined) {
            throw new Error('authorId is mandatory')
        }

        await UserController.findUser(Number(autorId))

        const projectValue = await project.create({
            name,
            description,
            autorId
        },
            { transaction })

        return projectValue;
    }


    async updateProjects(id, name, description, autorId, transaction) {
        if (name === undefined) {
            throw new Error('name is mandatory')
        }
        if (description === undefined) {
            throw new Error('description is mandatory')
        }

        const projectValue = await this.findProject(id)

        projectValue.name = name,
            projectValue.description = description,
            projectValue.autorId = autorId,
            projectValue.save({ transaction })

        return projectValue;
    }

    async deleteProjects(id, transaction) {
        if (id === undefined) {
            throw new Error('Id is required.')
        }
        const projectValue = await this.findProject(id)
        projectValue.destroy({ transaction })
        return;
    }

    async findProject(id) {
        if (id === undefined) {
            throw new Error('Id is mandatory.')
        }

        const projectValue = await project.findByPk(id)

        if (!projectValue) {
            throw new Error('Project not found.')
        }

        return projectValue;
    }

    async findAllProjects() {
        return project.findAll()
    }

    async findProjectsTask(projectId, status) {

        

        if (projectId === undefined) {
            throw new Error('Proejct id is mandatory.')
        }

        const statusQuery = ({ where: { projectId } })

        if (status) {
            statusQuery.where.status = status
        }

        const tasks = await task.findAll(statusQuery)

        if (tasks === undefined) {
            throw new Error('Tasks not found.')
        }

        return tasks;
    }

}

module.exports = new projectController()