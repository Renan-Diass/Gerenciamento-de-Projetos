const service = require('../../../src/controller/user')
const conection = require('../../../src/database/db')

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("create user", async () => {
        const userData = {
           name: "Renan",
           email: "renanste@gmail.com",
           password: "12345678"
        }
  
        const { dataValues } = await service.createUser(userData.name, userData.email, userData.password, this.transaction);
  
        expect(dataValues.name).toBe(userData.name)
        expect(dataValues.email).toBe(userData.email)

    })
})