import React from 'react';

const FavoriteCard = ({ data, cityName }) => {
  console.log(data);
  const { Temperature, WeatherText } = data.data[0];
  const { Value, Unit } = Temperature.Metric;
  return (
    <div className='card bg-dark text-white text-center p-2 w-15'>
      <h4 className='card-title'>{cityName}</h4>
      <p className='card-text'>
        {Value} {Unit}
      </p>
      <p className='card-text'>{WeatherText}</p>
    </div>
  );
};

export default FavoriteCard;
