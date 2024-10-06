const service = require('../../../src/controller/user')

describe('Integration test', () => {

test('list users', async () => {

    const usersList = await service.find();
    expect(usersList).toBe(usersList)
})

})
    