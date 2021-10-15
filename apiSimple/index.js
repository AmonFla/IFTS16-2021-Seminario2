const express = require('express')
const Sequelize = require('sequelize')
const middleware = require('./utils/middleware')

const app = express()
const port = 5000

const sequelize = new Sequelize('S2Node2', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch(err => {
    console.log('Error: ', err)
  })

sequelize.sync({
  force: true
})

global.sequelize = sequelize

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// incluyo los endpoints
const categoriaRouter = require('./API/categoria')
const tagRouter = require('./API/tag')
const postRouter = require('./API/post')

app.use(middleware.requestLogger)

app.use('/categorias', categoriaRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)

app.use(middleware.unknowEndpoint)

app.listen(port, () => {
  console.log('ApiRest port: ' + port)
})
