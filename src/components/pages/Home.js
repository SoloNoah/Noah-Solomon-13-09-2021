import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';

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
  const [isPending, setPending] = useState(false);
  const [forecastError, setForecastError] = useState(null);
  const [currentConditionError, setCurrentError] = useState(null);

  const onCitySubmit = async (city) => {
    const { Key, LocalizedName } = city;
    const newStateCity = { Key, LocalizedName };
    setChosenCity(newStateCity);
  };

  useEffect(() => {
    if (chosenCity !== null) {
      setPending(true);
      const localStorageFav = localStorage.getItem('likes');
      setLikesOnLoad();
      setLikeState(() => {
        return localStorageFav?.includes(chosenCity.Key);
      });

      weatherService
        .loadCurrentData(chosenCity.Key)
        .then((data) => {
          setCurrentCondition(data);
          setCurrentError(null);
        })
        .catch((error) => {
          setPending(false);
          setCurrentError("Could't access AccuWeather and load current condition for ", chosenCity);
        });

      setForecast(chosenCity.Key)
        .then(() => setForecastError(null))
        .catch((error) => {
          setPending(false);
          setForecastError(error.message);
        });

      setPending(false);
    }
  }, [chosenCity, setForecast]);

  const onLikeClicked = () => {
    manageFavorites(chosenCity);
    setLikeState(!likeState);
  };

  return (
    <div className='container'>
      <WeatcherSearch onCitySubmit={onCitySubmit} />
      {isPending && <div>Loading ...</div>}
      <div>
        <h1 className='mb-5 text-center'>This is the weather for {chosenCity.LocalizedName}</h1>
        <div className='holder'>
          {currentConditionError && <div>{currentConditionError}</div>}
          {currentCondition && <FavoriteCard data={currentCondition} cityName={chosenCity.LocalizedName} />}
          <div className='d-flex align-items-center'>
            {!likeState ? (
              <Button onClick={onLikeClicked} variant='success'>
                Add to Favorites
              </Button>
            ) : (
              <Button onClick={onLikeClicked} variant='danger'>
                Remove Favorite
              </Button>
            )}
          </div>
        </div>
        {forecastError && <div>{forecastError}</div>}
        {forecast && <WeatherList forecast={forecast} />}
      </div>
    </div>
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
