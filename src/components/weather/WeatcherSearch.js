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
    <form onSubmit={handleSubmit} autoComplete='off' className='d-flex'>
      <input className='form-control me-2' type='text' name='name' placeholder='Weather report at...' onChange={(e) => onChangeHandler(e.target.value)} value={query} onBlur={handleBlur} />
      {suggestedLocations &&
        suggestedLocations.map((location, index) => (
          <div key={index} className='suggestion' onClick={() => onSuggest(location)}>
            {location.LocalizedName} - {location.Country.LocalizedName}
          </div>
        ))}
    </form>
  );
};

const mapDispatchToProps = {
  setSearchResults,
};

export default connect(null, mapDispatchToProps)(WeatcherSearch);
