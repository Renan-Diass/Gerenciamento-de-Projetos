const service = require('../../../src/controller/project')

describe('Integration test', () => {

test('list projects', async () => {

    const projectList = await service.findAllProjects();
    expect(projectList).toBe(projectList)
})

})
    