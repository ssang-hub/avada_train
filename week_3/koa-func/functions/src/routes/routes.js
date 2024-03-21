const Router = require("koa-router");
const todoHandlers = require("../handlers/todos/todosHandlers");
const middleWare = require("../middleware/todoMiddleware");

const router = new Router({
  prefix: "/api",
});

// Routes will go here
router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getTodoById);
router.post("/todos", middleWare.createTodoMiddleware, todoHandlers.save);
router.put(
    "/todos",
    todoHandlers.updateTodo
);

router.delete("/todos/:id", todoHandlers.deleteTodoById);
router.put('/todos/delete-multiple', todoHandlers.deleteMultipleTodos)
module.exports = router;
