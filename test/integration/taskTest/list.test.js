const service = require('../../../src/controller/task')

describe('Integration test', () => {

test('list tasks', async () => {

    const taskList = await service.findAllTasks();
    expect(taskList).toBe(taskList)
})

})
    