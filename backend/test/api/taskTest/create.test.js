const request = require('supertest')
const app = require('../../../src/index')

describe('TaskAPI', () => {

    beforeAll(async () => {
        console.log('starting create test')
    })

    afterAll(async () => {
        console.log('Finsihing create test')
    })

    test('create task', async () => {
        const task = await request(app)
            .post('/api/v1/tasks')
            .send({
                title: 'titulo task1',
                description: 'descricao task1',
                projectId: 2,
                status: 'completa'
            })

        expect(task.statusCode).toBe(200);
        expect(task.title).toEqual(task.title)
        expect(task.description).toEqual(task.description)
        expect(task.projectId).toEqual(task.projectId)
        expect(task.status).toEqual(task.status)
    })


})