const mongoose = require('../mongoose');
const loadClass = require('mongoose-class-wrapper');
 
var userSchema = mongoose.Schema({
  username: {type: String, required: true},
});

class UserModel {
 
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