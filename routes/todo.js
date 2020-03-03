const routes = require("express").Router();
const Controller = require("../controllers/todosController");
const { authentication } = require("../helpers/authentication");

routes.post("/", Controller.post);
routes.get("/", Controller.get);
routes.get("/:id", Controller.findOne);
routes.put("/:id", Controller.put);
routes.delete("/:id", Controller.delete);

module.exports = routes;
