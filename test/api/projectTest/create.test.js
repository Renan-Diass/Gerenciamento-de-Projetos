const request = require('supertest')
const app = require('../../../src/index')

describe('ProjectAPI', () => {

    beforeAll(async () => {
        console.log('starting project create test')
    })

    afterAll(async () => {
        console.log('Finisihing project create test')
    })

    test('create task', async () => {
        const project = await request(app)
            .post('/api/v1/projects')
            .send({
                name: 'titulo projeto 1',
                description: 'descricao projeto 1',
                autorId: 1,
            })

        expect(project.statusCode).toBe(201);
        expect(project.name).toEqual(project.name)
        expect(project.description).toEqual(project.description)
        expect(project.autorId).toEqual(project.autorId)
    })


})