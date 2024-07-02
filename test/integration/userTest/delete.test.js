const service = require('../../../src/controller/user')
const conection = require('../../../src/database/db')


describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("delete user", async () => {
       
         const userDeleted = await service.delete(4, this.transaction);
         expect(userDeleted).toBe()
    

    })
})