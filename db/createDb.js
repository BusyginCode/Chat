const User = require('./models/user');

const user = new User({
  'username': 'Dima',
  'email': 'busygin@gmail.com',
  'hashedPassword': '14234234',
  'salt': '6456456',
  'created': new Date(),
})

console.log(user)

user.save(function(err, user, affected) {
  console.log(user.encryptPassword());
  console.log(user.password);
});