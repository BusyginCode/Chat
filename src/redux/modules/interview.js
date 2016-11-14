export const INTERVIEW_REQUEST = 'sociometry-react/interview/INTERVIEW_REQUEST';
export const INTERVIEW_SUCCESS = 'sociometry-react/interview/INTERVIEW_SUCCESS';
export const INTERVIEW_FAIL = 'sociometry-react/interview/INTERVIEW_FAIL';

export const CLEAR_STORE = 'sociometry-react/interview/CLEAR_STORE';

export const CHANGE_ANSWER = 'sociometry-react/interview/CHANGE_ANSWER';

export const DELETE_LAST_ANSWER = 'sociometry-react/interview/DELETE_LAST_ANSWER';

export const ANSWER_REQUEST = 'sociometry-react/interview/ANSWER_REQUEST';
export const ANSWER_SUCCESS = 'sociometry-react/interview/ANSWER_SUCCESS';
export const ANSWER_FAIL = 'sociometry-react/interview/ANSWER_FAIL';

export const initialState = {
  questions: null,
  questionsAnswers: [],
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case INTERVIEW_SUCCESS:
      const questionsAnswers = {} 
      action.result.forEach((question) => questionsAnswers[question.id] = [])
      console.log("INTERVIEW ", action.result, questionsAnswers)
      return {
        ...state,
        questions: action.result,
        questionsAnswers: questionsAnswers
      };
    case ANSWER_SUCCESS:
      console.log('action result', action.result)
      return {
        ...state,
      };
    case CLEAR_STORE:
      return {
        ...state,
        questionsAnswers: []
      };
    case CHANGE_ANSWER:
      let newAnswers = { ...state.questionsAnswers }
      newAnswers[action.id] = [...newAnswers[action.id], action.value]
      return {
        ...state,
        questionsAnswers: newAnswers
      };
    case DELETE_LAST_ANSWER:
      let answersForDelete = { ...state.questionsAnswers }
      answersForDelete[action.id] = answersForDelete[action.id].slice(0, -1)
      return {
        ...state,
        questionsAnswers: answersForDelete
      };
    default: return state;
  }

}

export const loadInterview = (memberInterviewId) => ({
  types: [INTERVIEW_REQUEST, INTERVIEW_SUCCESS, INTERVIEW_FAIL],
  promise: (client, getState) => client.get(`/open/questions?surveyId=1`)
});

export const changeAnswer = (answerId, value) => ({
  type: CHANGE_ANSWER,
  id: answerId,
  value
});

export const deleteLastAnswer = (answerId) => ({
  type: DELETE_LAST_ANSWER,
  id: answerId
});

export const clearStore = () => ({
  type: CLEAR_STORE
});

export const sendAnswer = (pin, data) => ({
  types: [ANSWER_REQUEST, ANSWER_SUCCESS, ANSWER_FAIL],
  promise: (client, getState) => client.post(`/open/results/${pin}`, { data: data })
});

export const isLoadedInterview = (state) => state.interview.questions && state.interview.questions.length;



