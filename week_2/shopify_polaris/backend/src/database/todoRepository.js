const { data: todos } = require("./todos.json");
const _ = require("lodash");
const { getDateNow } = require("../helpers/helpers");
const fs = require("fs");

const writeJSONFile = (result) => {
  fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: result,
    })
  );
};

/**
 * @param sort
 * @param limit
 * @returns {[ {id: number, title: string, isCompleted: boolean, createAt: string},
 * {id: number, title: string, isCompleted: boolean, createAt: string},...]}
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
 * @param fields
 * @returns {id: number, title: string, isCompleted: boolean, createAt: string}
 */
function getOne(id, fields) {
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!fields) return todo;
  return _.pick(todo, fields);
}

/**
 *
 * @param title
 * @return {id: number, title: string, isCompleted: boolean, createAt: string}
 */
function add(title) {
  const data = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title,
    isCompleted: false,
  };
  data.createdAt = getDateNow();
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
 * @param fileds - Object field update
 */

function update({ items, fields }) {
  const result = todos.map((todo) => {
    if (items.includes(todo.id)) {
      return { ...todo, ...fields };
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
