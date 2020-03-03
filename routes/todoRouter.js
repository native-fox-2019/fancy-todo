const router = require(`express`).Router()
const TodoController = require(`../controllers/todoController`)
const authentication = require(`../middleware/authentication`) //authenticate the user (bearer of the data)
const authorization = require(`../middleware/authorization`)//authorization to UPDATE/FIND/Delete of data that belongs to the user

router.get(`/`, authentication, TodoController.getAll) //showing all todo-list
router.post(`/`, authentication, TodoController.create) //adding new todo-list
router.get(`/:id`, authentication, authorization, TodoController.find) //showing todo-list by specific id as params
router.put(`/:id`, authentication, authorization, TodoController.update) //update todo-list by specific id as params
router.delete(`/:id`, authentication, authorization, TodoController.delete) // delete the to do list

module.exports = router