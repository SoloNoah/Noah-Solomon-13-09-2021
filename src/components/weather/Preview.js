import React from 'react';
import Moment from 'react-moment';

const Preview = ({ day, flag }) => {
  const tomorrow = new Date();

  return (
    <div>
      <Moment format='dddd'>{tomorrow.setDate(new Date().getDate() + flag)}</Moment>
      <p>{day.Day.IconPhrase}</p>
      <div>{day.Temperature.Maximum.Value} °F</div>
      <hr></hr>
    </div>
  );
};

export default Preview;
