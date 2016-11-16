import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

const CHANGE_LOGIN = "CHANGE_LOGIN"
const CHANGE_NICKNAME = "CHANGE_NICKNAME"
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

export const LOAD_REQUEST = 'sociometry-react/auth/LOAD_REQUEST';
export const LOAD_SUCCESS = 'sociometry-react/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'sociometry-react/auth/LOAD_FAIL';

const initialState = {
  userID: null,
  login: '',
  loaded: false,
  password: '',
  rememberMe: false,
  nickname: '',
  token: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        token: 'tocken',
      };
    
    case LOAD_FAIL:
      return {
        ...state,
        loaded: true
      };

    case CHANGE_LOGIN: 
      return {
        ...state,
        login: action.login
      }
    case CHANGE_NICKNAME: 
      return {
        ...state,
        nickname: action.nickname
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
        token: 'tocken'
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.result.token,
        userID: jwtDecode(action.result.token).user_id
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: "Login error"
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
        userID: jwtDecode(action.result.token).user_id
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        error: "Sign Up Error"
      };
    case DELETE_TOKEN_FROM_STORE:
      return {
        ...state,
        token: null,
        userID: null
      };
      
    default:
      return state;
  }
}

export const changeLogin = (value) => {
  return {
    type: CHANGE_LOGIN,
    login: value
  };
};

export const changeNickname = (value) => {
  return {
    type: CHANGE_NICKNAME,
    nickname: value
  }
};

export const changePassword = (value) => {
  return {
    type: CHANGE_PASSWORD,
    password: value
  }
};

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
};

export const handleLogin = (login, password) => {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/signin', {
      data: {
        "username": login, 
        "password": password
      }
    })
  };
};

// {"email":"jusalex@mail.ru", "nickname":"jusalex", "password":"11111111"}

export const handleSignUp = (email, nickname, password) => {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signup', {
      data: {
        email,
        nickname,
        password
      }
    })
  };
};

export const isLoaded = (state) => state.auth.loaded;

/**
 * set auth token Bearer in cookie
 * @see https://jwt.io/
 * @param {string} token - jwt token
 */
export const storeAuthToken = token => (
  cookie.save('authToken', token, { path: '/' })
);

/**
 * delete auth token Bearer from cookie
 */
export const deleteAuthToken = () => (
  cookie.remove('authToken', { path: '/' })
);

/**
 * delete auth token Bearer from store
 */
export const deleteAuthStoreToken = () => {
  return {
    type: DELETE_TOKEN_FROM_STORE
  }
}

/**
 * check if user loggined
 * @return {AsyncAction}
 */
export const load = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get('/token/validate')
});
