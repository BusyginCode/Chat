export const GET_USER = 'sociometry-react/chat/GET_USER';
export const GET_USER_SUCCESS = 'sociometry-react/chat/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'sociometry-react/chat/GET_USER_FAIL';

export const GET_MUTATION = 'sociometry-react/chat/GET_USER';
export const GET_MUTATION_SUCCESS = 'sociometry-react/chat/GET_USER_SUCCESS';
export const GET_MUTATION_FAIL = 'sociometry-react/chat/GET_USER_FAIL';

export const CHANGE_MENU_INSET = 'sociometry-react/chat/CHANGE_MENU_INSET';

export const initialState = {
  choosenMenuInset: 'friends',
};

export default function reducer(state = initialState, action) {
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
    };
  case GET_USER_FAIL:
    console.log('get user fail', action);
    return {
      ...state,
    };
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

export const handleGetUser = () => ({
  types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
  promise: (client) => client.post('/graphql', {
    data: '{user(id: "58eb7fa377af3521eaf7f444") {id, login, email}}',
    headers: {
      "Content-Type": "application/graphql"
    }
  })
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
