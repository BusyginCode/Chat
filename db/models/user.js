const mongoose = require('../mongoose');
const loadClass = require('mongoose-class-wrapper');
 
var userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  hashedPassword: {type: String, required: true},
  salt: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

class UserModel {
 
  get password() {
    return this._plainPassword;
  }
  set password(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  }
 
  encryptPassword(password) {
    return 'hello'
  }
 
  static byEmail(email) {
    return 'email'
  }
 
}
 
// Add methods from class to schema 
userSchema.plugin(loadClass, UserModel);
 
module.exports = mongoose.model('User', userSchema);