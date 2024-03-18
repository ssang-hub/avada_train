const yup = require("yup");

async function createTodoMiddleware(ctx, next) {
  try {
    const todo_data = ctx.request.body;
    let schema = yup.object().shape({
      title: yup.string().required(),
    });
    await schema.validate(todo_data);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

async function updateStatusMiddleware(ctx, next) {
  try {
    // const data = ctx.request.body;
    // let schema = yup.array().of({
    //   is_completed: yup.boolean().required(),
    // });
    // await schema.validate(data);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = { createTodoMiddleware, updateStatusMiddleware };
