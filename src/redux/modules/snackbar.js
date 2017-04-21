export const CLOSE_BAR = 'sociometry-react/snackbar/CLOSE_BAR';

export const OPEN_BAR = 'sociometry-react/snackbar/OPEN_BAR';

export const initialState = {
  isOpen: false,
  message: '',
  duration: 0,
  type: '',
  className: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_BAR:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        duration: action.duration || 2000,
        type: action.snackBarType || 'error',
        className: action.className,
      };
    case CLOSE_BAR: return initialState;
    default: return state;
  }
}

export const closeSnackBar = () => ({
  type: CLOSE_BAR,
});

export const openSnackBar = ({ message, duration, className, type }) => ({
  type: OPEN_BAR,
  message,
  duration,
  snackBarType: type,
  className,
});
