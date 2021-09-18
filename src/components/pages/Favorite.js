import React, { useState, useEffect } from 'react';

import FavoriteCard from '../favorite/FavoriteCard';
import Modal from '../modal';

import weatherService from '../../services/weatherService';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  useEffect(() => {
    const favLocations = localStorage.getItem('likes');
    if (favLocations) setFavorites(JSON.parse(favLocations));
    else setFavorites([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    let promiseArray = [];
    favorites.forEach((favoriteLocation) => {
      promiseArray.push(weatherService.loadCurrentData(favoriteLocation.Key));
    });
    Promise.all(promiseArray)
      .then(function (values) {
        setFavoritesData(values);
      })
      .catch((err) => {
        setError("Couldn't get details for your favorite locations");
      });
    setLoading(false);
  }, [favorites]);

  return (
    <div className='fav__list__holder m-5'>
      {errors && <Modal msg={errors} setError={setError} />}
      <div className='fav__title mb-5'>
        <h1>Your favorite locations</h1>
      </div>
      {favoritesData.length > 0 && (
        <div className='grid__holder'>
          {favorites.map((favCity, index) => (
            <FavoriteCard key={index} data={favoritesData[index]} chosenCity={favCity} />
          ))}
        </div>
      )}
      {favoritesData.length === 0 && <h1 className='text-center'>Select locations on home page and add them to favorites</h1>}
    </div>
  );
};

export default Favorite;
