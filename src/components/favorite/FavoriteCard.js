import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ICON_URL = 'https://www.accuweather.com/images/weathericons';

const FavoriteCard = ({ data, chosenCity, tempUnit }) => {
  const [temp, setTemp] = useState({});
  const { Key, LocalizedName } = chosenCity;
  const { Temperature, WeatherText, WeatherIcon } = data.data[0];

  useEffect(() => {
    if (tempUnit === 'F') setTemp(Temperature.Imperial);
    else setTemp(Temperature.Metric);
  });
  
  return (
    <Link to={`/${Key}`} style={{ textDecoration: 'none' }}>
      <div className='card  card__hover text-center shadow'>
        <img className='card-img-top' src={`${ICON_URL}/${WeatherIcon}.svg`} alt={`${WeatherIcon} icon`}></img>
        <div className='card-body'>
          <h4 className='card-title'>{LocalizedName}</h4>
          <p className='card-text'>
            {temp.Value} °{temp.Unit}
          </p>
          <p className='card-text'>{WeatherText}</p>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  tempUnit: state.root.tempUnit,
});

export default connect(mapStateToProps, null)(FavoriteCard);
