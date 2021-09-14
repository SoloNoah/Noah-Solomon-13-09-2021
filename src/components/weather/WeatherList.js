import React from 'react';

import Preview from './Preview';
const WeatherList = ({ forecast }) => {
  const dailyForecast = forecast.DailyForecasts;

  return (
    <div className='weekly-wrapper'>
      <h1></h1>
      {dailyForecast.map((day, index) => (
        <Preview key={index} day={day} flag={index + 1} />
      ))}
    </div>
  );
};

export default WeatherList;
