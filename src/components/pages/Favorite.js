import React, { useState, useEffect } from 'react';

import FavoriteCard from '../favorite/FavoriteCard';

import weatherService from '../../services/weatherService';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [loading, setLoading] = useState(false);

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
        console.log(err.message);
      });
    setLoading(false);
  }, [favorites]);

  const favoriteRendering = () => {
    let render;
    if (favoritesData.length === 0 && loading) {
      render = <p className='text-center'>Loading...</p>;
    } else if (favoritesData.length > 0) {
      render = (
        <ul>
          {favorites.map((favCity, index) => (
            <FavoriteCard key={index} data={favoritesData[index]} chosenCity={favCity} />
          ))}
        </ul>
      );
    } else {
      render = <h1 className='text-center'>Select locations on home page and add them to favorites</h1>;
    }
    return render;
  };
  return <div>{favoriteRendering()}</div>;
};

export default Favorite;
