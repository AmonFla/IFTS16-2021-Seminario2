/* eslint-disable no-undef */

const Sequelize = require('sequelize')
const Cat = require('./categoria')
const Tag = require('./tag')

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
    datos = await Post.findAll(
      {
        include: [
          { model: sequelize.models.category },
          { model: sequelize.models.tag }
        ]
      }
    )
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
  return datos
}

const getOne = async (id) => await Post.findByPk(id, {
  include: [
    { model: sequelize.models.category },
    { model: sequelize.models.tag }
  ]
})

const save = async (datos) => {
  const post = await Post.create(datos)
  const categoria = await Cat.getOne(datos.category)
  await post.setCategory(categoria)
  await Promise.all(datos.tag.map(async (id) => {
    tag = await Tag.getOne(id)
    await post.addTag(tag)
  }))

  return getOne(post.id)
}

const update = async (id, datos) => {
  const result = await Post.update(datos, { where: { id: id } })
  return result
}

const deleteC = async (id) => {
  return await Post.destroy({ where: { id: id } })
}

module.exports = { Post, getAll, getOne, save, update, deleteC }
