import React from 'react';
import Moment from 'react-moment';

const Preview = ({ day, flag }) => {
  const tomorrow = new Date();

  return (
    <div className='card bg-dark text-white text-center w-15'>
      <div className='card__text__holder'>
        <Moment format='dddd'>{tomorrow.setDate(new Date().getDate() + flag)}</Moment>
        <div>{day.Temperature.Maximum.Value} °F</div>
      </div>
    </div>
  );
};

export default Preview;
