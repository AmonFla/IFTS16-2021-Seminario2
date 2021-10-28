/* eslint-disable no-undef */
const Sequelize = require('sequelize')

const Category = sequelize.define('category', {
  catId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
})

/* const getAll = async () =>{
    const data = await category
     .findAll()
     .then(categories =>{
          return categories
     }).catch( err =>{
         console.log("Error category.getAll", err)
         return null;
     } )
    return data;
} */

const getAll = () =>
  Category.findAll(
    {
      include: [
        { model: sequelize.models.post }
      ]
    })
    .then(categories => {
      return categories
    })
    .catch(err => {
      console.log('Error category.getAll', err)
      return null
    })

const getOne = (id) =>
  Category
    .findByPk(id)
    .then(category => {
      return category
    })
    .catch(err => {
      console.log('Error category.getOne', err)
      return null
    })

const save = async (datos) => {
  const data = await Category.create(datos)
  return data
}

const update = async (id, datos) => {
  const result = await Category.update(datos, { where: { catId: id } })
  return result
}

const deleteC = async (id) => {
  return await Category.destroy({ where: { catId: id } })
}

module.exports = { Category, getAll, getOne, save, update, deleteC }
