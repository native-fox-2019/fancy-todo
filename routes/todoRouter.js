const router = require(`express`).Router()
const TodoController = require(`../controllers/todoController`)

router.get(`/`, TodoController.getAll) //showing all todo-list
router.post(`/`, TodoController.create) //adding new todo-list
router.get(`/:id`, TodoController.find) //showing todo-list by specific id as params
router.put(`/:id`, TodoController.update)

module.exports = router