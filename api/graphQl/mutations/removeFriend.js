const Db = require('../../../db/createDb');

module.exports = (args) => {
  return Db.removeUserFriend({
    userId: args.userId,
    friendId: args.friendId,
  });
}
