const routes = require("express").Router();
const todoRoutes = require("./todo");
const userRoutes = require("./user");
const { authentication } = require("../helpers/authentication");

routes.use("/todos",authentication, todoRoutes);
routes.use("/user", userRoutes);

module.exports = routes;
