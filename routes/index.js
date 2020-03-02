const routes = require("express").Router();
const Controller = require("../controllers/todosController");

routes.post("/todos", Controller.post);
routes.get("/todos", Controller.get);
routes.get("/todos/:id", Controller.findOne);
routes.put("/todos/:id", Controller.put);
routes.delete("/todos/:id", Controller.delete);

module.exports = routes;
