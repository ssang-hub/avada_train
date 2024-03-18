const fs = require("fs");
const { data: todos } = require("./todos.json");

/**
 * @param sort
 * @param limit
 * @returns {[ {id: number, title: string, is_complete: boolean, createAt: string},
 * {id: number, title: string, is_complete: boolean, createAt: string},...]}
 */
function getAll({ sort = "asc", limit = 1000 }) {
  return todos
    .sort((a, b) => {
      return sort === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    })
    .slice(0, limit);
}

/**
 * @param id
 * @param query_params
 * @returns {id: number, title: string, is_complete: boolean, createAt: string}
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
 * @param title
 * @return {id: number, title: string, is_complete: boolean, createAt: string}
 */
function add(title) {
  const data = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title,
    is_completed: false,
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
 * @param items
 */
function destroy(items) {
  const result = todos.filter((item) => !items.includes(item.id));
  return writeJSONFile(result);
}

/**
 *
 * @param items
 * @param is_complete
 */

function update({items, is_completed}) {
  const result = todos.map((todo) => {
    if (items.includes(todo.id)) {
      return { ...todo, is_completed };
    }
    return todo;
  });
  return writeJSONFile(result);
}

module.exports = {
  getOne,
  getAll,
  add,
  update,
  destroy,
};
