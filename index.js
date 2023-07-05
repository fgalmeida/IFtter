const routes = require("./src/routes/routes");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.listen(port, () => {
  console.log(`SERVER RODANDO NA PORTA ${port}!`);
});
