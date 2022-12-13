require("dotenv").config();
import "./authentication/estrategias-autenticacao"
const db = require("./database/models/index")
import app from "./custom/expressConfig";
import ConexaoListas from "./database/redis/conexaoListas";
const port = process.env.APP_PORT;
import middlewares from "./middlewares";
import rotas from "./routes";

async function initialize() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await ConexaoListas()
    app.use(rotas);
    app.use(middlewares.middlewareErro);
    app.listen(port, console.log("Server up and running at port", port));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initialize().then(console.log("Up and running"))

export default app