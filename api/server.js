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

const app = new Express();

app.use(bodyParser.json());

app.use(cookieParser());

app.get('/validateToken', checkToken, (req, res) => {
  const { token } = req;
  if (token) {
    User.find({ _id: token._id }, (err, users) => {
      console.log('user', users[0]);
      if (users[0]) {
        res.status(200).json({ user: users[0], token: req.headers.authorization })  
      }
      res.status(401)
    });
  }
  res.status(401);
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

app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
