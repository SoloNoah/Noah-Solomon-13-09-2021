// JSON imports
import FIVE_DAYFORECAST_DATA from '../dummy-data/5dayforcast.json';

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
    if (!localStorage.getItem('forecast')) {
      // const res = await axios.get(requestPath, { params });
      // const data = await res.data;
      const data = [...FIVE_DAYFORECAST_DATA]; //DELETE THIS AFTERWARDS. SENDING REQUEST TO API WORKS
      localStorage.setItem('forecast', JSON.stringify(data[0]));
      return data;
    }
    const paresedForecast = JSON.parse(localStorage.getItem('forecast'));
    return paresedForecast;
  } catch (error) {
    console.log(error);
  }
};

export default { loadForecast };
