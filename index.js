const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(express.static(path.join(__dirname, "/public")));

const userRoutes = require("./src/routes/UserRoutes");
const postRoutes = require("./src/routes/PostRoutes");
app.use(userRoutes);
app.use(postRoutes);

app.listen(port, () => {
  console.log(`SERVER RODANDO NA PORTA ${port}!`);
});
