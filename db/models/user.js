const mongoose = require('../mongoose');
const loadClass = require('mongoose-class-wrapper');
const crypto = require('crypto');
 
var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  hashedPassword: {type: String},
  email: {type: String, required: true},
  salt: {type: String},
});

class UserModel {

  static authorise(username, password, callback) {
    this.find({username: username}, (err, users) => {
      if (err) throw err;
      if (users[0]) {
        callback(this.checkUserPassword(users[0], password));
        return;
      }
      this.find({email: username}, (err, users) => {
        if (err) throw err;
        callback(this.checkUserPassword(users[0], password));
      })
    })
  }

  static checkUserPassword(user, password) {
    if (user && user.checkPassword(password)) {
      return this.parseUserForAPI(user);
    }
    return false;
  }

  static parseUserForAPI(user) {
    return {
      id: user._id,
      email: user.email,
      username: user.username,
    }
  }
 
  encryptPassword(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex'); 
  }
 
  setPassword(password) {
  	this.salt = Math.random();
  	this.hashedPassword = this.encryptPassword(password)
  }

  checkPassword(password) {
  	return this.encryptPassword(password) === this.hashedPassword;
  }
 
}
 
// Add methods from class to schema 
userSchema.plugin(loadClass, UserModel);
 
module.exports = mongoose.model('User', userSchema);