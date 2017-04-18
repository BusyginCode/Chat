export const GET_MUTATION = 'little-chat/chat/GET_USER';
export const GET_MUTATION_SUCCESS = 'little-chat/chat/GET_USER_SUCCESS';
export const GET_MUTATION_FAIL = 'little-chat/chat/GET_USER_FAIL';

export const ADD_USER_FRIEND = 'little-chat/chat/ADD_USER_FRIEND';
export const ADD_USER_FRIEND_SUCCESS = 'little-chat/chat/ADD_USER_FRIEND_SUCCESS';
export const ADD_USER_FRIEND_FAIL = 'little-chat/chat/ADD_USER_FRIEND_FAIL';

export const FIND_USER_FRIENDS = 'little-chat/chat/FIND_USER_FRIENDS';
export const FIND_USER_FRIENDS_SUCCESS = 'little-chat/chat/FIND_USER_FRIENDS_SUCCESS';
export const FIND_USER_FRIENDS_FAIL = 'little-chat/chat/FIND_USER_FRIENDS_FAIL';

export const CHANGE_MENU_INSET = 'little-chat/chat/CHANGE_MENU_INSET';

export const initialState = {
  choosenMenuInset: 'friends',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case GET_MUTATION:
    console.log('get mutation', action);
    return {
      ...state,
    };
  case GET_MUTATION_SUCCESS:
    console.log('get mutation success', action);
    return {
      ...state,
    };
  case GET_MUTATION_FAIL:
    console.log('get mutation fail', action);
    return {
      ...state,
    };
  case CHANGE_MENU_INSET:
    return {
      ...state,
      choosenMenuInset: action.inset
    };
  default: return state;
  }
}

export const handleChangeMenuInset = (inset) => ({
  type: CHANGE_MENU_INSET,
  inset
});

export const handleMutation = () => ({
  types: [GET_MUTATION, GET_MUTATION_SUCCESS, GET_MUTATION_FAIL],
  promise: (client) => client.post('/graphql', {
    data: 'mutation {createUser(login: "Graph", email: "graph@email.com", password: "odugihfisghs") {id, login}}',
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
