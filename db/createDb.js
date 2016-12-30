const mongoose = require('./mongoose');
const async = require('async');
const User = require('./models/user');
const dbErrors = require('./dbErrors')

const open = (callback) => {
  mongoose.connection.on('open', callback);
}

const dropDatabase = (callback) => {
  const db = mongoose.connection.db;
  db.dropDatabase((err) => {
    if (err) throw err;
    callback();
  });
}

const createUser = ({ username, password, email, callback }) => {
  const newUser = new User({ username, email });
  newUser.setPassword(password)
  newUser.save((err, user) => {
    if (err) {
      callback(dbErrors(err.code));
      return;
    }
    callback(user)
  })
}

const close = () => {
  mongoose.disconnect();
  console.log('Database is close.')
}

try {
  open(() => { 
    console.log('Database is open.');
    dropDatabase(() => {
      console.log('Database is dropped.');
    });
  });
} catch (err) {
  throw err;
}

module.exports = {
  open,
  dropDatabase,
  createUser,
  close
}