import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';

import WeatcherSearch from '../weather/WeatcherSearch';
import WeatherList from '../weather/WeatherList';
import FavoriteCard from '../favorite/FavoriteCard';
import Modal from '../modal';

import weatherService from '../../services/weatherService';

import { manageFavorites, setForecast, setLikesOnLoad } from '../../store/actions';

const WeatherMain = ({ forecast, setForecast, setLikesOnLoad, manageFavorites, match }) => {
  const defaultCity = { Key: '215854', LocalizedName: 'Tel Aviv' };
  const [chosenCity, setChosenCity] = useState(defaultCity);
  const [likeState, setLikeState] = useState();
  const [currentCondition, setCurrentCondition] = useState();
  const [isPending, setPending] = useState(false);
  const [forecastError, setForecastError] = useState(false);
  const [currentConditionError, setCurrentError] = useState(false);
  const [badQuery, setBadQuery] = useState(false);

  const onCitySubmit = async (city) => {
    if (city !== undefined) {
      const { Key, LocalizedName } = city;
      const newStateCity = { Key, LocalizedName };
      setChosenCity(newStateCity);
    } else {
      setBadQuery(true);
      setChosenCity(null);
    }
  };

  useEffect(() => {
    if (match.params.id) {
      let favLoctions = JSON.parse(localStorage.getItem('likes'));
      let filteredData = favLoctions.filter((location) => location.Key === match.params.id);
      setChosenCity(filteredData[0]);
    }
  }, [match]);

  useEffect(() => {
    if (chosenCity !== null) {
      setBadQuery(false);
      let mounted = true;
      setPending(true);
      const localStorageFav = localStorage.getItem('likes');
      setLikesOnLoad();
      setLikeState(() => {
        return localStorageFav?.includes(chosenCity.Key);
      });

      if (mounted) {
        // weatherService
        //   .loadCurrentData(chosenCity.Key)
        //   .then((data) => {
        //     setCurrentCondition(data);
        //     setCurrentError(null);
        //   })
        //   .catch((error) => {
        //     setPending(false);
        //     setCurrentError("Could't access AccuWeather and load current condition for ", chosenCity);
        //   });
        // setForecast(chosenCity.Key)
        //   .then(() => setForecastError(null))
        //   .catch((error) => {
        //     setPending(false);
        //     setForecastError(error.message);
        //   });
      }
      setPending(false);
      return () => (mounted = false);
    }
  }, [chosenCity, setForecast, setLikesOnLoad]);

  const onLikeClicked = () => {
    manageFavorites(chosenCity);
    setLikeState(!likeState);
  };

  return (
    <div className='container'>
      <WeatcherSearch onCitySubmit={onCitySubmit} />
      {isPending && <div>Loading ...</div>}
      {badQuery && <div className='main '>Enter a valid city name.</div>}
      {!badQuery && (
        <div className='main'>
          <h1 className='title text-center'>Forecast for {chosenCity.LocalizedName}</h1>
          <div className='holder'>
            {currentConditionError && <Modal msg={currentConditionError} setError={setCurrentError} city={chosenCity.LocalizedName} />}
            {currentCondition && <FavoriteCard data={currentCondition} chosenCity={chosenCity} />}
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
          {forecastError && <Modal msg={forecastError} setError={setForecastError} />}
          <hr />
          {forecast && <WeatherList forecast={forecast} />}
        </div>
      )}
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
