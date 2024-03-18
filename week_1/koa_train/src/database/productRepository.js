const fs = require("fs");
const { data: products } = require("./products.json");

/**
 * @param sort
 * @param limit
 * @returns {[ {id: number, name: string, price: number, color: string, createdAt: string, image: string},
 *  {id: number, name: string, price: number, color: string, createdAt: string, image: string},...]}
 */
function getAll({ sort = "asc", limit = 1000 }) {
  return products
    .sort((a, b) => {
      return sort === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    })
    .slice(0, limit);
}

/**
 * @param sort
 * @param query_params
 * @returns {id: number, name: string, price: number, color: string, createdAt: string, image: string}
 */
function getOne(id, query_params) {
  const result = {};
  const product = products.find((product) => product.id === parseInt(id));

  if (!query_params) return product;

  for (const [key, value] of Object.entries(product)) {
    if (query_params.includes(key)) result[key] = value;
  }
  return result;
}

function writeJSONFile() {
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: result,
    })
  );
}

/**
 *
 * @param data
 */
function add(data) {
  const date = new Date();
  data.createdAt = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  // auto increment id product
  data.id = products[products.length - 1].id + 1;
  const result = [...products, data];
  return writeJSONFile(result);
}

/**
 *
 * @param id
 */
function remove(id) {
  const result = products.filter((item) => item.id !== parseInt(id));
  return writeJSONFile(result);
}

/**
 *
 * @param data
 * @param id
 */
function update(data, id) {
  const result = products.map((item) => {
    if (item.id === parseInt(id)) {
      return { ...item, ...data };
    }
    return item;
  });
  return writeJSONFile(result);
}

module.exports = {
  getOne,
  getAll,
  add,
  update,
  remove,
};
