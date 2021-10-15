const dao = require('../DAO/post')

const GetAll = async () => await dao.getAll()

// const GetAll  = async () => await dao.getAll();

const GetOne = async (id) => await dao.getOne(id)

const Save = async (datos) => await dao.save(datos)

const Update = async (id, datos) => await dao.update(id, datos)

const DeleteC = async (id) => await dao.deleteC(id)

module.exports = { GetAll, GetOne, Save, Update, DeleteC }
