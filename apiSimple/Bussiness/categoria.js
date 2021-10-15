const dao = require('../DAO/categoria')

const GetAll = () => dao.getAll()

// const GetAll  = async () => await dao.getAll();

const GetOne = (id) => dao.getOne(id)

const Save = async (datos) => {
  return await dao.save(datos)
}

const Update = async (id, datos) => {
  return await dao.update(id, datos)
}

const DeleteC = async (id) => {
  return await dao.deleteC(id)
}

module.exports = { GetAll, GetOne, Save, Update, DeleteC }
