const express = require("express");
const bodyParse = require("body-parser");
const app = express();

app.use(bodyParse.json());

const database = require("./utils/database");
const feedRouter = require("./router/feed");
const userRouter = require("./router/user");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRouter);
app.use("/feed", feedRouter);

database
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
