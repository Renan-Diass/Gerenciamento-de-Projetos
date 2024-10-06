const taskController = require('../controller/task')

class TaskApi {

  async createTask (req,res){
    const { title, description, conclusionDt, status, projectId } = req.body
    try{
        const task = await taskController.createTask(title, description, conclusionDt, status, projectId)
        return res.status(200).send(task)
    } catch (e){
      return res.status(400).send({ error: `Error when creating a task ${e.message}`})
    }
  }

  async updateTask (req,res){
  
    const { id } = req.params
    const { title, description, conclusionDt, status, projectId } = req.body

    try{
      const task = await taskController.updateTask(Number(id) , title, description, conclusionDt, status, projectId)
      return res.status(200).send(task)
    } catch (e){
      return res.status(400).send({ error: `Error when updating task ${e.message}`})
    }
  }

  async findTasks (req,res){
    try{
      const tasks = await taskController.findAllTasks()
      return res.status(200).send(tasks)
    } catch (e){
      return res.status(400).send({ error: `Error when finding tasks ${e.message}`})
    }
  }

  async deleteTask (req,res){
    const { id } = req.params
    try {
     await taskController.deleteTask(Number(id))
      return res.status(200).send({message: 'Task deleted'})
    } catch (e){
      return res.status(400).send({ error: `Error when deleting task ${e.message}`})
    }
  }

}
module.exports = new TaskApi()