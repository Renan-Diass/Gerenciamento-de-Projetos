const { Sequelize } = require('sequelize')

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            database: 'terceiraavaliacao',
            host: 'localhost',
            username: 'root',
            dialect: 'mysql',
            password: 'Ruhankaio2005'
        })    
    }
}

module.exports = new Database()