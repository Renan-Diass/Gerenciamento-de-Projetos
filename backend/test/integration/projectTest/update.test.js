const service = require('../../../src/controller/project')
const conection = require('../../../src/database/db')

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })
    
    afterAll(async () => {
        await this.transaction.rollback();
    })
    

    test("udpate project", async () => {
        const projectData = {
            name: 'titulo projeto 1 att',
            description: 'descricao projeto 1 att',
            autorId: 1,
        }
  
        const { dataValues } = await service.updateProjects(2,projectData.name, projectData.description, projectData.autorId, this.transaction);
  
        expect(dataValues.name).toBe(projectData.name)
        expect(dataValues.description).toBe(projectData.description)
        expect(dataValues.autorId).toBe(projectData.autorId)

    })
})