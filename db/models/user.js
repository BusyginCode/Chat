import mongoose from '../mongoose';
import loadClass from 'mongoose-class-wrapper';
import crypto from 'crypto';
import parseUserForAPI from '../utils/parseUser';

const userSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  hashedPassword: {type: String},
  email: {type: String, required: true, unique: true},
  salt: {type: String},
  friends: {type: Array}
});

class UserModel {

  static authorise(login, password, callback) {
    this.find({login: login}, (err, users) => {
      if (err) throw err;
      if (users[0]) {
        callback(this.checkUserPassword(users[0], password));
        return;
      }
      this.find({email: login}, (err, users) => {
        if (err) throw err;
        callback(this.checkUserPassword(users[0], password));
      })
    })
  }

  static checkUserPassword(user, password) {
    if (user) {
      if (user.checkPassword(password)) {
        return parseUserForAPI(user);
      }
      return { error: "Invalid Password" };
    }
    return { error: "User Not Found" };
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
