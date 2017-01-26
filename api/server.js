import Express from 'express';
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser')
const User = require('../db/models/user');
const Db = require('../db/createDb');
const mongoose = require('../db/mongoose');
const jwt = require('jsonwebtoken');

const config = require('./config');

const app = new Express();

app.use(bodyParser.json());

app.use(cookieParser());

const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: "SpecialKey",
  key: "AUTH_TOKEN",
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: null,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  },
  resave: true,
  saveUninitialized: true,
}))

app.post('/signin', (req, res) => {
  console.log('post signin ', req.body)
  User.authorise(req.body.username, req.body.password, (user) => {
    if (user) {
      const token = jwt.sign({ _id: user.id, secret: config.secret })
      res.json(Object.assign(user, { token: token }));
    }
    res.status(401);
    res.end();
  });
  
});

app.post('/signup', (req, res) => {
  console.log('post signup ', req.body)
  Db.createUser({
    username: req.body.login,
    password: req.body.password,
    email: req.body.email,
    callback: (responce) => {
      if (responce.error) {
        res.status(401).json({error: responce.error});
        return;
      }
      res.json({token: responce._id});
    }
  })
});

app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
