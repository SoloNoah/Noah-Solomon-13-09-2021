// JSON imports
import FIVE_DAYFORECAST_DATA from '../dummy-data/5dayforcast.json';
import LOCATIONS from '../dummy-data/default-location.json';
import CURRENTDATA from '../dummy-data/currentdata.json';

import axios from 'axios';
const API_KEY = 'tPldUTKSv7z2ARd48H295HMusATWIkEP';
// const API_KEY = '6N5Cg49mSPyEJID7d3UWP7LYaRuVwSde';
const BASE_URL = 'http://dataservice.accuweather.com/';
const AUTOCOMPLETE = 'locations/v1/cities/autocomplete/';
const CURRENT = 'currentconditions/v1/'; //+ location key
const FIVE_DAY_FORECAST = 'forecasts/v1/daily/5day/'; // + location key

const loadForecast = async (city) => {
  const requestPath = BASE_URL.concat(FIVE_DAY_FORECAST, city);
  const params = {
    apikey: API_KEY,
  };
  try {
    // const res = await axios.get(requestPath, { params }).catch((error) => {
    //   throw error.toJSON();
    // });
    // const data = await res.data;
    // return data;

    const data = [...FIVE_DAYFORECAST_DATA]; //DELETE THIS AFTERWARDS. SENDING REQUEST TO API WORKS
    return data[0]; //remove
  } catch (error) {
    return error;
  }
};

const loadLocations = async (city) => {
  const requestPath = BASE_URL.concat(AUTOCOMPLETE);
  const params = {
    apikey: API_KEY,
    q: city,
  };
  try {
    // const res = await axios.get(requestPath, { params }).catch((error) => {
    //   throw error.toJSON();
    // });
    // const locations = await res.data;
    const locations = [...LOCATIONS]; //remove
    const filteredData = locations.filter((location) => location.LocalizedName.includes(city));
    return filteredData;
  } catch (error) {
    return error; //Return error and display with toast
  }
};

const loadCurrentData = (city) => {
  // const requestPath = BASE_URL.concat(CURRENT, city);
  // const params = {
  //   apikey: API_KEY,
  // };
  // return axios.get(requestPath, { params });
  const current = [...CURRENTDATA];
  return current;
};

const convertTempToCelsius = (value) => {
  return (5 / 9) * (value - 32);
};

export default { loadForecast, loadLocations, loadCurrentData, convertTempToCelsius };
