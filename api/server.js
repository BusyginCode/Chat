const Express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser')
const User = require('../db/models/user');

const app = new Express();

app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  console.log('post signin ', req.body)
  User.find({}, (err, users) => {
  	if (err) throw err;
  	res.json(users)
  })
});

app.get('/', (req, res) => {
  res.send('hello')
});

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
  	if (err) throw err;
  	res.json(users)
  })
});

app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
