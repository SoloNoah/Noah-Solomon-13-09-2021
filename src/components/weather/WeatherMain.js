import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WeatcherSearch from './WeatcherSearch';
import WeatherList from './WeatherList';

import { manageFavorites, setForecast, setLikesOnLoad } from '../../store/actions';

const WeatherMain = ({ searchResults, forecast, setForecast, setLikesOnLoad, manageFavorites }) => {
  const defaultCity = { Key: '215854', LocalizedName: 'Tel Aviv' };
  const [chosenCity, setChoesenCity] = useState(defaultCity);
  const [likeState, setLikeState] = useState();

  const onCitySubmit = async (city) => {
    const { Key, LocalizedName } = city;
    const newStateCity = { Key, LocalizedName };
    setChoesenCity(newStateCity);
  };

  useEffect(() => {
    if (chosenCity !== null) {
      const localStorageFav = localStorage.getItem('likes');
      setLikeState(() => {
        return localStorageFav?.includes(chosenCity.Key);
      });
      setForecast(chosenCity.Key);
    }
  }, [chosenCity]);

  useEffect(() => {
    setLikesOnLoad();
    setForecast(chosenCity.Key);
  }, []);

  const onLikeClicked = () => {
    manageFavorites(chosenCity);
    setLikeState(!likeState);
  };

  return (
    <>
      <WeatcherSearch onCitySubmit={onCitySubmit} />
      {!forecast ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {/* Current weather */}
          <h1>This is the weather for {chosenCity.LocalizedName}</h1>
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
  setLikesOnLoad,
  manageFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
