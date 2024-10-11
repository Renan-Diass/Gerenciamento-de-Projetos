const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'batata'
const SALT_VALUE = 10

class UserController {
    async createUser(name, email, password, transaction) {
        if (name === undefined || email === undefined || password === undefined) {
            throw new Error('name, email and password are mandatory.')
        }

        const cypherPassword = await bcrypt.hash(password, SALT_VALUE)

        const userValue = await user.create({
            name,
            email,
            password: cypherPassword
        }, { transaction })

        return userValue
    }

    async findUser(id) {
        if (id === undefined) {
            throw new Error('id is mandatory.')
        }

        const userValue = await user.findByPk(id)

        if (!userValue) {
            throw new Error('user not found.')
        }

        return userValue;
    }

    async updateUser(id, name, email, password, transaction) {
        if (!name || !email || !password) {
            throw new Error('name, email and password are mandatory.')
        }

        const userValue = await this.findUser(id)

        userValue.name = name
        userValue.email = email
        userValue.password = await bcrypt.hash(password, SALT_VALUE)
        await userValue.save({ transaction})

        return userValue;
    }

    async delete(id, transaction) {
        if (id === undefined) {
            throw new Error('id is mandatory.')
        }
        const userValue = await this.findUser(id)
        userValue.destroy({ transaction})

        return
    }

    async find() {
        return user.findAll()
    }

    async login(email, password) {
        if (email === undefined || password === undefined) {
            throw new Error('email and password are mandatroy.')
        }

        const userValue = await user.findOne({ where: { email } })

        if (userValue ===   undefined) {
            throw new Error('[1] username or password is invalid.')
        }

        const passwordValidate = await bcrypt.compare(password, userValue.password)
        if (passwordValidate === undefined) {
            throw new Error('[2] username or password is invalid.')
        }

        return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: 60 * 60 })
    }
}

module.exports = new UserController()