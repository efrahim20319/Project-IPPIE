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
    app.use((_req, res) => {
      // rota para página não encontrada, ou seja, tem que ser o último middleware a ser passado na requisição
      res.status(404).render("tela-404");
    });
    app.listen(port, console.log("Server up and running at port", port));
  }
});
