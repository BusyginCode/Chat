const Db = require('../../../db/createDb');

module.exports = (args) => {
  return Db.findUsers({
    login: args.login,
  });
}
