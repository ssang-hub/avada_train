const {
  getAll: getAlltodos,
  getOne: getOnetodo,
  add: addTodo,
  update,
  destroy: destroyTodo,
} = require("../../repositories/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
  try {
    const query = ctx.query;
    const todos =  await getAlltodos({sort:query.sort, limit:query.limit });
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
    const fields = query.fields ? query.fields.split(",") : undefined;
    const getCurrenttodo = await getOnetodo(id, fields);

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
    const todoData = ctx.req.body;
    const resData =  await addTodo(todoData.title);
    ctx.status = 201;
    return (ctx.body = {
      data: resData,
    });
  } catch (e) {
    console.log(e)
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
    await update(data);

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
    await destroyTodo([id]);
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

async function deleteMultipleTodos(ctx){
  try {
    await destroyTodo(ctx.request.body);
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
