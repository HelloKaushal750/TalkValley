const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { UserController } = require("./controller/User.controller");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", UserController);

const port = process.env.PORT;

connection.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});
