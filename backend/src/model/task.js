const database = require('../database/db')

class Task {
    constructor() {
        this.model = database.db.define('Tasks', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [5, 50],
                        msg: "title must have a maximum of 50 characters and a minimum of 5"
                    }
                }
            },
            description: {
                type: database.db.Sequelize.STRING
            },
            conclusionDt: {
                type: database.db.Sequelize.DATE
            },
            status: {
                type: database.db.Sequelize.STRING,
                defaultValue: 'pendente'
            },
            projectId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'Projects',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Task()).model