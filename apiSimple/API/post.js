
const swaggerJSDoc = require('swagger-jsdoc')
const buss = require('../Bussiness/post')
const postRouter = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API para manejar los POST
 */

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Obtiene todas las entrada
 *     tags: [Post]
 *     description: obtiene todas las entradas del blog
 *     responses:
 *       "200":
 *         description: descripcion de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/PostResponse'
 */
postRouter.get('/', async (require, response) => response.json(await buss.GetAll()))

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtiene una entrada
 *     tags: [Post]
 *     description: obtiene solo la entrada solicitada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la publicacion
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: descripcion de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 */
postRouter.get('/:id', async (require, response) => {
  const id = require.params.id
  const data = await buss.GetOne(id)
  if (data == null) {
    return response.status(404).send('POST no encontrada')
  }
  response.json(data)
})

/**
 * @swagger
 * /posts/:
 *   post:
 *     summary: Agregar una entrada
 *     tags: [Post]
 *     description: generar una nueva entrada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       "200":
 *         description: descripcion de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 */
postRouter.post('/', async (require, response) => {
  const datos = require.body
  const data = await buss.Save(datos)
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
})

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Agregar una entrada
 *     tags: [Post]
 *     description: generar una nueva entrada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la publicacion
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       "200":
 *         description: descripcion de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 */

postRouter.put('/:id', async (require, response) => {
  const datos = require.body
  const id = require.params.id
  const data = await buss.Update(id, datos)
  if (data == null) {
    return response.status(404).send('POST no encontrada')
  }
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
})

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Borrar una entrada
 *     tags: [Post]
 *     description: Borra solo la entrada solicitada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la publicacion
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Operación exitosa
 */

postRouter.delete('/:id', async (require, response) => {
  const id = require.params.id
  const data = buss.DeleteC(id)
  response.sendStatus(200)
})

module.exports = postRouter

/**
 * @swagger
 *   components:
 *     schemas:
 *       PostResponse:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             description: id del blog
 *           name:
 *             type: string
 *             description: título del blog
 *           content:
 *             type: string
 *             description: contenidos del blog
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
 *           name: "Post de prueba"
 *           content: "este es el texto del post"
 *           createdAt: "2021-10-21T22:35:10.000Z"
 *           updatedAt: "2021-10-21T22:35:10.000Z"
 *       Post:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: título del blog
 *           content:
 *             type: string
 *             description: contenidos del blog
 *         example:
 *           name: "Post de prueba"
 *           content: "este es el texto del post"
 *
*/
