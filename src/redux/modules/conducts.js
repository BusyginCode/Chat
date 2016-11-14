export const LOAD_REQUEST = 'sociometry-react/conducts/LOAD_REQUEST';
export const LOAD_SUCCESS = 'sociometry-react/conducts/LOAD_SUCCESS';
export const LOAD_FAIL = 'sociometry-react/conducts/LOAD_FAIL';

export const ADD_REQUEST = 'sociometry-react/conducts/ADD_REQUEST';
export const ADD_SUCCESS = 'sociometry-react/conducts/ADD_SUCCESS';
export const ADD_FAIL = 'sociometry-react/conducts/ADD_FAIL';

export const UPDATE_REQUEST = 'sociometry-react/conducts/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'sociometry-react/conducts/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'sociometry-react/conducts/UPDATE_FAIL';

export const OPEN_CONDUCTS_EDIT_MODAL = 'sociometry-react/conducts/OPEN_CONDUCTS_EDIT_MODAL';
export const CLOSE_CONDUCTS_EDIT_MODAL = 'sociometry-react/conducts/CLOSE_CONDUCTS_EDIT_MODAL';
export const CONDUCT_GROUP_CHANGE = 'sociometry-react/conducts/CONDUCT_GROUP_CHANGE';
export const CONDUCT_NOTES_CHANGE = 'sociometry-react/conducts/CONDUCT_NOTES_CHANGE';

export const CONDUCT_EDIT_ID_SET = 'sociometry-react/conducts/CONDUCT_EDIT_ID_SET';

export const CHANGE_CONDUCT_REQUEST = 'sociometry-react/conducts/CHANGE_CONDUCT_REQUEST';
export const CHANGE_CONDUCT_SUCCESS = 'sociometry-react/conducts/CHANGE_CONDUCT_SUCCESS';
export const CHANGE_CONDUCT_FAIL = 'sociometry-react/conducts/CHANGE_CONDUCT_FAIL';

export const initialState = {
  conducts: null,
  conductStartDate: '',
  conductNotes: '',
  conductStatus: '',
  conductGroup: '',
  conductAddingModalOpen: false,
  conductEditingModalId: null,
};

import getIndexFromObjectsArray from 'utils/getIndexFromObjectsArray'

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        conducts: action.result._embedded.surveyConducts
      };
    case LOAD_FAIL:
      return {
        ...state,
        conducts: []
      };
    case CHANGE_CONDUCT_SUCCESS:
      console.log("BEFORE CONDUCTS", state.conducts)
      console.log("BEFORE CONDUCTS RESULT", action.result)
      const index = getIndexFromObjectsArray(state.conducts, "id", action.result['id'])
      const newConducts = [...state.conducts]
      newConducts[index] = action.result
      console.log("NEW CONDUCTS", newConducts, index)
      console.log("CONDUCTS", state.conducts)
      return {
        ...state,
        conducts: newConducts
      };
      
    case OPEN_CONDUCTS_EDIT_MODAL:
      return {
        ...state,
        conductAddingModalOpen: true
      };
    case CLOSE_CONDUCTS_EDIT_MODAL:
      return {
        ...state,
        conductAddingModalOpen: false,
        conductEditingModalId: null
      };
    case CONDUCT_EDIT_ID_SET:
      return {
        ...state,
        conductAddingModalOpen: false,
        conductEditingModalId: action.id,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        conducts: [...state.conducts, action.result]
      };
    case CONDUCT_GROUP_CHANGE:
      return {
        ...state,
        conductGroup: action.value
      };
    case CONDUCT_NOTES_CHANGE:
      return {
        ...state,
        conductNotes: action.value
      }
    default: return state;
  }

}

export const loadCoducts = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client, getState) => client.get(`api/surveyConducts/search/my?owner=${getState().auth.userID}`)
});

export const add = (data) => ({
  types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL],
  promise: client => client.post('api/surveyConducts', { data })
});

export const update = (id, data) => ({
  types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
  promise: client => client.put(`api/surveyConducts/${id}`, { data })
});

export const openAddingModal = () => ({
  type: OPEN_CONDUCTS_EDIT_MODAL
});

export const changeConductFields = (type, value) => ({
  type,
  value
});

export const closeAddingModal = () => ({
  type: CLOSE_CONDUCTS_EDIT_MODAL
});

export const setConductStatus = (id, status, index) => ({
  types: [CHANGE_CONDUCT_REQUEST, CHANGE_CONDUCT_SUCCESS, CHANGE_CONDUCT_FAIL],
  index,
  promise: client => client.get(`/api/surveyConduct/action?id=${id}&status=${status}`)
});

export const setConductEditId = (id, number, letter) => ({
  type: CONDUCT_EDIT_ID_SET,
  id: id,
  letter,
  number
});

export const isLoaded = (state) => state.conducts.conducts;
