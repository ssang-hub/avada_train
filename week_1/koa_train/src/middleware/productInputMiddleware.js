const yup = require("yup");

async function createProductMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().positive().integer().required(),
      color: yup.string().required(),
    });
    await schema.validate(postData);
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

async function updateMiddleWare(ctx, next) {
  try {
    const data = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string(),
      price: yup.number().positive().integer(),
      color: yup.string(),
    });
    await schema.validate(data);
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

module.exports = { createProductMiddleware, updateMiddleWare };
