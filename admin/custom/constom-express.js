import express from "express"

const app = express()
app.use(express.static("./public"))
app.set("view engine", "ejs")

export default app