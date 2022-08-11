import mysql from "mysql"
const conexao = mysql.createConnection({
    host: process.env.DBASE_HOST,
    database: process.env.DBASE_NAME,
    password: process.env.DBASE_PASS,
    user: process.env.DBASE_USER,
    port: process.env.DBASE_PORT
})

export default conexao