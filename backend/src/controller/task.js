const task = require('../model/task')
const projectController = require('./project')

class TaskController {

    async createTask(title, description, conclusionDt, status, projectId, transaction) {
        if (title === undefined) {
            throw new Error('title is mandatory ')
        }
        if (description === undefined) {
            throw new Error('description is mandatory')
        }
        if (projectId === undefined) {
            throw new Error('projectId is mandatory')
        }

        await projectController.findProject(projectId)

        const taskValue = await task.create({
            title,
            description,
            conclusionDt,
            status,
            projectId
        }, { transaction })

        return taskValue;
    }

    async updateTask(id, title, description, conclusionDt, status, projectId, transaction) {
        if (title === undefined) {
            throw new Error('title is mandatory')
        }
        if (description === undefined) {
            throw new Error('description is mandatory')
        }
        if (status === undefined) {
            throw new Error('status is mandatory')
        }

        const taskValue = await this.findTask(id)

        taskValue.title = title,
            taskValue.conclusionDt = conclusionDt,
            taskValue.status = status,
            taskValue.description = description,
            taskValue.projectId = projectId

        taskValue.save({ transaction })

        return taskValue;
    }

    async findTask(id) {
        if (id === undefined) {
            throw new Error('Id is mandatory.')
        }
        const taskValue = await task.findByPk(id)

        if (taskValue === undefined) {
            throw new Error('Task not found.')
        }

        return taskValue;
    }

    async findAllTasks() {
        return task.findAll()
    }

    async findTaskProject(statusQuery){
        return task.findAll(statusQuery)
    }
    
    async deleteTask(id, transaction) {
        if (id === undefined) {
            throw new Error('Id is mandatory.')
        }
        const taskValue = await this.findTask(id)

        taskValue.destroy({ transaction })
    }


}
module.exports = new TaskController()