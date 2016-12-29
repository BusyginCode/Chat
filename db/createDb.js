const mongoose = require('./mongoose');
const async = require('async');
const User = require('./models/user');

const user = new User({ 'username': 'Oleg' });

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

const createUsers = (callback) => {
  async.parallel([
      (callback) => {
        const vasya = new User({ 'username': 'vasya' });
        vasya.save((err, user) => {
          callback(err, user)
        })
      },
      (callback) => {
        const ivan = new User({ 'username': 'ivan' });
        ivan.save((err, user) => {
          callback(err, user)
        })
      },
      (callback) => {
        const petia = new User({ 'username': 'petia' });
        petia.save((err, user) => {
          callback(err, user)
        })
      },       
    ], callback)
}

const close = () => {
  mongoose.disconnect();
}

async.series([
  open,
  dropDatabase,
  createUsers,
], (err, res) => {
  console.log(res)
})