export const APPROVE_REQUEST = 'sociometry-react/pins/PIN_REQUEST';
export const APPROVE_SUCCESS = 'sociometry-react/pins/PIN_SUCCESS';
export const APPROVE_FAIL = 'sociometry-react/pins/PIN_FAIL';

export const PIN_MEMBERS_REQUEST = 'sociometry-react/pins/PIN_MEMBERS_REQUEST';
export const PIN_MEMBERS_SUCCESS = 'sociometry-react/pins/PIN_MEMBERS_SUCCESS';
export const PIN_MEMBERS_FAIL = 'sociometry-react/pins/PIN_MEMBERS_FAIL';

export const PIN_CHANGE = 'sociometry-react/pins/PIN_CHANGE';

export const CLEAR_STORE = 'sociometry-react/pins/CLEAR_STORE';

export const initialState = {
  pin: '',
  pinApprove: false,
  notApprove: false,
  pinMembers: null
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case APPROVE_SUCCESS:
      return {
        ...state,
        pinApprove: action.result,
        notApprove: !action.result
      };
    case PIN_MEMBERS_SUCCESS:
      console.log("PINS MEMBERS ", action.result)
      return {
        ...state,
        pinMembers: action.result
      };
    case PIN_MEMBERS_FAIL:
      return {
        ...state,
        pinMembers: []
      };
    case PIN_CHANGE:
      return {
        ...state,
        pin: action.pin
      };
    case CLEAR_STORE:
      return {
        ...state,
        pin: '',
        pinApprove: false,
        notApprove: false
      };
    default: return state;
  }

}

export const loadApprove = () => ({
  types: [APPROVE_REQUEST, APPROVE_SUCCESS, APPROVE_FAIL],
  promise: (client, getState) => client.get(`/open/check?pin=${getState().pins.pin}`)
});

export const pinChange = (pin) => ({
  type: PIN_CHANGE,
  pin
});

export const clearStore = (pin) => ({
  type: CLEAR_STORE
});

export const loadPinMembers = (pin) => ({
  types: [PIN_MEMBERS_REQUEST, PIN_MEMBERS_SUCCESS, PIN_MEMBERS_FAIL],
  promise: (client, getState) => client.get(`/open/members?pin=${getState().pins.pin || pin}`)
});

export const isLoadedPinMembers = (state) => state.pins.pinMembers && state.pins.pinMembers.length;



