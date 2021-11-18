const buss = require('../Bussiness/categoria')
const categoriaRouter = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Categoría
 *   description: API para manejar los Categoría
 */

/**
 * @swagger
 * /categorias/:
 *   get:
 *     summary: Obtiene todas las categorias
 *     tags: [Categoría]
 *     description: obtiene todas las categorias
 *     responses:
 *       "200":
 *         description: descripcion de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/CategoryResponse'
 */

categoriaRouter.get('/', (require, response) => {
  buss.GetAll().then(datos => {
    response.set('Content-Type', 'application/json')
    response.send(JSON.stringify(datos))
  })
}
)

/*
categoriaRouter.get('/', async (require, response)=>{
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(await buss.GetAll()));
)

async function GetAll(require, response){
    response.set('Content-Type','application/json');
    response.send(JSON.stringify(await buss.GetAll()));

}
 categoriaRouter.get('/',GetAll)
*/

const GetOne = (require, response) => {
  const id = require.params.id
  buss.GetOne(id)
    .then(data => {
      if (data == null) {
        // response.sendStatus(404);
        response.status(404).send('Categoría no encontrada')
      }
      response.set('Content-Type', 'application/json')
      response.send(JSON.stringify(data))
    })
}

const Save = async (require, response) => {
  const datos = require.body
  const data = await buss.Save(datos)
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
}

const SaveMany = (require, response) => {
  const datos = require.body
  const data = datos.map(d => buss.Save(d))
  /* const data = datos.map((d) =>{
        const resp = buss.save(d);
        return resp;
    }); */
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
}

const Update = async (require, response) => {
  const datos = require.body
  const id = require.params.id
  const data = await buss.Update(id, datos)
  if (data == null) {
    response.status(404).send('Categoría no encontrada')
  }
  response.set('Content-Type', 'application/json')
  response.send()
}

const DeleteC = async (require, response) => {
  const id = require.params.id
  await buss.DeleteC(id)
  response.sendStatus(200)
}

categoriaRouter.get('/:id', GetOne)
categoriaRouter.post('/', Save)
categoriaRouter.post('/many', SaveMany)
categoriaRouter.put('/:id', Update)
categoriaRouter.delete('/:id', DeleteC)

module.exports = categoriaRouter

/**
 * @swagger
 *   components:
 *     schemas:
 *       CategoryResponse:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             description: id del blog
 *           name:
 *             type: string
 *             description: título del blog
 *           createdAt:
 *             type: string
 *             format: date
 *             description: fecha de creación
 *           updateddAt:
 *             type: string
 *             format: date
 *             description: fecha de actualización
 *         example:
 *           id: 1,
 *           name: "categoria"
 *           createdAt: "2021-10-21T22:35:10.000Z"
 *           updatedAt: "2021-10-21T22:35:10.000Z"
 *
*/
