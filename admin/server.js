import { config } from "dotenv";
import app from "./custom/constom-express.js";
import rotas from "./routes/index.js"
config()
const port = process.env.ADMIN_PORT

app.use(rotas)


app.listen(port, console.log("Server up and running at port", port))