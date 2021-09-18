import React from 'react';

import '../../App.css';

import Preview from './Preview';
const WeatherList = ({ forecast }) => {
  return (
    <div className='pt-5 weekly__forecast'>
      <div>
        <h1 className='title'>5 Day forecast</h1>
      </div>
      <div className='holder container'>
        {forecast.map((day, index) => (
          <Preview key={index} day={day} flag={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default WeatherList;
