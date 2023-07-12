require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DBASE_USER,
        password: process.env.DBASE_PASS,
        database: process.env.DBASE_NAME,
        host: process.env.DBASE_HOST,
        dialect: process.env.DBASE_DIALECT,
    },
    test: {
        username: process.env.DBASE_USER,
        password: process.env.DBASE_PASS,
        database: process.env.DBASE_NAME,
        host: process.env.DBASE_HOST,
        dialect: process.env.DBASE_DIALECT,
    },
    production: {
        username: process.env.DBASE_USER,
        password: process.env.DBASE_PASS,
        database: process.env.DBASE_NAME,
        host: process.env.DBASE_HOST,
        dialect: process.env.DBASE_DIALECT,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,
            },
        },
        define: {
            timestamps: false,
        },
    },
}
