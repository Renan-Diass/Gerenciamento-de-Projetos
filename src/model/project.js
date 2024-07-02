const database = require('../database/db')

class Project {
    constructor() {
        this.model = database.db.define('Projects', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [5, 50],
                        msg: "name must have a maximum of 50 characters and a minimum of 5"
                    }
                }
                },
                description: {
                    type: database.db.Sequelize.STRING
                },
                autorId: {
                    type: database.db.Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                }
            })
    }
}

module.exports = (new Project()).model