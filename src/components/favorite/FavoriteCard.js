import React from 'react';

const FavoriteCard = ({ data }) => {
  console.log(data);
  const { Temperature, WeatherText } = data.data[0];
  const { Value, Unit } = Temperature.Metric;
  console.log(Temperature);
  return (
    <div>
      <h1>
        {Value} {Unit}
      </h1>
      <h1>{WeatherText}</h1>
    </div>
  );
};

export default FavoriteCard;
