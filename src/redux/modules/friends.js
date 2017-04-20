export const GET_FRIENDS = 'chat/friends/GET_FRIENDS';
export const GET_FRIENDS_SUCCESS = 'chat/friends/GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_FAIL = 'chat/friends/GET_FRIENDS_FAIL';

export const GET_FRIEND = 'chat/friends/GET_FRIEND';
export const GET_FRIEND_SUCCESS = 'chat/friends/GET_FRIEND_SUCCESS';
export const GET_FRIEND_FAIL = 'chat/friends/GET_FRIEND_FAIL';

export const REMOVE_FRIENDS = 'chat/friends/REMOVE_FRIEND';
export const REMOVE_FRIENDS_SUCCESS = 'chat/friends/REMOVE_FRIEND_SUCCESS';
export const REMOVE_FRIENDS_FAIL = 'chat/friends/REMOVE_FRIEND_FAIL';

export const ADD_USER_FRIEND = 'little-chat/friends/ADD_USER_FRIEND';
export const ADD_USER_FRIEND_SUCCESS = 'little-chat/friends/ADD_USER_FRIEND_SUCCESS';
export const ADD_USER_FRIEND_FAIL = 'little-chat/friends/ADD_USER_FRIEND_FAIL';

export const FIND_USER_FRIENDS = 'little-chat/friends/FIND_USER_FRIENDS';
export const FIND_USER_FRIENDS_SUCCESS = 'little-chat/friends/FIND_USER_FRIENDS_SUCCESS';
export const FIND_USER_FRIENDS_FAIL = 'little-chat/friends/FIND_USER_FRIENDS_FAIL';

const initialState = {
  list: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case GET_FRIENDS_SUCCESS:
    return {
      ...state,
      list: action.result.data.users,
    };
  case GET_FRIEND_SUCCESS:
    const oldFriends = state.list || [];
    const newClearFriends = [...oldFriends, action.result.data.user];
    return {
      ...state,
      list: newClearFriends,
    };
  case REMOVE_FRIENDS_SUCCESS:
    const friends = state.list || [];
    const newFriends = friends.filter(friend => friend.id !== action.result.data.user.id);
    return {
      ...state,
      list: newFriends,
    };
  default:
    return state;
  }
}

const getFriendsQLString = (ids) => {
  let res = '[';
  ids.forEach(id => {
    res += `"${id}",`;
  });
  if (res.length > 1) {
    return res.slice(0, -1).concat(']');
  }
  return "[]";
};

export const isLoadedFriends = (state) => state.friends.list;

export const handleGetFriend = (id) => ({
  types: [GET_FRIEND, GET_FRIEND_SUCCESS, GET_FRIEND_FAIL],
  promise: (client) => client.post('/graphql', {
    data: '{user(id: "' + id + '") {id, login, email, friends}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleGetFriends = (ids) => ({
  types: [GET_FRIENDS, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAIL],
  promise: (client) => client.post('/graphql', {
    data: '{users(ids: ' + getFriendsQLString(ids) + ') {id, login, email, friends}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleRemoveFriend = (userId, friendId) => ({
  types: [REMOVE_FRIENDS, REMOVE_FRIENDS_SUCCESS, REMOVE_FRIENDS_FAIL],
  promise: (client) => client.post('/graphql', {
    data: 'mutation {user: removeFriend(userId: "' + userId + '", friendId: "' + friendId + '") {id, login, email, friends}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleAddUserFriend = (userId, friendId) => ({
  types: [ADD_USER_FRIEND, ADD_USER_FRIEND_SUCCESS, ADD_USER_FRIEND_FAIL],
  promise: (client) => client.post('/graphql', {
    data: 'mutation {addFriend(userId: "' + userId + '", friendId: "' + friendId + '") {id}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleFindFriends = (login) => ({
  types: [FIND_USER_FRIENDS, FIND_USER_FRIENDS_SUCCESS, FIND_USER_FRIENDS_FAIL],
  promise: (client) => client.post('/graphql', {
    data: 'mutation {findFriends(login: "' + login + '") {users {id, login}}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});
