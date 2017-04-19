const mongoose = require('mongoose');
const User = require('../../../db/models/user');

module.exports = (ids) => {
  console.log('IDS! ', ids)
  const mongooseTypes = ids.map(id => mongoose.Types.ObjectId(id))
  return new Promise((resolve, reject) => {
    User.find({
      _id: { $in: mongooseTypes }
    }, (err, users) => {
      console.log(users)
      if (users) {
        resolve(users)
      } else {
        reject(new Error("Users not Found"))
      }
    });
  });
}
