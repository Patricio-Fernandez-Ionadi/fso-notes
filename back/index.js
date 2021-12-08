// como cargar estaticos con node vanilla
// https://midu.dev/como-servir-html-estatico-con-node-js/

require("dotenv").config()
require("./mongo")

const express = require("express")
const app = express()
const cors = require("cors")

const notFound = require("./middlewares/notFound")
const handleError = require("./middlewares/handleError")

const usersRouter = require("./controllers/users")
const notesRouter = require("./controllers/notes")
const loginRouter = require("./controllers/login")
const testingRouter = require("./controllers/test")

app.use(express.json())
app.use(cors())

app.use(express.static("../front/build"))

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
if (process.env.NODE_ENV === "test") {
	app.use("/api/testing", testingRouter)
}

app.use(notFound)
app.use(handleError)

// const PORT = process.env.NODE_ENV === "test" ? 1234 : 3001
const PORT = 3001
const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
)

module.exports = { app, server }

// "mongoose": "5.11.15" 6/12/21
