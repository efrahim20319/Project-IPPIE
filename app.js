'use strict';

require("dotenv").config();
import "./authentication/estrategias-autenticacao"
import app from "./custom/expressConfig";
import middlewares from "./middlewares";
import rotas from "./routes";


app.use(rotas);
app.use(middlewares.middlewareErro);

export default app