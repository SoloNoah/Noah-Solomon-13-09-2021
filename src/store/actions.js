import { SET_FORECAST, SET_SEARCH_RESULTS } from './actionTypes';
import weatherService from '../services/weatherService';

export const setForecast = (value) => async (dispatch) => {
  try {
    console.log(value);
    const res = await weatherService.loadForecast(value);
    console.log(res);
    dispatch({
      type: SET_FORECAST,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setSearchResults = (city) => async (dispatch) => {
  try {
    const res = await weatherService.loadWeather(city);
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: res,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
