const request = require('supertest')
const app = require('../../../src/index')

describe('ProjectAPI', () => {

    beforeAll(async () => {
        console.log('starting project update test')
    })

    afterAll(async () => {
        console.log('Finisihing project update test')
    })

    test('create task', async () => {
        const project = await request(app)
            .put('/api/v1/projects/3')
            .send({
                name: 'titulo projeto 1 atualizado',
                description: 'descricao projeto 1 atualizado',
                autorId: 1,
            })

        expect(project.statusCode).toBe(201);
        expect(project.name).toEqual(project.name)
        expect(project.description).toEqual(project.description)
        expect(project.autorId).toEqual(project.autorId)
    })


})