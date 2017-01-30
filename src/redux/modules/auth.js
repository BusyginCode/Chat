import cookie from 'react-cookie';

const LOAD_REQUEST = 'chat/auth/LOAD_REQUEST';
const LOAD_SUCCESS = 'chat/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'chat/auth/LOAD_FAIL';

const CLEAR_STORE = 'CHANGE_EMAIL';

const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_LOGIN = 'CHANGE_LOGIN';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

const LOGIN = 'chat/auth/LOGIN';
const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';

const SIGNUP = 'chat/auth/SIGNUP';
const SIGNUP_SUCCESS = 'chat/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'chat/auth/SIGNUP_FAIL';

const DELETE_TOKEN_FROM_STORE = 'chat/auth/DELETE_TOKEN_FROM_STORE';

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
    case LOAD_SUCCESS:
      return {
        ...state,
        token: action.result.token,
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
