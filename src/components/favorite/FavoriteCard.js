import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const FavoriteCard = ({ data, cityName, tempUnit }) => {
  const [temp, setTemp] = useState({});
  const { Temperature, WeatherText } = data.data[0];

  useEffect(() => {
    if (tempUnit === 'F') setTemp(Temperature.Imperial);
    else setTemp(Temperature.Metric);
  });

  return (
    <div className='card bg-dark text-white text-center p-2 w-15'>
      <h4 className='card-title'>{cityName}</h4>
      <p className='card-text'>
        {temp.Value} {temp.Unit}
      </p>
      <p className='card-text'>{WeatherText}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tempUnit: state.root.tempUnit,
});

export default connect(mapStateToProps, null)(FavoriteCard);
