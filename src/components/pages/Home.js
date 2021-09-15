import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WeatcherSearch from '../weather/WeatcherSearch';
import WeatherList from '../weather/WeatherList';
import FavoriteCard from '../favorite/FavoriteCard';

import weatherService from '../../services/weatherService';

import { manageFavorites, setForecast, setLikesOnLoad } from '../../store/actions';

const WeatherMain = ({ forecast, setForecast, setLikesOnLoad, manageFavorites }) => {
  const defaultCity = { Key: '215854', LocalizedName: 'Tel Aviv' };
  const [chosenCity, setChosenCity] = useState(defaultCity);
  const [likeState, setLikeState] = useState();
  const [currentCondition, setCurrentCondition] = useState();

  const onCitySubmit = async (city) => {
    const { Key, LocalizedName } = city;
    const newStateCity = { Key, LocalizedName };
    setChosenCity(newStateCity);
  };

  useEffect(() => {
    if (chosenCity !== null) {
      let mounted = true;
      const localStorageFav = localStorage.getItem('likes');
      setLikesOnLoad();

      setLikeState(() => {
        return localStorageFav?.includes(chosenCity.Key);
      });
      setForecast(chosenCity.Key);
      if (mounted) {
        weatherService.loadCurrentData(chosenCity.Key).then((data) => {
          setCurrentCondition(data);
        });
      }
      return () => (mounted = false);
    }
  }, [chosenCity, setForecast]);

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
          <h1>This is the weather for {chosenCity.LocalizedName}</h1>
          {currentCondition && <FavoriteCard data={currentCondition} cityName={chosenCity.LocalizedName} />}
          {!likeState ? (
            <button className='like__btn' onClick={onLikeClicked}>
              Like
            </button>
          ) : (
            <button className='like__btn liked' onClick={onLikeClicked}>
              Dislike
            </button>
          )}
          <WeatherList forecast={forecast} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  forecast: state.root.forecast,
});

const mapDispatchToProps = {
  setForecast,
  setLikesOnLoad,
  manageFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
