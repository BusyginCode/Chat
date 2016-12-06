const Express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser')

const app = new Express();

app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  console.log('post signin ', req.body)
  res.send({'token': 'world'})
});

app.get('/', (req, res) => {
  res.send('hello')
});


app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
