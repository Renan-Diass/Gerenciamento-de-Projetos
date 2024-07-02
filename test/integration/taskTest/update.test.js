const service = require('../../../src/controller/task');
const conection = require('../../../src/database/db');

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("update task", async () => {
        const taskData = {
            title: 'titulo task 1 att',
            description: 'descricao task 1 att',
            conclusionDt: '',
            status: "completa",
            projectId: 2
        }

        const { dataValues } = await service.updateTask(2,taskData.title, taskData.description, taskData.conclusionDt,
            taskData.status, taskData.projectId, this.transaction);


        expect(dataValues.title).toBe(taskData.title)
        expect(dataValues.description).toBe(taskData.description)
        expect(dataValues.projectId).toBe(taskData.projectId)
        expect(dataValues.status).toBe(taskData.status)

    })
})