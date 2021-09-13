// JSON imports
import FIVE_DAYFORECAST_DATA from '../dummy-data/5dayforcast.json';
import LOCATIONS from '../dummy-data/default-location.json';

import axios from 'axios';
const API_KEY = 'tPldUTKSv7z2ARd48H295HMusATWIkEP';
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
    // const res = await axios.get(requestPath, { params });
    // const data = await res.data;
    // return data;

    const data = [...FIVE_DAYFORECAST_DATA]; //DELETE THIS AFTERWARDS. SENDING REQUEST TO API WORKS
    return data[0]; //remove
  } catch (error) {
    console.log(error); //Return error and display with toast
  }
};

const loadWeather = async (city) => {
  const requestPath = BASE_URL.concat(AUTOCOMPLETE);
  const params = {
    apikey: API_KEY,
    q: city,
  };

  // const res = await axios.get(requestPath, { params });
  // const locations = await res.data;
  const locations = [...LOCATIONS]; //remove
  const filteredData = locations.filter((location) => location.LocalizedName.includes(city));
  return filteredData;
};

export default { loadForecast, loadWeather };
