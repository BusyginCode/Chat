export const LOAD_REQUEST = 'sociometry-react/classes/LOAD_REQUEST';
export const LOAD_SUCCESS = 'sociometry-react/classes/LOAD_SUCCESS';
export const LOAD_FAIL = 'sociometry-react/classes/LOAD_FAIL';

export const ADD_REQUEST = 'sociometry-react/classes/ADD_REQUEST';
export const ADD_SUCCESS = 'sociometry-react/classes/ADD_SUCCESS';
export const ADD_FAIL = 'sociometry-react/classes/ADD_FAIL';

export const UPDATE_REQUEST = 'sociometry-react/classes/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'sociometry-react/classes/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'sociometry-react/classes/UPDATE_FAIL';

export const CLASS_NUMBER_ADDING_CHANGE = 'sociometry-react/classes/CLASS_NUMBER_ADDING_CHANGE';
export const CLASS_LETTER_ADDING_CHANGE = 'sociometry-react/classes/CLASS_LETTER_ADDING_CHANGE';
export const OPEN_CLASSES_EDIT_MODAL = 'sociometry-react/classes/OPEN_CLASSES_EDIT_MODAL';
export const CLOSE_CLASSES_EDIT_MODAL = 'sociometry-react/classes/CLOSE_CLASSES_EDIT_MODAL';

export const CLASS_EDIT_ID_SET = 'sociometry-react/classes/CLASS_EDIT_ID_SET';

export const initialState = {
  classes: null,
  classNumber: '',
  classLetter: '',
  classAddingModalOpen: false,
  classEditingModalId: null,
};

import getIndexFromObjectsArray from 'utils/getIndexFromObjectsArray'

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case LOAD_SUCCESS:
    console.log("action result ", action.result)
      return {
        ...state,
        classes: action.result._embedded.surveyGroups // need use real key from API
      };
    case LOAD_FAIL:
      return {
        ...state,
        classes: []
      };
    case CLASS_NUMBER_ADDING_CHANGE:
      return {
        ...state,
        classNumber: action.number
      };
    case CLASS_LETTER_ADDING_CHANGE:
      return {
        ...state,
        classLetter: action.letter
      };
    case OPEN_CLASSES_EDIT_MODAL:
      return {
        ...state,
        classAddingModalOpen: true,
        classNumber: '',
        classLetter: ''
      };
    case CLOSE_CLASSES_EDIT_MODAL:
      return {
        ...state,
        classAddingModalOpen: false,
        classEditingModalId: null
      };
    case CLASS_EDIT_ID_SET:
      return {
        ...state,
        classAddingModalOpen: false,
        classEditingModalId: action.id,
        classNumber: action.number,
        classLetter: action.letter,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        classes: [...state.classes, action.result]
      };
    case UPDATE_SUCCESS:
      console.log("UPDATENCLASS NUMBER", action.result)
      const index = getIndexFromObjectsArray(state.classes, "id", action.result['id'])
      const newClasses = [...state.classes]
      newClasses[index] = action.result
      return {
        ...state,
        classes: newClasses
      };
    default: return state;
  }

}

export const load = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client, getState) => client.get(`/api/surveyGroups/search/my?owner=${getState().auth.userID}`)
});

export const add = (data) => ({
  types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL],
  promise: client => client.post('/api/surveyGroups', { data })
});

export const update = (id, data) => ({
  types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
  promise: client => client.put(`/api/surveyGroups/${id}`, { data })
});

export const classNumberChange = (number) => ({
  type: CLASS_NUMBER_ADDING_CHANGE,
  number
});

export const classLetterChange = (letter) => ({
  type: CLASS_LETTER_ADDING_CHANGE,
  letter
});

export const openAddingModal = () => ({
  type: OPEN_CLASSES_EDIT_MODAL
});

export const closeAddingModal = () => ({
  type: CLOSE_CLASSES_EDIT_MODAL
});

export const setClassEditId = (id, number, letter) => ({
  type: CLASS_EDIT_ID_SET,
  id: id,
  letter,
  number
});

export const isLoadedClasses = (state) => state.classes.classes;
