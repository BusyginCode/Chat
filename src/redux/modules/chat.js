export const GET_MUTATION = 'little-chat/chat/GET_USER';
export const GET_MUTATION_SUCCESS = 'little-chat/chat/GET_USER_SUCCESS';
export const GET_MUTATION_FAIL = 'little-chat/chat/GET_USER_FAIL';

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

export const changeMenuInset = (inset) => ({
  type: CHANGE_MENU_INSET,
  inset
});

// export const handleMutation = () => ({
//   types: [GET_MUTATION, GET_MUTATION_SUCCESS, GET_MUTATION_FAIL],
//   promise: (client) => client.post('/graphql', {
//     data: 'mutation {createUser(login: "Graph", email: "graph@email.com", password: "odugihfisghs") {id, login}}',
//     headers: {
//       "Content-Type": "application/graphql"
//     }
//   })
// });
