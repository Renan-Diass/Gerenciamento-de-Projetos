const app = require('../../../src/index')
const request = require('supertest')

describe('List', () => {

    beforeAll(async () => {
        console.log('Iniciando testes de listagem')
    })

    afterAll(async () => {
        console.log('Finalizando testes de listagem')
    })

    it('Listar usuários', async () => {
        const response = await request(app)
            .get('/api/v1/users')

        expect(response.statusCode).toBe(200);
    })
})