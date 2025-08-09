const express = require("express");

const routes = require("./Modules/routes");

const app = express();

app.use(express.json());

app.use("/", routes);

routes.get('/healthcheck', (req, res) => {
  res.send(200);
});


module.exports = app;