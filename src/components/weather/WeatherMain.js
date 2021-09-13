import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import WeatcherSearch from './WeatcherSearch';
import WeatherList from './WeatherList';

import { setForecast, setSearchResults } from '../../store/actions';

const WeatherMain = ({ searchResults, forecast, setSearchResults, setForecast }) => {
  const onCitySearch = async (city) => {
    let res = await setSearchResults(city);
    setForecast(res[0].Key);
  };

  useEffect(() => {
    setForecast('215854');
  }, []);

  return (
    <>
      <WeatcherSearch onCitySearch={onCitySearch} />
      {!forecast ? <div>Loading...</div> : <WeatherList searchResults={searchResults} forecast={forecast} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.root.searchResults,
  forecast: state.root.forecast,
});

const mapDispatchToProps = {
  setForecast,
  setSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
