import React from 'react';

import Preview from './Preview';
const WeatherList = ({ forecast }) => {
  return (
    <div className='container  pt-5 holder'>
      {forecast.map((day, index) => (
        <Preview key={index} day={day} flag={index + 1} />
      ))}
    </div>
  );
};

export default WeatherList;
