const express = require("express");
require("dotenv").config();

const router = require("./router");

const app = express();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/network_api", router);

app.listen(port, () => {
  console.log(`Server Running at Port: ${port}`);
});
