import { SET_FORECAST, SET_SEARCH_RESULTS, SET_LIKES_ONLOAD, MANAGE_FAVORITE, SET_TEMP_UNIT } from './actionTypes';
import weatherService from '../services/weatherService';
import favoriteService from '../services/favoriteService';

export const setForecast = (value) => async (dispatch) => {
  try {
    const res = await weatherService.loadForecast(value);
    const { DailyForecasts } = res;
    let tempArr = [];
    DailyForecasts.forEach((day) => {
      let obj = {};
      obj.K = day.Temperature.Maximum.Value;
      let celsius = weatherService.convertTempToCelsius(obj.K);
      obj.C = celsius.toFixed(0);
      tempArr.push(obj);
    });

    dispatch({
      type: SET_FORECAST,
      payload: tempArr,
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

export const setLikesOnLoad = () => (dispatch) => {
  try {
    const likedLocation = favoriteService.getFavLocations();
    dispatch({
      type: SET_LIKES_ONLOAD,
      payload: likedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

export const manageFavorites = (favLocation) => (dispatch) => {
  try {
    dispatch({ type: MANAGE_FAVORITE, payload: favLocation });
  } catch (error) {
    console.log("Couldn't set like for location");
  }
};

export const changeTempUnit = (unit) => (dispatch) => {
  try {
    dispatch({ type: SET_TEMP_UNIT, payload: unit });
  } catch (error) {
    console.log("Couldn't change temp unit");
  }
};
