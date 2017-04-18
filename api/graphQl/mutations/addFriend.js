const Db = require('../../../db/createDb');

module.exports = (args) => {
  return Db.addUserFriend({
    userId: args.userId,
    friendId: args.friendId,
  });
}
