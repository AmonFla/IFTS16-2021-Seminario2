const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
require('dotenv').config()
// const bcryt = require('bcrypt')
// const User = require('../DAO/user')


loginRouter.post('/', async (req, res) => {
    const {body} = req
    // const user = await User.getByUsername(body.username)
    // buscamos en la base de datos al usuario que corresponda con el username

    // validar si la constraseña del usuario es la misma que recibo en body
    // if (bcrypt.compare(body.password, user.password))
    if (body.user != 'admin' && body.password != '123456'){
        // usuario inválido
        return res.status(401).json({ error : 'error de credenciales'})
    }
    // Genero un objeto con los datos a guardar en el token
    const userForToken = {
        username: 'admin',
        id : 1
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({token, username : 'admin' })
})

module.exports = loginRouter
 
