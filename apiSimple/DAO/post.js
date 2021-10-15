/* eslint-disable no-undef */

const Sequelize = require('sequelize')

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
})

const getAll = async () => {
  let datos = null
  try {
    datos = await Post.findAll()
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
  return datos
}

const getOne = async (id) => await Post.findByPk(id)

const save = async (datos) => {
  const data = await Post.create(datos)
  return data
}

const update = async (id, datos) => {
  const result = await Post.update(datos, { where: { id: id } })
  return result
}

const deleteC = async (id) => {
  return await Post.destroy({ where: { id: id } })
}

module.exports = { Post, getAll, getOne, save, update, deleteC }
