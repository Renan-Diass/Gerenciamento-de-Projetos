const request = require("supertest");
const app = require("../../../src/index");

describe ('Task API', () => {

    beforeAll(async () => {
        console.log('starting test update')
    })

    afterAll(async () => {
        console.log('finish test update')
    })

it('update task', async () => {

    const task = await request(app)
        .put('/api/v1/tasks/2')
        .send({
            title: 'titulo task1 atualizado',
            description: 'descricao task1 atualizado',
            projectId:2,
            status: 'completa'
        })

    expect(task.statusCode).toBe(200);
    expect(task.title).toEqual(task.title)
    expect(task.description).toEqual(task.description)
    expect(task.projectId).toEqual(task.projectId)
    expect(task.status).toEqual(task.status)

})
})