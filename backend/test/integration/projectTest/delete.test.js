const service = require('../../../src/controller/project')
const conection = require('../../../src/database/db')


describe('Integration test', () => {

    beforeAll(async () => {
        this.transaction = await conection.db.transaction();
    })

    afterAll(async () => {
        await this.transaction.rollback();
    })

    test("delete project", async () => {

        const projectDelete = await service.deleteProjects(4, this.transaction);
        expect(projectDelete).toBe()


    })
})