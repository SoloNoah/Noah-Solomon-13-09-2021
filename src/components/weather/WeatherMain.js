import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setForecast } from '../../store/actions';

const WeatherMain = ({ forecast, setForecast }) => {
  useEffect(() => {
    setForecast('215854'); //setting here by default for now
  }, []);

  return <>{!forecast ? <div>Loading...</div> : <div>Got the data</div>}</>;
};

const mapStateToProps = (state) => ({
  forecast: state.root.forecast,
});

const mapDispatchToProps = {
  setForecast,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
