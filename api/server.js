const Express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser')
const User = require('../db/models/user');
const Db = require('../db/createDb');

const app = new Express();

app.use(bodyParser.json());

app.use(cookieParser());

app.post('/signin', (req, res) => {
  console.log('post signin ', req.body)
  User.find({username: req.body.username}, (err, users) => {
  	if (err) throw err;
    console.log('Sign In USERS', users);
  	res.json(users)
  })
});

app.post('/signup', (req, res) => {
  console.log('post signup ', req.body)
  Db.createUser({
    username: req.body.login,
    password: req.body.password,
    email: req.body.email,
    callback: (responce) => {
      if (responce.error) {
        res.status(401)
        .json({error: responce.error});
        return;
      }
      res.json({token: responce._id});
    }
  })
});

app.get('/token/validate', (req, res) => {
  console.log('COOKIES', req.cookies);
})

app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
