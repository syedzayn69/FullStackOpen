const express = require("express");
const cors = require("cors");
require("express-async-errors");
const app = express();

const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login")

const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to", config.MONGODB_URI);
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
