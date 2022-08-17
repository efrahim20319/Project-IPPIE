require("dotenv").config()
import app from "./custom/expressConfig"
import telas from "./routes/telas"
import conexao from "./database/conexao"
const port = process.env.APP_PORT
import RotasUsuario from "./routes/Usuario"
import tabelas from "./database/tabelas"
import middlewares from "./middlewares"


conexao.connect(async (erro) => {
    if (erro) {
        console.error(erro);
    } else {
        await tabelas.init() // inicializacao das tabelas da base de dados
        app.use("/", telas) // telas do site estarão aqui
        app.use("/api", RotasUsuario) // todas as rotas da para a api começarão com o prefixo api
        app.use(middlewares.middlewareErro)
        app.use((req, res) => { // rota para página não encontrada, ou seja, tem que ser o último middleware a ser passado na requisição
            res.status(404).send("<h1>Pagina nao encontrada</h1>")
        })
        app.listen(port, console.log("Server up and running at port", port))
    }
})

