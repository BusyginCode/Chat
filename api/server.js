const Express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser')

const app = new Express();

app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(compression());

// Proxy to API server
app.use('/signin', (req, res) => {
  console.log('REQUEST signin ', req.body)
});

app.get('/', (req, res) => {
  res.send('hello')
});

app.listen(process.env.PORT, function() {
  console.log('API server is listen on port:' + process.env.PORT)
})
