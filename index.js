require("dotenv").config();
import app from "./custom/expressConfig";
import conexao from "./database/conexao";
const port = process.env.APP_PORT;
import tabelas from "./database/tabelas";
import middlewares from "./middlewares";
import rotas from "./routes";

conexao.connect(async (erro) => {
  if (erro) {
    console.error(erro);
  } else {
    await tabelas.init(); // inicializacao das tabelas da base de dados
    app.use(rotas);
    app.use(middlewares.middlewareErro);
    app.listen(port, console.log("Server up and running at port", port));
  }
});
