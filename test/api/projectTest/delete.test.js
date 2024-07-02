const app = require('../../../src/index')
const request = require('supertest')

describe('project API', () => {

    beforeAll(async () => {
        console.log('Starting delete project tests')
    })

    afterAll(async () => {
        console.log('finishing delete project tests')
    })

    it('Delete project', async () => {
        const response = await request(app)
            .delete('/api/v1/projects/17');
        console.log(response.body)
        expect(response.statusCode).toBe(204);
    })

})