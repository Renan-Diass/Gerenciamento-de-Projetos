const app = require('../../../src/index')
const request = require('supertest')

describe('Task API', () => {

    beforeAll(async () => {
        console.log('starting listing test')
    })

    afterAll(async () => {
        console.log('finishing listing test')
    })

    it('list tasks', async () => {
        const task = await request(app)
            .get('/api/v1/tasks')

        expect(task.statusCode).toBe(200);
    })
})