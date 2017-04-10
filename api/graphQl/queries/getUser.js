const User = require('../../../db/models/user');

module.exports = (id) => {
  return new Promise((resolve, reject) => {
    User.find({ _id: id }, (err, users) => {
      console.log(users[0])
      if (users[0]) {
        resolve(users[0])
      } else {
        reject(new Error("User not Found"))
      }
    });
  });
}
