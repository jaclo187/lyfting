const bluebird = require('bluebird')

module.exports = {
    port : process.env.PORT || 8080,
    db : {
        host: 'localhost',
        database: process.env.DB_ENV || "lyfting",
        port: 3306,
        user: process.env.DB_USER || "node",
        password: process.env.DB_PASS || "passw0rd",
        Promise: bluebird,
        options: {
            dialect: process.env.DIALECT || "mysql",
            host: process.env.HOST || "localhost",
            charset: 'utf8',
            storage: "./lyfting.sql",
            define: {
                timestamps: false
            }
        }
    },
    jwt : {
        secret: process.env.JWT_SECRET || "supersecretsecret"
    }
}