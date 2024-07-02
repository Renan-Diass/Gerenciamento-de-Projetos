const request = require("supertest");
const app = require("../../../src/index");

describe ('Update user', () => {

    beforeAll(async () => {
        console.log('Iniciando testes de update')
    })

    afterAll(async () => {
        console.log('Finalizando testes de update')
    })

it('atualizar usuário', async () => {

    const user = await request(app)
        .put('/api/v1/users/1')
        .send({
            name: 'Renanatualizado',
            email: 'renanAtualizado@gmail.com',
            password: 'senha1234'
        })

    expect(user.statusCode).toBe(200);
    expect(user.name).toEqual(user.name)
    expect(user.email).toEqual(user.email)


})
})