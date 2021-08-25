import { SOME_CONST } from './actionTypes';

const initialState = {
  string: '',
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SOME_CONST:
      return {
        ...state,
        string: payload,
      };
    default:
      return state;
  }
}
