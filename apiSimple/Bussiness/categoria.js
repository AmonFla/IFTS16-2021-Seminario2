const dao = require('../DAO/categoria');

const GetAll  = () => dao.getAll();

//const GetAll  = async () => await dao.getAll();

const GetOne = (id) =>  dao.getOne(id); 

const Save = (datos) =>{
    return dao.save(datos); 

}

const Update = (id, datos) =>{
  return dao.update(id,datos); 
}

const Delete = (id) =>{
    return dao.deleteC(id); 
}

module.exports = {GetAll,GetOne,Save,Update,Delete}