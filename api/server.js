import Express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';
import Db from '../db/createDb';
import mongoose from '../db/mongoose';
import parseUser from '../db/utils/parseUser';
import config from './config';
import checkToken from './checkToken';
import http from 'http';
import httpProxy from 'http-proxy';
import mainConfig from '../src/config';

const app = new Express();
const proxy = httpProxy.createProxyServer();
const graphQlUrl = `http://${mainConfig.graphQlHost}:${mainConfig.graphQlPort}`;
const graphQlServer = require('./graphQl/server');

app.use(bodyParser.json());

app.use(cookieParser());

app.get('/validateToken', checkToken, (req, res) => {
  const { token } = req;
  console.log('validate token ', token)
  if (token) {
    User.find({ _id: token._id }, (err, users) => {
      if (users[0]) {
        res.status(200).json({ user: parseUser(users[0]), token: req.headers.authorization })
      }
      res.status(200);
    });
  }
  res.status(200);
})

app.post('/signin', (req, res) => {
  const { login, password } = req.body;
  User.authorise(login, password, (responce) => {
    if (responce.error) {
      res.status(401).json({ message: responce.error });
      return
    }
    const token = jwt.sign({ _id: responce.id }, config.secret)
    res.json({ user: responce, token });
  });
});

app.post('/signup', (req, res) => {
  const { login, password, email } = req.body;
  Db.createUser({
    login,
    password,
    email,
    callback: (responce) => {
      if (responce.error) {
        res.status(401).json({ message: responce.error });
        return;
      }
      const token = jwt.sign({ _id: responce.id }, config.secret);
      res.json({ user: responce, token });
    }
  })
});

app.post('/graphql', checkToken, (req, res) => {
  const { token } = req;
  console.log('graphql token ', token)
  if (token) {
    proxy.web(req, res, {target: graphQlUrl});
  }
  res.status(401);
})

const server = http.createServer(app);

const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  console.log('Connection');
  socket.on('message', (text) => {
    console.log('Server Message');
    socket.emit('message', text);
  });
})

server.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
