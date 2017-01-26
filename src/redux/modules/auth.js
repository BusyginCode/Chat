import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

const LOAD_REQUEST = 'sociometry-react/auth/LOAD_REQUEST';
const LOAD_SUCCESS = 'sociometry-react/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'sociometry-react/auth/LOAD_FAIL';

const CHANGE_EMAIL = "CHANGE_EMAIL"
const CHANGE_LOGIN = "CHANGE_LOGIN"
const CHANGE_PASSWORD = "CHANGE_PASSWORD"
const CLEAR_FORM = "CLEAR_FORM"
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const SIGNUP = 'redux-example/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/auth/SIGNUP_FAIL';
const SIGN_TYPE_CHANGE = "SIGN_TYPE_CHANGE";
const CHANGE_REMEMBER_ME = "CHANGE_REMEMBER_ME";
const DELETE_TOKEN_FROM_STORE = "DELETE_TOKEN_FROM_STORE";

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
    console.log('LOAD TOKEN', action)
      return {
        ...state,
        token: action.result.token,
      };
    case LOAD_REQUEST:
    console.log('LOAD LOAD_REQUEST', action)
      return {
        ...state,
      };
    case LOAD_FAIL:
    console.log('LOAD LOAD_FAIL', action)
      return {
        ...state,
      };
    case CHANGE_EMAIL: 
      return {
        ...state,
        email: action.email
      }
    case CHANGE_LOGIN: 
      return {
        ...state,
        login: action.login
      }
    case CHANGE_PASSWORD: 
      return {
        ...state,
        password: action.password
      }
    case LOGIN:
      return {
        ...state,
        error: null,
      };
    case LOGIN_SUCCESS:
      console.log(action)
      return {
        ...state,
        token: action.result.token,
        user: action.result.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.result.error
      };
    case SIGNUP:
      return {
        ...state,
        error: null
      };
    case SIGNUP_SUCCESS:
      console.log(action)
      return {
        ...state,
        token: action.result.token,
        user: action.result.user
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        error: action.result.error
      }   
    case DELETE_TOKEN_FROM_STORE:
      return {
        ...state,
        token: null,
      }
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
  }
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

export const isLoaded = (state) => state.auth.token;

export const storeAuthToken = token =>
  cookie.save('authToken', token, { path: '/' })

export const deleteAuthToken = () =>
  cookie.remove('authToken', { path: '/' })

export const deleteAuthStoreToken = () => ({
  type: DELETE_TOKEN_FROM_STORE
})


export const loadToken = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get('/validateToken')
})

