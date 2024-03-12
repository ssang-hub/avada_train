const {
  getAll: getAllproducts,
  getOne: getOneproduct,
  add: addproduct,
  remove: removeProduct,
  update: updateAProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const query = ctx.query;
    const products = getAllproducts(query.sort, query.limit);
    await ctx.render("home", { products });
    // return (ctx.body = {
    //   data: products,
    // });
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
async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const query = ctx.query;
    query_params = query.fields ? query.fields.split(",") : undefined;
    const getCurrentproduct = getOneproduct(id, query_params);

    if (getCurrentproduct) {
      return (ctx.body = {
        data: getCurrentproduct,
      });
    }

    throw new Error("product Not Found with that id!");
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
    const postData = ctx.request.body;
    addproduct(postData);

    ctx.status = 201;
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
async function update(ctx) {
  try {
    const { id } = ctx.params;
    const postData = ctx.request.body;
    updateAProduct(postData, id);

    ctx.status = 201;
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

async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    removeProduct(id);

    ctx.status = 201;
    return (ctx.body = { success: true });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  save,
  update,
  deleteProduct,
  getProduct,
};
