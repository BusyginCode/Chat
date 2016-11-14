export const START_LOAD = 'sociometry-react/loader/START_LOAD';

export const STOP_LOAD = 'sociometry-react/loader/STOP_LOAD';

export const initialState = {
  load: -1
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        load: 0
      };
    case STOP_LOAD:
      return {
        ...state,
        load: 100
      };
    default: return state;
  }

}

export const startLoad = () => ({
  type: START_LOAD
});

export const stopLoad = () => ({
  type: STOP_LOAD
});





