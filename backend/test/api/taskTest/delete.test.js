const app = require('../../../src/index')
const request = require('supertest')

describe('Task API', () => {

    beforeAll(async () => {
        console.log('starting delete test')
    })

    afterAll(async () => {
        console.log('finishing delete test')
    })

    it('Delete task', async () => {
        const task = await request(app)
            .delete('/api/v1/tasks/8');
        console.log(task.body)
        expect(task.statusCode).toBe(200);
    })

})