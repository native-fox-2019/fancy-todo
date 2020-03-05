const routes = require("express").Router();
const Controller = require("../controllers/userController");

routes.post("/register", Controller.register);
routes.post("/login", Controller.login);
routes.post("/google", Controller.googleLogin);
module.exports = routes;
