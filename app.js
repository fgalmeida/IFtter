const express = require("express");
const session = require("express-session");
const passport = require("./src/config/passport");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const AuthRouter = require("./src/routes/AuthRoutes");
const DashboardRouter = require("./src/routes/DashboardRoutes");
const AdminRouter = require("./src/routes/AdminRoutes");
const ApiRouter = require("./src/routes/ApiRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: 'uhauwhfuahWUY731o3h1283h#H', // Substitua por uma chave secreta adequada para sua aplicação
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/auth", AuthRouter);
app.use(DashboardRouter);
app.use(AdminRouter);
app.use(ApiRouter);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.listen(port, () => {
  console.log(`SERVER RODANDO NA PORTA ${port}!`);
});