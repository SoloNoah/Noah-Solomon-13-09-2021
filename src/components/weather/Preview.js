import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import '../../App.css';

const Preview = ({ day, flag, tempUnit }) => {
  const [temp, setTemp] = useState({});
  const tomorrow = new Date();
  useEffect(() => {
    setTemp(day);
  });

  return (
    <div className='card bg-dark text-white text-center w-15'>
      <div className='card__text__holder'>
        <Moment format='dddd'>{tomorrow.setDate(new Date().getDate() + flag)}</Moment>
        {tempUnit === 'F' ? <div>{temp.K} °F</div> : <div>{temp.C} °C</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tempUnit: state.root.tempUnit,
});
// export default Preview;
export default connect(mapStateToProps, null)(Preview);
