const app = require("./custom/expressConfig")
const telas = require("./controller/telas")
const config = require("config")
const port = config.get("app.porta")

app.use("/", telas)


app.use((req, res) => {
    res.status(404).send("<h1>Pagina nao encontrada</h1>")
})

app.listen(port, console.log("Server up and running at port", port))
