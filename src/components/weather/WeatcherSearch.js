import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setSearchResults } from '../../store/actions';

import Modal from '../modal';

import '../../App.css';

const WeatcherSearch = ({ onCitySubmit, setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [chosen, setChosen] = useState();
  const [error, setError] = useState(false);
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
      let res = await setSearchResults(text).catch((err) => {
        setError(err.message);
      });
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
    <form autoComplete='off' className='d-flex flex-column container align-items-center mb-5'>
      {error && <Modal msg={error} setError={setError} />}
      <div className='form__input'>
        <input
          className='col-md-12 input form-control'
          type='text'
          name='name'
          placeholder='Weather report at...'
          onChange={(e) => onChangeHandler(e.target.value)}
          value={query}
          onBlur={handleBlur}
        />
        <div className='col-md-12 justify-content-md-center list-group '>
          {suggestedLocations &&
            suggestedLocations.map((location, index) => (
              <div key={index} className='list-group-item' onClick={() => onSuggest(location)}>
                {location.LocalizedName} - {location.Country.LocalizedName}
              </div>
            ))}
        </div>
        <button className='btn btn-primary' onClick={handleSubmit}>
          {' '}
          Send{' '}
        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  setSearchResults,
};

export default connect(null, mapDispatchToProps)(WeatcherSearch);
