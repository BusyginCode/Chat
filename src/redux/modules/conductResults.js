export const CONDUCT_RESULT_REQUEST = 'sociometry-react/conductResults/CONDUCT_RESULT_REQUEST';
export const CONDUCT_RESULT_SUCCESS = 'sociometry-react/conductResults/CONDUCT_RESULT_SUCCESS';
export const CONDUCT_RESULT_FAIL = 'sociometry-react/conductResults/PIN_FAIL';

export const initialState = {
  results: null
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case CONDUCT_RESULT_SUCCESS:
      console.log(action.result)
      return {
        ...state,
        results: action.result
      };
    case CONDUCT_RESULT_FAIL:
      return {
        ...state,
        results: []
      };
    default: return state;
  }

}

export const loadConductResults = (conductId) => ({
  types: [CONDUCT_RESULT_REQUEST, CONDUCT_RESULT_SUCCESS, CONDUCT_RESULT_FAIL],
  promise: (client, getState) => client.get(`/api/surveyConduct/results?id=${conductId}`)
});

export const isLoadedConductResults = (state) => state.conductResults.results && state.conductResults.results.length;



