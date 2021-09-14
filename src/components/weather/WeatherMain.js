import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WeatcherSearch from './WeatcherSearch';
import WeatherList from './WeatherList';

import { manageFavorites, setForecast, setSearchResults, setLikesOnLoad } from '../../store/actions';

const WeatherMain = ({ searchResults, forecast, setSearchResults, setForecast, setLikesOnLoad, manageFavorites }) => {
  const defaultCity = '215854';
  const [chosenCity, setCity] = useState(defaultCity);
  const [likeState, setLikeState] = useState();

  const onCitySearch = async (city) => {
    let res = await setSearchResults(city);
    setCity(res[0].Key);
    setForecast(res[0].Key);
  };

  useEffect(() => {
    if (chosenCity !== null) {
      const localStorageFav = localStorage.getItem('likes');
      setLikeState(() => {
        return localStorageFav?.includes(chosenCity);
      });
    }
  }, [chosenCity]);

  useEffect(() => {
    setLikesOnLoad();
    setForecast(chosenCity);
  }, []);

  const onLikeClicked = () => {
    manageFavorites(chosenCity);
    setLikeState(!likeState);
  };

  return (
    <>
      <WeatcherSearch onCitySearch={onCitySearch} />
      {!forecast ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Current weather */}
          {!likeState ? (
            <button className='like__btn' onClick={onLikeClicked}>
              Like
            </button>
          ) : (
            <button className='like__btn liked' onClick={onLikeClicked}>
              Dislike
            </button>
          )}
          <WeatherList searchResults={searchResults} forecast={forecast} />
        </div>
      )}
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
  setLikesOnLoad,
  manageFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
