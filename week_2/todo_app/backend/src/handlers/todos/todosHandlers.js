const {
  getAll: getAlltodos,
  getOne: getOnetodo,
  add: addTodo,
  completed: completeTodo,
  remove: removeTodo,
} = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
  try {
    const query = ctx.query;
    const todos = getAlltodos(query.sort, query.limit);
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
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getTodo(ctx) {
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
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
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
    const { id } = ctx.params;
    const postData = ctx.request.body;
    completeTodo(postData, id);

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

async function deleteTodo(ctx) {
  try {
    const { id } = ctx.params;
    removeTodo(id);
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
  deleteTodo,
  getTodo,
};
