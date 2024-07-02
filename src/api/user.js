const UserController = require('../controller/user')

class UserApi {
    async createUser(req, res) {
        const { name, email, password } = req.body

        try {
            const user = await UserController.createUser(name, email, password)
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `error when create user, ${e.message}`})
        }
    }

    async updateUser(req, res) {
        const { id } = req.params
        const { name, email, password } = req.body

        try {
            const userValue = await UserController.updateUser(Number(id), name, email, password)
            return res.status(200).send(userValue)
        } catch (e) {
            return res.status(400).send({ error: `error when updating user, ${e.message}`})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        try {
            await UserController.delete(Number(id))
            return res.status(204).send({ message: `user deleted`})
        } catch (e) {
            return res.status(400).send({ error: `error when deleting user, ${e.message}`})
        }
    }

    async findUsers(req, res) {
        try {
            const users = await UserController.find()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `error when listing user, ${e.message}`})
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        try {
            const token = await UserController.login(email, password)

            res.status(200).send({ token })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

    
}

module.exports = new UserApi()