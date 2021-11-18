const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const Sequelize = require('sequelize')
const middleware = require('./utils/middleware')
const swaggerUtils = require('./utils/swagger')
const doAssociation = require('./DAO/associations')

const app = express()
const port = 5000

const sequelize = new Sequelize('S2Node2', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
})

global.sequelize = sequelize

sequelize
  .authenticate()
  .then(async () => {
    console.log('Conectado a la base de datos')
    await doAssociation()
    // await sequelize.sync({ force: true })
  })
  .catch(err => {
    console.log('Error: ', err)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// SWAGGER
const swaggerHeader = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog',
      version: '0.1.0',
      description: 'Este es un blog re simple',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'IFTS16',
        url: 'no anda',
        email: 'algo@algo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./API/post.js', './API/tag.js', './API/categoria.js']
}

const specs = swaggerJsdoc(swaggerHeader)
const options = {
  swaggerOptions: {
    plugins: [
      swaggerUtils.DisableTryItOutPlugin
    ]
  }
}
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, options)
)

// incluyo los endpoints
const categoriaRouter = require('./API/categoria')
const tagRouter = require('./API/tag')
const postRouter = require('./API/post')

app.use('/categorias', categoriaRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)

app.use(middleware.unknowEndpoint)

app.listen(port, () => {
  console.log('ApiRest port: ' + port)
})
