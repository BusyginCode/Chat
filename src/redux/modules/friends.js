export const GET_FRIENDS = 'chat/friends/GET_FRIENDS';
export const GET_FRIENDS_SUCCESS = 'chat/friends/GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_FAIL = 'chat/friends/GET_FRIENDS_FAIL';

export const GET_FRIEND = 'chat/friends/GET_FRIEND';
export const GET_FRIEND_SUCCESS = 'chat/friends/GET_FRIEND_SUCCESS';
export const GET_FRIEND_FAIL = 'chat/friends/GET_FRIEND_FAIL';

export const REMOVE_FRIEND = 'chat/friends/REMOVE_FRIEND';
export const REMOVE_FRIEND_SUCCESS = 'chat/friends/REMOVE_FRIEND_SUCCESS';
export const REMOVE_FRIEND_FAIL = 'chat/friends/REMOVE_FRIEND_FAIL';

export const ADD_USER_FRIEND = 'chat/friends/ADD_USER_FRIEND';
export const ADD_USER_FRIEND_SUCCESS = 'chat/friends/ADD_USER_FRIEND_SUCCESS';
export const ADD_USER_FRIEND_FAIL = 'chat/friends/ADD_USER_FRIEND_FAIL';

export const FIND_USER_FRIEND = 'chat/friends/FIND_USER_FRIEND';
export const FIND_USER_FRIEND_SUCCESS = 'chat/friends/FIND_USER_FRIENDS_SUCCES';
export const FIND_USER_FRIEND_FAIL = 'chat/friends/FIND_USER_FRIEND_FAIL';

export const SET_FRIENDS_LIST = 'chat/friends/SET_FRIENDS_LIST';

export const CLEAR_STORE = 'chat/friends/CLEAR_STORE';

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
    case ADD_USER_FRIEND_SUCCESS:
      return {
        ...state,
        list: action.result.data.addFriend.friends,
      };
    case REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        list: action.result.data.removeFriend.friends,
      };
    case SET_FRIENDS_LIST:
      return {
        ...state,
        list: action.friends,
      };
    case CLEAR_STORE: return initialState;
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

export const clearFriends = () => ({ type: CLEAR_STORE });

export const isLoadedFriends = (state) => state.friends.list;

export const setFriends = (friends) => ({
  type: SET_FRIENDS_LIST,
  friends,
});

export const getFriend = (id) => ({
  types: [GET_FRIEND, GET_FRIEND_SUCCESS, GET_FRIEND_FAIL],
  promise: (client) => client.graphql('{user(id: "' + id + '") {id, login, email, friends}}')
});

export const getFriends = (ids) => ({
  types: [GET_FRIENDS, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAIL],
  promise: (client) => client.graphql('{users(ids: ' + getFriendsQLString(ids) + ') {id, login, email, friends}}')
});

export const removeFriend = (userId, friendId) => ({
  types: [REMOVE_FRIEND, REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_FAIL],
  promise: (client) => client.graphql('mutation {removeFriend(userId: "' + userId + '", friendId: "' + friendId + '") {user {id, login, email, friends}, friends {id, login, email, friends}}}')
});

export const addFriend = (userId, friendId) => ({
  types: [ADD_USER_FRIEND, ADD_USER_FRIEND_SUCCESS, ADD_USER_FRIEND_FAIL],
  promise: (client) => client.graphql('mutation {addFriend(userId: "' + userId + '", friendId: "' + friendId + '") {user {id, login, email, friends} friends {id, login, email, friends}}}')
});

export const findFriend = (login) => ({
  types: [FIND_USER_FRIEND, FIND_USER_FRIEND_SUCCESS, FIND_USER_FRIEND_FAIL],
  promise: (client) => client.graphql('mutation {user: findFriend(login: "' + login + '") {id, login, email, friends}}')
});
