const buss = require('../Bussiness/categoria');


function GetAll(require, response){
    buss.GetAll().then(datos =>{
        response.set('Content-Type','application/json');
        response.send(JSON.stringify(datos));
    })

}

/*
async function GetAll(require, response){
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(await buss.GetAll()));

}*/

const GetOne = (require, response) => {
    let id = require.params.id;
    buss.GetOne(id)
        .then(data => {
            if (data == null){
            // response.sendStatus(404);
                response.status(404).send('Categoría no encontrada');
            }
            response.set('Content-Type','application/json');
            response.send(JSON.stringify(data));
        });

}

const Save = (require, response) =>{
    let datos = require.body; 
    let data = buss.Save(datos);
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const SaveMany = (require, response) =>{
    const datos = require.body; 
    const data = datos.map(d => buss.Save(d));
   /* const data = datos.map((d) =>{
        const resp = buss.save(d);
        return resp;
    });*/
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const Update = (require, response) =>{
    let datos = require.body;
    let id = require.params.id;
    let data = buss.Update(id,datos);
    if (data == null){
        response.status(404).send('Categoría no encontrada');
    }
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(data));

}

const Delete = (require, response) =>{
    let id = require.params.id;
    let data = buss.DeleteC(id);
    if (data == null){
        response.status(404).send('Categoría no encontrada');
    } 
    response.sendStatus(200);
}

function init(app){
    // defino las rutas
    app.get('/categorias',GetAll)
    app.get('/categorias/:id',GetOne)
    app.post('/categorias',Save)
    app.post('/categorias/many',SaveMany)
    app.put('/categorias/:id',Update)
    app.delete('/categorias/:id',Delete)
}

module.exports = {init}