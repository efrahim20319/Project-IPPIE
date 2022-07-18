const app = require("./custom/expressConfig")
const telas = require("./controller/telas")

const config = require("config")
const conexao = require("./database/conexao")
const port = config.get("app.porta")
const usuario = require("./controller/Usuario")
const Tabelas = require("./database/tabelas")


conexao.connect(async (erro) => {
    if (erro) {
        console.error(erro);
    } else {
        await Tabelas.init() // inicializacao das tabelas da base de dados
        app.use("/", telas) // telas do site estarão aqui
        app.use("/api", usuario) // todas as rotas da para a api começarão com o prefixo api
        app.use((req, res) => { // rota para página não encontrada, ou seja, tem que ser o último middleware a ser passado na requisição
            res.status(404).send("<h1>Pagina nao encontrada</h1>")
        })
        app.listen(port, console.log("Server up and running at port", port))
    }
})

