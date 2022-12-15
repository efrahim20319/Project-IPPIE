
import app from "./app";
import ConexaoListas from "./database/redis/conexaoListas";
const port = process.env.APP_PORT;
const db = require("./database/models/index")

async function initialize() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await ConexaoListas()
        app.listen(port, () => console.log("Server up and running at port", port));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initialize()
    .then(() => {
        console.log("SERVER RUNNING");
    })
    .catch((error) => {
        console.error("SERVER NOT RUNNING", error);
    })