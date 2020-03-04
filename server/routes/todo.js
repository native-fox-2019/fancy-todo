const routes = require("express").Router();
const Controller = require("../controllers/todosController");
const {authorization} = require('../middlewares/authorization')

routes.post("/", Controller.post);
routes.get("/", Controller.get);
routes.get("/:id", Controller.findOne);
routes.put("/:id",authorization, Controller.put);
routes.delete("/:id", authorization,Controller.delete);

module.exports = routes;
