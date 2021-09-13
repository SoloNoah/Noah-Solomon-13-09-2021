import { SET_FORECAST } from './actionTypes';

const initialState = {
  forecast: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FORECAST:
      return {
        ...state,
        forecast: payload,
      };
    default:
      return state;
  }
}
