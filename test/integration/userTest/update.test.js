const service = require('../../../src/controller/user')
const conection = require('../../../src/database/db')

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("update user", async () => {
        const userData = {
           name: "Renan 100% atualizado",
           email: "renanAt@gmail.com",
           password: "1234567"
        }
  
        const { dataValues } = await service.updateUser(1,userData.name, userData.email, userData.password, this.transaction);
  
        expect(dataValues.name).toBe(userData.name)
        expect(dataValues.email).toBe(userData.email)

    })
})