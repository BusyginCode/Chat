import mongoose from './mongoose';
import async from 'async';
import User from './models/user';
import dbErrors from './dbErrors';
import parseUser from './utils/parseUser';

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

const createUser = ({ login, password, email, callback }) => {
  const newUser = new User({ login, email });
  newUser.setPassword(password)
  return new Promise((res, rej) => {
    const finalCallback = callback || (() => {})
    newUser.save((err, user) => {
      if (err) {
        finalCallback(dbErrors(err.code));
        return;
      }
      const newUser = parseUser(user);
      finalCallback(newUser)
      res(newUser)
    })
  })
}

const addUserFriend = ({ userId, friendId }) => {
  console.log('USER ID !!', userId, ' FRINED ID!! ', friendId);
  return User.find({ _id: userId }, (err, users) => {
    if (users[0] && users[0]._id !== userId) {
      users[0].friends.push(friendId);
      users[0].save()
    }
  })
}

const findUsers = ({ login }) => {
  return { users: User.find({ login: login }) };
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
  close,
  addUserFriend,
  findUsers
}
