export const LOAD_REQUEST = 'sociometry-react/members/LOAD_REQUEST';
export const LOAD_SUCCESS = 'sociometry-react/members/LOAD_SUCCESS';
export const LOAD_FAIL = 'sociometry-react/members/LOAD_FAIL';

export const ADD_REQUEST = 'sociometry-react/members/ADD_REQUEST';
export const ADD_SUCCESS = 'sociometry-react/members/ADD_SUCCESS';
export const ADD_FAIL = 'sociometry-react/members/ADD_FAIL';

export const UPDATE_REQUEST = 'sociometry-react/members/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'sociometry-react/members/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'sociometry-react/members/UPDATE_FAIL';

export const OPEN_MEMBERS_EDIT_MODAL = 'sociometry-react/members/OPEN_MEMBERS_EDIT_MODAL';
export const CLOSE_MEMBERS_EDIT_MODAL = 'sociometry-react/members/CLOSE_MEMBERS_EDIT_MODAL';

export const MEMBER_EDIT_ID_SET = 'sociometry-react/members/MEMBER_EDIT_ID_SET';

export const CLEAR_STORE = 'sociometry-react/members/CLEAR_STORE';

export const CLEAR_STORE_WITH_MEMBERS = 'sociometry-react/members/CLEAR_STORE_WITH_MEMBERS';

export const MEMBER_ID_CHANGE = 'sociometry-react/members/MEMBER_ID_CHANGE';
export const MEMBER_NAME_CHANGE = 'sociometry-react/members/MEMBER_NAME_CHANGE';
export const MEMBER_SUR_NAME_CHANGE = 'sociometry-react/members/MEMBER_SUR_NAME_CHANGE';
export const MEMBER_STATUS_CHANGE = 'sociometry-react/members/MEMBER_STATUS_CHANGE';
export const MEMBER_OWNER_CHANGE = 'sociometry-react/members/MEMBER_OWNER_CHANGE';
export const MEMBER_GROUP_CHANGE = 'sociometry-react/members/MEMBER_GROUP_CHANGE';
export const MEMBER_SEX_ID_CHANGE = 'sociometry-react/members/MEMBER_SEX_ID_CHANGE';
export const MEMBER_BIRTHDAY_CHANGE = 'sociometry-react/members/MEMBER_BIRTHDAY_CHANGE';

export const initialState = {
  members: null,
  memberId: '',
  memberName: '',
  memberSurName: '',
  memberStatus: 'PRESENT',
  memberOwner: 100,
  memberGroup: 1,
  memberSexualIdentity: 'MALE',
  memberBirthday: '',
  memberAddingModalOpen: false,
  memberEditingModalId: null,
};

import getIndexFromObjectsArray from 'utils/getIndexFromObjectsArray'

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case LOAD_SUCCESS:
      console.log("MEMBER LOAD", action.result)
      return {
        ...state,
        members: action.result._embedded.surveyMembers // need use real key from API
      };
    case LOAD_FAIL:
      return {
        ...state,
        members: []
      };
    case UPDATE_SUCCESS:
      const index = getIndexFromObjectsArray(state.members, "id", action.result['id'])
      const newMembers = [...state.members]
      newMembers[index] = action.result
      return {
        ...state,
        members: newMembers
      };
    case MEMBER_ID_CHANGE:
      return {
        ...state,
        memberId: action.value
      };
    case MEMBER_NAME_CHANGE:
      return {
        ...state,
        memberName: action.value
      };
    case MEMBER_SUR_NAME_CHANGE:
      return {
        ...state,
        memberSurName: action.value
      };
    case MEMBER_STATUS_CHANGE:
      return {
        ...state,
        memberStatus: action.value
      };
    case MEMBER_OWNER_CHANGE:
      return {
        ...state,
        memberOwner: action.value
      };
    case MEMBER_GROUP_CHANGE:
      return {
        ...state,
        memberGroup: action.value
      };
    case MEMBER_SEX_ID_CHANGE:
      return {
        ...state,
        memberSexualIdentity: action.value
      };
    case MEMBER_BIRTHDAY_CHANGE:
      return {
        ...state,
        memberBirthday: action.value
      };
    case OPEN_MEMBERS_EDIT_MODAL:
      return {
        ...state,
        memberAddingModalOpen: true
      };
    case CLOSE_MEMBERS_EDIT_MODAL:
      return {
        ...state,
        memberAddingModalOpen: false,
        memberEditingModalId: null
      };
    case ADD_SUCCESS:
      return {
        ...state,
        members: [...state.members, action.result]
      };
    case CLEAR_STORE_WITH_MEMBERS:
      return {
        ...state,
        members: null,
        memberId: '',
        memberName: '',
        memberSurName: '',
        memberStatus: 'PRESENT',
        memberOwner: 100,
        memberGroup: 1,
        memberSexualIdentity: 'MALE',
        memberBirthday: '',
        memberAddingModalOpen: false,
        memberEditingModalId: null,
      };
    case CLEAR_STORE:
      return {
        ...state,
        memberId: '',
        memberName: '',
        memberSurName: '',
        memberStatus: 'PRESENT',
        memberOwner: 100,
        memberGroup: 1,
        memberSexualIdentity: 'MALE',
        memberBirthday: '',
        memberAddingModalOpen: false,
        memberEditingModalId: null,
      };
    case MEMBER_EDIT_ID_SET:
      return {
        ...state,
        memberId: action.member.id,
        memberName: action.member.name,
        memberSurName: action.member.surName,
        memberStatus: action.member.status,
        memberSexualIdentity: action.member.sexualIdentity,
        memberBirthday: action.member.birthday,
        memberAddingModalOpen: false,
        memberEditingModalId: action.id
      };
    default: return state;
  }

}

export const loadMembers = (id) => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client, getState) => client.get(`/api/surveyMembers/search/byGroup?id=${id}`)
});

export const add = (data) => ({
  types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL],
  promise: client => client.post('/api/surveyMembers', { data })
});

export const update = (id, data) => ({
  types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
  promise: client => client.put(`/api/surveyMembers/${id}`, { data })
});

export const openMemberAddingModal = () => ({
  type: OPEN_MEMBERS_EDIT_MODAL
});

export const closeMemberAddingModal = () => ({
  type: CLOSE_MEMBERS_EDIT_MODAL
});

export const clearStore = () => ({
  type: CLEAR_STORE
});

export const clearStoreWithMembers = () => ({
  type: CLEAR_STORE_WITH_MEMBERS
});

export const changeMemberFields = (type, value) => ({
  type,
  value
})

export const isLoadedMembers = (state) => state.members.members;

export const setMemberEditId = (id, member) => ({
  type: MEMBER_EDIT_ID_SET,
  id: id,
  member
})
