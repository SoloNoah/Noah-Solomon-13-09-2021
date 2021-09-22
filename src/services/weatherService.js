import axios from 'axios';
const API_KEY = 'nfsuzcG6OEIoo0yHgrJOov5w6Rn3C9Ak';

/**
 * Some spare keys just in case anyone wants to use locally
 * tPldUTKSv7z2ARd48H295HMusATWIkEP
 * UeHq6AizQRqtBWrHByw4yAF2TY5X6Trt
 */
const BASE_URL = 'https://dataservice.accuweather.com/';
let params = {
  apikey: API_KEY,
};
const AUTOCOMPLETE = 'locations/v1/cities/autocomplete/';
const CURRENT = 'currentconditions/v1/';
const FIVE_DAY_FORECAST = 'forecasts/v1/daily/5day/';

const loadForecast = async (city) => {
  const requestPath = BASE_URL.concat(FIVE_DAY_FORECAST, city);
  try {
    const res = await axios.get(requestPath, { params }).catch((error) => {
      throw error.toJSON();
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

const loadLocations = async (city) => {
  const requestPath = BASE_URL.concat(AUTOCOMPLETE);
  let params = {
    apikey: API_KEY,
    q: city,
  };
  try {
    const res = await axios.get(requestPath, { params }).catch((error) => {
      throw error.toJSON();
    });
    const locations = await res.data;
    const filteredData = locations.filter((location) => location.LocalizedName.includes(city));
    return filteredData;
  } catch (error) {
    return error;
  }
};

const loadCurrentData = (city) => {
  const requestPath = BASE_URL.concat(CURRENT, city);

  return axios.get(requestPath, { params });
};

const convertTempToCelsius = (value) => {
  return (5 / 9) * (value - 32);
};

export default { loadForecast, loadLocations, loadCurrentData, convertTempToCelsius };
