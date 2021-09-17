import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const FavoriteCard = ({ data, chosenCity, tempUnit }) => {
  const [temp, setTemp] = useState({});
  const { Key, LocalizedName } = chosenCity;
  const { Temperature, WeatherText } = data.data[0];

  useEffect(() => {
    if (tempUnit === 'F') setTemp(Temperature.Imperial);
    else setTemp(Temperature.Metric);
  });

  return (
    <Link to={`/${Key}`}>
      <div className='card bg-dark text-white text-center p-2 w-15'>
        <h4 className='card-title'>{LocalizedName}</h4>
        <p className='card-text'>
          {temp.Value} {temp.Unit}
        </p>
        <p className='card-text'>{WeatherText}</p>
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  tempUnit: state.root.tempUnit,
});

export default connect(mapStateToProps, null)(FavoriteCard);
