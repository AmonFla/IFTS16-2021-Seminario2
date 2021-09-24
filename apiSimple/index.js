const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

// incluyo los endpoints
const categoria = require('./Bussiness/categoria');

// defino las rutas
app.get('/categorias',categoria.GetAll)
app.get('/categorias/:id',categoria.GetOne)
app.post('/categorias',categoria.Save)
app.put('/categorias/:id',categoria.Update)
app.delete('/categorias/:id',categoria.Delete)


app.listen(port, ()=>{
    console.log('ApiRest port: '+port);
});

