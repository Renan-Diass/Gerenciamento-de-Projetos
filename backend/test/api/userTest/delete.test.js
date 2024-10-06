const app = require('../../../src/index')
const request = require('supertest')

describe('user API', () => {

    beforeAll(async () => {
        console.log('Iniciando testes de delete')
    })

    afterAll(async () => {
        console.log('Finalizando testes de delete')
    })

    it('Delete user', async () => {
        const response = await request(app)
            .delete('/api/v1/users/1');
        console.log(response.body)
        expect(response.statusCode).toBe(204);
    })

})