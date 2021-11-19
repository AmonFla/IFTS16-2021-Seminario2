const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

const unknowEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const getTokenFromHeader = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token = authorization.substring(7);
  }else{
    req.token = null
  }
  next()
}

const tokenExtractor = (req, resp, next) => {
  if(!req.token){
    return resp.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return resp.status(401).json({ error: 'token invalid' })
  }
  req.decodedToken = decodedToken
  next()
}


module.exports = { requestLogger, unknowEndpoint, getTokenFromHeader, tokenExtractor }
