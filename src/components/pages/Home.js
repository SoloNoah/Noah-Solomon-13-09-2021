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
        // weatherService.loadCurrentData(chosenCity.Key).then((data) => {
        //   setCurrentCondition(data);
        // });
      }
      return () => (mounted = false);
    }
  }, [chosenCity, setForecast]);

  const onLikeClicked = () => {
    manageFavorites(chosenCity);
    setLikeState(!likeState);
  };

  return (
    <div className='container'>
      <WeatcherSearch onCitySubmit={onCitySubmit} />
      {!forecast ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1 className='mb-5 text-center'>This is the weather for {chosenCity.LocalizedName}</h1>
          <div className='holder'>
            {/* {currentCondition && <FavoriteCard data={currentCondition} cityName={chosenCity.LocalizedName} />} */}
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
          <WeatherList forecast={forecast} />
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
