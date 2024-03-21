const _ = require('lodash')
const {getDateNow} = require('../helpers/helpers')
const {firestore} = require('firebase-admin')

const { db} = require('../config/Database')
const {Timestamp} = require('firebase-admin/firestore')

const Todo = db.collection('todo')
/**
 * @param sort
 * @param limit
 * @returns {[ {id: number, title: string, is_complete: boolean, createAt: string},
 * {id: number, title: string, is_complete: boolean, createAt: string},...]}
 */
async function getAll({ sort = "asc", limit = 1000 }) {
  try {
    const res = await Todo.orderBy('createdAt', sort==="asc"?"asc":"desc").limit(parseInt(limit)).get()
    return res.docs.map(item=> {
      return {id: item.id, ...item.data()}
    })
  }
  catch (error){
    throw error
  }
}

/**
 * @param id
 * @param fields
 * @returns {id: number, title: string, is_complete: boolean, createAt: string}
 */
async function getOne(id, fields) {
  try {
    const todo = await Todo.doc(id).get()
    return _.pick(todo, fields)
  }
  catch (error){
    throw error
  }
}

/**
 *
 * @param title
 * @return {id: number, title: string, is_complete: boolean, createAt: string}
 */
async function add(title) {
  try {
    const data = {
      title,
      isCompleted: false,
      createdAt: Timestamp.now()
    };
    const res = await db.collection('todo').add(data)
    const docRef = await res.get();
    return {id: res.id,...docRef.data()}

  }catch (error){
    console.log(error)
  }
}

/**
 *
 * @param items
 */
async function destroy(items) {
  const batch = db.batch();
  items.map((item)=>{
    batch.delete(Todo.doc(item))
  })
  await batch.commit()
}

/**
 *
 * @param items
 * @param fileds - Object field update
 */

async function update({ items, fields}) {
  const batch = db.batch();
  items.map((item)=>{
    batch.update(Todo.doc(item),fields)
  })
  await batch.commit()
}

module.exports = {
  getOne,
  getAll,
  add,
  update,
  destroy,
};
