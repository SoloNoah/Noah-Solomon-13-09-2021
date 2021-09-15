import React from 'react';

const FavoriteCard = ({ data, cityName }) => {
  const { Temperature, WeatherText } = data.data[0];
  const { Value, Unit } = Temperature.Metric;
  return (
    <div>
      <h1>{cityName}</h1>
      <h2>
        {Value} {Unit}
      </h2>
      <h2>{WeatherText}</h2>
      <hr></hr>
    </div>
  );
};

export default FavoriteCard;
