const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./database/db');
const UserApi = require('./api/user');
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');
const ProjectRouter = require('./routes/project');
const AuthMiddleware = require('../middleware/authmiddleware');
// const csrf = require('csurf');

const authmiddleware = new AuthMiddleware();
const app = express();
// const csrfProtection = csrf({ cookie: true });

app.use(express.json());
// app.use(cookieParser());

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173',
     credentials: true,
}));

// // Endpoint para obter o token CSRF
// app.get('/csrf-token', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
// });

// app.use(csrfProtection);

// Rotas
app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/users', UserApi.createUser);
// Middleware de autenticação

// Aplicar proteção CSRF antes das rotas que precisam
app.use(authmiddleware.validateToken);



// Rotas adicionais
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/tasks', TaskRouter);
app.use('/api/v1/projects', ProjectRouter);

// Sincronização do banco de dados
database.db.sync({ force: false })
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
            app.listen(3000, () => {
                console.log('Server running on port 3000');
            });
        }
    })
    .catch(e => {
        console.error(`Error initializing the database ${e}`);
    });

module.exports = app;
