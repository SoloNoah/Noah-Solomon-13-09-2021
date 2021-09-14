import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import FavoriteCard from '../favorite/FavoriteCard';

import { setCurrentDayData } from '../../store/actions';

import weatherService from '../../services/weatherService';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const favLocations = localStorage.getItem('likes');
    setFavorites(JSON.parse(favLocations));
  }, []);

  useEffect(() => {
    let promiseArray = [];
    let resultsArr = [];
    favorites.forEach((favoriteLocation) => {
      promiseArray.push(weatherService.loadCurrentData(favoriteLocation));
    });
    Promise.all(promiseArray).then(function (values) {
      console.log(Array.isArray(values));
      setFavoritesData(values);
    });
  }, [favorites]);
  return (
    <>
      {favoritesData.length > 0 ? (
        <ul>
          {favorites.map((single, index) => (
            <FavoriteCard key={index} data={favoritesData[index]} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const mapDispatchToProps = {
  setCurrentDayData,
};

export default connect(null, mapDispatchToProps)(Favorite);
