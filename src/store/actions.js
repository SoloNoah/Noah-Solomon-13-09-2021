import { SET_FORECAST } from './actionTypes';
import weatherService from '../services/weatherService';

export const setForecast = (value) => async (dispatch) => {
  try {
    const res = await weatherService.loadForecast(value);
    dispatch({
      type: SET_FORECAST,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const func = () => (dispatch) => {
  try {
    //some code
  } catch (error) {
    //     console.log(error);
  }
};
