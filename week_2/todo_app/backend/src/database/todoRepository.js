const fs = require("fs");
const { data: todos } = require("./todos.json");

/**
 * @param sort
 * @param limit
 * @returns {[ {id: number, name: string, price: number, color: string, createdAt: string, image: string},
 *  {id: number, name: string, price: number, color: string, createdAt: string, image: string},...]}
 */
function getAll(sort = "asc", limit = 1000) {
  return todos
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
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!query_params) return todo;

  for (const [key, value] of Object.entries(todo)) {
    if (query_params.includes(key)) result[key] = value;
  }
  return result;
}

function writeJSONFile(result) {
  fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: result,
    })
  );
}

/**
 *
 * @param data
 */
function add(title) {
  const data = {
    id: todos[todos.length - 1].id + 1,
    title,
    is_completed: false,
    is_deleted: false,
  };

  const date = new Date();
  data.createdAt = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const result = [...todos, data];
  writeJSONFile(result);
  return data;
}

/**
 *
 * @param id
 */
function remove(id) {
  const result = todos.filter((item) => item.id !== parseInt(id));
  return writeJSONFile(result);
}

/**
 *
 * @param data
 * @param id
 */
function completed(data, id) {
  const result = todos.map((item) => {
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
  completed,
  remove,
};
