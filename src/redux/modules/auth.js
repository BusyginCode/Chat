import cookie from 'react-cookie';

export const GET_USER = 'chat/auth/GET_USER';
export const GET_USER_SUCCESS = 'chat/auth/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'chat/auth/GET_USER_FAIL';

export const SET_USER = 'chat/auth/SET_USER';

export const LOAD_REQUEST = 'chat/auth/LOAD_REQUEST';
export const LOAD_SUCCESS = 'chat/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'chat/auth/LOAD_FAIL';

export const CLEAR_STORE = 'chat/auth/CLEAR_STORE';

export const CHANGE_EMAIL = 'chat/auth/CHANGE_EMAIL';
export const CHANGE_LOGIN = 'chat/auth/CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'chat/auth/CHANGE_PASSWORD';

export const LOGIN = 'chat/auth/LOGIN';
export const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';

export const SIGNUP = 'chat/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'chat/auth/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'chat/auth/SIGNUP_FAIL';

export const DELETE_TOKEN_FROM_STORE = 'chat/auth/DELETE_TOKEN_FROM_STORE';

const initialState = {
  user: null,
  email: '',
  loaded: false,
  password: '',
  login: '',
  token: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.result.data.user,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        token: action.result.token,
        user: action.result.user,
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

export const handleSetUser = (user) => ({
  type: SET_USER,
  user
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
