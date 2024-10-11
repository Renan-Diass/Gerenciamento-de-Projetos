const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'batata';

class AuthMiddleware {
    async validateToken(req, res, next) {
        const token = req.headers.authorization;
        try {
            if (!token) {
                throw new Error(' Token not found');
            }
            console.log('Antes payload')
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            console.log('Depois payload', payload)

            if (!payload) {
                throw new Error('invalid token');
            }
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

}

module.exports = AuthMiddleware