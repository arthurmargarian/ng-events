const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const userDB = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

const SECRET_KEY = 'qwerty';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

function isAuthenticated({email, password}) {
  return userDB.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const msg = 'Incorrect email or password'
    res.status(status).json({status, msg})
    return
  }
  const access_token = createToken({email, password})
  let user;
  userDB.users.forEach(item=>{
    if(item.email === email && item.password){
      user = item;
    }
  })
  res.status(200).json({access_token,user})
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Baerer") {
    const status = 401;
    const msg = 'Error in authorization format'
    res.status(status).json({status, msg})
    return
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1])
    next();
  } catch (err) {
    const status = 401;
    const msg = "Error access token is revoked"
    res.status(status).json({status, msg})
  }
})

server.use(router);

server.listen(3000, () => {
  console.log('Running Auth JSON API Server')
})
