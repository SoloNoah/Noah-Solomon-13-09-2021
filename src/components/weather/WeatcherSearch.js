import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setSearchResults } from '../../store/actions';

import './weather.css';

const WeatcherSearch = ({ onCitySubmit, setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [chosen, setChosen] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onCitySubmit(chosen);
  };

  const onSuggest = (city) => {
    setQuery(city.LocalizedName);
    setChosen(city);
    setSuggestedLocations([]);
  };
  const onChangeHandler = async (text) => {
    if (text.length > 0) {
      let res = await setSearchResults(text);
      setSuggestedLocations(res);
    }
    setQuery(text);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestedLocations([]);
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='off' className='d-flex flex-column container align-items-center mb-5'>
      <input className='form-control ' type='text' name='name' placeholder='Weather report at...' onChange={(e) => onChangeHandler(e.target.value)} value={query} onBlur={handleBlur} />
      <div className='list-group pt-5'>
        {suggestedLocations &&
          suggestedLocations.map((location, index) => (
            <div key={index} className='list-group-item' onClick={() => onSuggest(location)}>
              {location.LocalizedName} - {location.Country.LocalizedName}
            </div>
          ))}
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  setSearchResults,
};

export default connect(null, mapDispatchToProps)(WeatcherSearch);
