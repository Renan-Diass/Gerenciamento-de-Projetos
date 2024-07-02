const service = require('../../../src/controller/project')
const conection = require('../../../src/database/db')

describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })

    afterAll(async () => {
        await this.transaction.rollback();
    })

    test("create project", async () => {
        const projectData = {
            name: 'titulo projeto 1',
            description: 'descricao projeto 1',
            autorId: 1,
        }


        const { dataValues } = await service.createProjects(projectData.name, projectData.description,
            projectData.autorId, this.transaction);

        expect(dataValues.name).toBe(projectData.name)
        expect(dataValues.description).toBe(projectData.description)
        expect(dataValues.autorId).toBe(projectData.autorId)

    })
})