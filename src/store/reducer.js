import { SET_FORECAST, SET_SEARCH_RESULTS, SET_LIKES_ONLOAD, MANAGE_FAVORITE } from './actionTypes';

const initialState = {
  forecast: null,
  searchResults: [],
  favorites: [],
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
    case SET_LIKES_ONLOAD:
      return {
        ...state,
        favorites: payload,
      };
    case MANAGE_FAVORITE:
      for (const index in state.favorites) {
        if (state.favorites[index].Key === payload.Key) {
          let updatedLikes = state.favorites.filter((likedObj) => likedObj.Key !== payload.Key);
          localStorage.setItem('likes', JSON.stringify(updatedLikes));
          return { ...state, favorites: updatedLikes };
        }
      }
      const likeStateUpdate = [...state.favorites, payload];
      localStorage.setItem('likes', JSON.stringify(likeStateUpdate));
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };

    default:
      return state;
  }
}
