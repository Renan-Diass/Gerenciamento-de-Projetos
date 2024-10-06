const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const database = require('./database/db');
const UserApi = require('./api/user');
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');
const ProjectRouter = require('./routes/project');
const AuthMiddleware = require('../middleware/authmiddleware');
const csrf = require('csurf');

const authmiddleware = new AuthMiddleware();
const app = express();
const csrfProtection = csrf({     cookie: {
    httpOnly: true, // O cookie não pode ser acessado via JavaScript
    secure: 'production', // Use cookies seguras em produção
    sameSite: 'Strict', // Defina a política SameSite conforme necessário
} });

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// Aplicar proteção CSRF antes das rotas

// Endpoint para obter o token CSRF

app.use(csrfProtection);

app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.post('/api/v1/login', UserApi.login);

app.post('/api/v1/users', UserApi.createUser);

app.use(authmiddleware.validateToken);

// Rotas protegidas (se necessário)
app.use('/api/v1/users', UserRouter);
//app.post('/api/v1/projects', api.createProject);

app.post('/api/v1/projects', (req, res) => {
    // Se o token CSRF for válido, esta rota será acessada
    res.json({ message: 'Requisição bem-sucedida!', data: req.body });
});
app.use('/api/v1/tasks', TaskRouter);

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
