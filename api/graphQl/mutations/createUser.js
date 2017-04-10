
const Db = require('../../../db/createDb');

module.exports = (args) => {
  let newUser;
  return Db.createUser({
    login: args.login,
    password: args.password,
    email: args.email,
  });
}
