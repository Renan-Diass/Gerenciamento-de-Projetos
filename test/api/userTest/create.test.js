const request = require('supertest')
const app = require('../../../src/index')

describe('UserApi', () => {

    beforeAll(async () => {
        console.log('Iniciando testes de create')
    })

    afterAll(async () => {
        console.log('Finalizando testes de create')
    })

    test('Criar usuário', async () => {
        const user = await request(app)
            .post('/api/v1/users')
            .send({
                name: 'Renan',
                email: 'renanan@gmail.com',
                password: 'senha1234'
            })

        expect(user.statusCode).toBe(201);
        expect(user.name).toEqual(user.name)
        expect(user.email).toEqual(user.email)
    })


})