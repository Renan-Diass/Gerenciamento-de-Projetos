const express = require('express')
const cors = require('cors')
const database = require('./database/db')
const UserApi = require('./api/user')
const UserRouter = require('./routes/user')
const TaskRouter = require('./routes/task')
const ProjectRouter = require('./routes/project')
const AuthMiddleware = require('../middleware/authmiddleware')

const authmiddleware = new AuthMiddleware()

const app = express()
app.use(express.json());

app.use(cors());

app.get('/', (res) => {
    res.status(200).json({ message: 'Hello Word!!' })
})

app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/users', UserApi.createUser)

// // app.use(UserApi.validateToken)
// app.use(authmiddleware.validateToken)
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/projects', ProjectRouter)
app.use('/api/v1/tasks', TaskRouter)

database.db.sync({ force: false })
    .then(_ => {
        if (process.env.NODE_ENV !== 'test' ) {
            app.listen(3000, _ => {
                console.log('Server running on port 3000')
            })
        }
    })
    .catch(e => {
        console.error(`Error initializing the database ${e}`)
    })

module.exports = app

