const service = require('../../../src/controller/task')
const conection = require('../../../src/database/db')

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("delete tasks", async () => {
       
         const taskDeleted = await service.deleteTask(5, this.transaction);                
         expect(taskDeleted).toBe()
    

    })
})