const app = require('../../../src/index')
const request = require('supertest')

describe('Project API', () => {

    beforeAll(async () => {
        console.log('starting project listing test')
    })

    afterAll(async () => {
        console.log('finishing project listing test')
    })

    it('List projects', async () => {
        const response = await request(app)
            .get('/api/v1/projects')

        expect(response.statusCode).toBe(200);
    })
})