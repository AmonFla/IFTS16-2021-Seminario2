const buss = require('../Bussiness/tag')
const tagRouter = require('express').Router()

tagRouter.get('/', async (require, response) => response.json(await buss.GetAll()))

tagRouter.get('/:id', async (require, response) => {
  const id = require.params.id
  const data = await buss.GetOne(id)
  if (data == null) {
    return response.status(404).send('TAG no encontrada')
  }
  response.json(data)
})

tagRouter.post('/', async (require, response) => {
  const datos = require.body
  const data = await buss.Save(datos)
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
})

tagRouter.put('/:id', async (require, response) => {
  const datos = require.body
  const id = require.params.id
  const data = await buss.Update(id, datos)
  if (data == null) {
    return response.status(404).send('TAG no encontrada')
  }
  response.set('Content-Type', 'application/json')
  response.send(JSON.stringify(data))
})

tagRouter.delete('/:id', async (require, response) => {
  const id = require.params.id
  const data = buss.DeleteC(id)
  if (data == null) {
    response.status(404).send('TAG no encontrada')
  }
  response.sendStatus(200)
})

module.exports = tagRouter
