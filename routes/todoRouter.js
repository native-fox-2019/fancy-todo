const router = require(`express`).Router()
const TodoController = require(`../controllers/todoController`)
const authentication = require(`../middleware/authentication`)
const authorization = require(`../middleware/authorization`)

router.get(`/`, authentication, TodoController.getAll) //showing all todo-list
router.post(`/`, authentication, TodoController.create) //adding new todo-list
router.get(`/:id`, TodoController.find) //showing todo-list by specific id as params
router.put(`/:id`, authentication, authorization, TodoController.update) //update todo-list by specific id as params
router.delete(`/:id`, authentication, authorization, TodoController.delete)

module.exports = router