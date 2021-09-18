import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import '../../App.css';

const ICON_URL = 'https://www.accuweather.com/images/weathericons';

const Preview = ({ day, flag, tempUnit }) => {
  const [temp, setTemp] = useState({});
  const tomorrow = new Date();
  useEffect(() => {
    setTemp(day);
  });

  return (
    <div className='card card__holder card__hover shadow'>
      <div className='card-body'>
        <Moment format='dddd'>{tomorrow.setDate(new Date().getDate() + flag)}</Moment>
        <div>{tempUnit === 'F' ? <div>{temp.K} °F</div> : <div>{temp.C} °C</div>}</div>
      </div>
      <img src={`${ICON_URL}/${day.icon}.svg`} alt={`${day.icon} icon`}></img>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tempUnit: state.root.tempUnit,
});
export default connect(mapStateToProps, null)(Preview);
