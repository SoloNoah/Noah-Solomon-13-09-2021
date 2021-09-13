import { SET_FORECAST, SET_SEARCH_RESULTS } from './actionTypes';

const initialState = {
  forecast: null,
  searchResults: [],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FORECAST:
      return {
        ...state,
        forecast: payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [...payload],
      };
    default:
      return state;
  }
}
