module.exports = {
    port : process.env.PORT || 8080,
    db : {
        database: process.env.DB_ENV || "lyfting",
        user: process.env.DB_ENV || "node",
        password: process.env.DB_PASS || "passw0rd",
        options: {
            dialect: process.env.DIALECT || "mysql",
            host: process.env.HOST || "localhost",
            storage: "./lyfting.sql",
            define: {
                timestamps: false
            }
        }
        
    }
}