const {
  getAll: getAlltodos,
  getOne: getOnetodo,
  add: addTodo,
  update,
  destroy: destroyTodo,
} = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
  try {
    const query = ctx.query;
    const todos = getAlltodos({sort:query.sort, limit:query.limit});
    return (ctx.body = {
      data: todos,
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: @returns {id: number, title: string, is_complete: boolean, createdAt: string}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getTodoById(ctx) {
  try {
    const { id } = ctx.params;
    const query = ctx.query;
    query_params = query.fields ? query.fields.split(",") : undefined;
    const getCurrenttodo = getOnetodo(id, query_params);

    if (getCurrenttodo) {
      return (ctx.body = {
        data: getCurrenttodo,
      });
    }

    throw new Error("TodoItem Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: @returns {id: number, title: string, is_complete: boolean, createdAt: string}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function save(ctx) {
  try {
    const todoData = ctx.request.body;
    const resData = addTodo(todoData.title);

    ctx.status = 201;
    return (ctx.body = {
      data: resData,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateTodo(ctx) {
  try {
    const data = ctx.request.body.data;
    update(data);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */

async function deleteTodoById(ctx) {
  try {
    const {id} = ctx.params
    destroyTodo([parseInt(id)]);
    ctx.status = 200;
    return (ctx.body = { success: true });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}


/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */

function deleteMultipleTodos(ctx){
  try {
    destroyTodo(ctx.request.body);
    ctx.status = 200;
    return (ctx.body = { success: true });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getTodos,
  save,
  updateTodo,
  deleteTodoById,
  getTodoById,
  deleteMultipleTodos,
};
