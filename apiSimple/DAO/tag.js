const Sequelize = require('sequelize')

// eslint-disable-next-line no-undef
const Tag = sequelize.define('tag', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
})

const getAll = async () => await Tag.findAll()

const getOne = async (id) => await Tag.findByPk(id)

const save = async (datos) => await Tag.create(datos)

const update = async (id, datos) => await Tag.update(datos, { where: { id: id } })

const deleteC = async (id) => await Tag.destroy({ where: { id: id } })

module.exports = { getAll, getOne, save, update, deleteC }
