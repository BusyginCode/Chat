import cookie from 'react-cookie';

export const GET_USER = 'little-chat/auth/GET_USER';
export const GET_USER_SUCCESS = 'little-chat/auth/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'little-chat/auth/GET_USER_FAIL';

export const GET_USERS = 'little-chat/auth/GET_USERS';
export const GET_USERS_SUCCESS = 'little-chat/auth/GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'little-chat/auth/GET_USERS_FAIL';

export const GET_FRIEND = 'little-chat/auth/GET_FRIEND';
export const GET_FRIEND_SUCCESS = 'little-chat/auth/GET_FRIEND_SUCCESS';
export const GET_FRIEND_FAIL = 'little-chat/auth/GET_FRIEND_FAIL';

export const LOAD_REQUEST = 'chat/auth/LOAD_REQUEST';
export const LOAD_SUCCESS = 'chat/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'chat/auth/LOAD_FAIL';

export const CLEAR_STORE = 'CHANGE_EMAIL';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const LOGIN = 'chat/auth/LOGIN';
export const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';

export const SIGNUP = 'chat/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'chat/auth/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'chat/auth/SIGNUP_FAIL';

export const DELETE_TOKEN_FROM_STORE = 'chat/auth/DELETE_TOKEN_FROM_STORE';

const initialState = {
  user: null,
  friends: null,
  email: '',
  loaded: false,
  password: '',
  login: '',
  token: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case GET_USER:
    console.log('get user', action);
    return {
      ...state,
    };
  case GET_USER_SUCCESS:
    console.log('get user success', action);
    return {
      ...state,
      user: action.result.data.user,
    };
  case GET_USER_FAIL:
    console.log('get user fail', action);
    return {
      ...state,
    };
  case GET_USERS:
    console.log('get users', action);
    return {
      ...state,
    };
  case GET_USERS_SUCCESS:
    console.log('get users success', action);
    return {
      ...state,
      friends: action.result.data.users,
    };
  case GET_USERS_FAIL:
    console.log('get users fail', action);
    return {
      ...state,
    };
  case GET_FRIEND:
    console.log('get friend', action);
    return {
      ...state,
    };
  case GET_FRIEND_SUCCESS:
    console.log('get friend success', action);
    const friends = state.friends || [];
    const newFriends = [...friends, action.result.data.user];
    return {
      ...state,
      friends: newFriends,
    };
  case GET_FRIEND_FAIL:
    console.log('get friend fail', action);
    return {
      ...state,
    };
  case LOAD_SUCCESS:
    return {
      ...state,
      token: action.result.token,
      user: action.result.user,
    };
  case LOAD_REQUEST:
    return {
      ...state,
    };
  case LOAD_FAIL:
    return {
      ...state,
    };
  case CHANGE_EMAIL:
    return {
      ...state,
      email: action.email
    };
  case CHANGE_LOGIN:
    return {
      ...state,
      login: action.login
    };
  case CHANGE_PASSWORD:
    return {
      ...state,
      password: action.password
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      token: action.result.token,
      user: action.result.user
    };
  case LOGIN_FAIL:
    return {
      ...state,
      user: null,
    };
  case SIGNUP:
    return {
      ...state,
      error: null
    };
  case SIGNUP_SUCCESS:
    return {
      ...state,
      token: action.result.token,
      user: action.result.user
    };
  case SIGNUP_FAIL:
    return {
      ...state,
      user: null,
    };
  case DELETE_TOKEN_FROM_STORE:
    return {
      ...state,
      token: null,
      user: null,
    };
  case CLEAR_STORE:
    return {
      initialState
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
  return res.slice(0, -1).concat(']');
};

export const changeEmail = (value) => ({
  type: CHANGE_EMAIL,
  email: value
});

export const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  login: value
});

export const changePassword = (value) => {
  return {
    type: CHANGE_PASSWORD,
    password: value
  };
};

export const handleLogin = (login, password) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: (client) => client.post('/signin', {
    data: {
      login,
      password,
    }
  })
});

export const handleSignUp = (email, login, password) => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
  promise: (client) => client.post('/signup', {
    data: {
      email,
      login,
      password
    }
  })
});

export const loadToken = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get('/validateToken')
});

export const isLoaded = (state) => state.auth.token;

export const isLoadedFriends = (state) => state.auth.friends;

export const storeAuthToken = token =>
  cookie.save('authToken', token, { path: '/' });

export const deleteAuthToken = () =>
  cookie.remove('authToken', { path: '/' });

export const deleteAuthStoreToken = () => ({
  type: DELETE_TOKEN_FROM_STORE
});

export const clearStore = () => ({
  type: CLEAR_STORE
});

export const handleGetUser = (id) => ({
  types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
  promise: (client) => client.post('/graphql', {
    data: '{user(id: "' + id + '") {id, login, email, friends}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleGetFriend = (id) => ({
  types: [GET_FRIEND, GET_FRIEND_SUCCESS, GET_FRIEND_FAIL],
  promise: (client) => client.post('/graphql', {
    data: '{user(id: "' + id + '") {id, login, email, friends}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
});

export const handleGetFriends = (ids) => {
  console.log('HANDLE GET FRIENDS');
  return {
    types: [GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL],
    promise: (client) => client.post('/graphql', {
      data: '{users(ids: ' + getFriendsQLString(ids) + ') {id, login, email, friends}}',
      headers: {
        "Content-Type": "application/graphql"
      }
    })
  };
};
