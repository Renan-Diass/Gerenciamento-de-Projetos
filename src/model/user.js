const { all } = require('..')
const database = require('../database/db')

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false

            },
            email: {
                type: database.db.Sequelize.STRING,
                unique: {
                    args: true,
                    msg: "email already exists"
                }

            },
            password: {
                type: database.db.Sequelize.STRING,

            }
        })
    }
}

module.exports = (new User()).model