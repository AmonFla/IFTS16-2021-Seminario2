const dao = require('../DAO/categoria');

function GetAll(require, response){
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(dao.getAll()));

}

const GetOne = (require, response) => {
    let id = require.params.id;
    let data = dao.getOne(id);
    if (data == null){
       // response.sendStatus(404);
        response.status(404).send('Categoría no encontrada');
    }
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const Save = (require, response) =>{
    let datos = require.body; 
    let data = dao.save(datos);
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const Update = (require, response) =>{
    let datos = require.body;
    let id = require.params.id;
    let data = dao.update(id,datos);
    if (data == null){
        response.status(404).send('Categoría no encontrada');
    }
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const Delete = (require, response) =>{
    let id = require.params.id;
    let data = dao.deleteC(id);
    if (data == null){
        response.status(404).send('Categoría no encontrada');
    } 
    response.sendStatus(200);
}
module.exports = {GetAll,GetOne,Save,Update,Delete}