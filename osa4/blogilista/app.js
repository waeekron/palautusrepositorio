const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const mongoose = require("mongoose")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
require("express-async-errors")


const url = config.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((error) => {
    console.log("error connection to mongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
//app.use(middleware.tokenExtractor)
app.use("/api/login", loginRouter)
app.use("/api/blogs",middleware.tokenExtractor ,middleware.userExtractor ,blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
