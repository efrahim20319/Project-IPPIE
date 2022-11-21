require("dotenv").config();
const db = require("./database/models/index")
import app from "./custom/expressConfig";
const port = process.env.APP_PORT;
import middlewares from "./middlewares";
import rotas from "./routes";

try {
  db.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    });
  app.use(rotas);
  app.use(middlewares.middlewareErro);
  app.listen(port, console.log("Server up and running at port", port));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}