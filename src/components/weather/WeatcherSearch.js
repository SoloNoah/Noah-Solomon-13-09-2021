import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setSearchResults } from '../../store/actions';

import Modal from '../modal';

import '../../App.css';

const WeatcherSearch = ({ onCitySubmit, setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [error, setError] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuggestedLocations([]);
    setShowSuggestions(false);
    onCitySubmit(chosen);
  };

  const onSuggest = (city) => {
    setQuery(city.LocalizedName);
    setChosen(city);
    setSuggestedLocations([]);
    setShowSuggestions(false);
  };
  const onChangeHandler = async (text) => {
    if (/^[a-zA-Z\s]+$/.test(text)) {
      setQuery(text);
      let res = await setSearchResults(text).catch((err) => {
        setError(err.message);
      });
      if (res) {
        setSuggestedLocations(res);
        setShowSuggestions(true);
        setChosen(res[0]);
      } else {
        setSuggestedLocations([]);
        setChosen(null);
        setShowSuggestions(false);
      }
    }
    if (text.length === 0) {
      setQuery('');
      setChosen(null);
      setSuggestedLocations([]);
    }
  };

  return (
    <form autoComplete='off' className='d-flex flex-column container align-items-center mb-5'>
      {error && <Modal msg={error} setError={setError} />}
      <div className='form__input'>
        <input className='col-md-12 input form-control' type='text' name='name' placeholder='Weather report at...' onChange={(e) => onChangeHandler(e.target.value)} value={query} />
        <div className='col-md-12 justify-content-md-center list-group '>
          {showSuggestions &&
            suggestedLocations.map((location, index) => (
              <div key={index} className='list-group-item' onClick={() => onSuggest(location)}>
                {location.LocalizedName} - {location.Country.LocalizedName}
              </div>
            ))}
        </div>
        {chosen !== null ? (
          <button className='btn btn-primary' onClick={handleSubmit}>
            Send
          </button>
        ) : (
          <button className='btn btn-primary disabled' onClick={handleSubmit}>
            Send
          </button>
        )}
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  setSearchResults,
};

export default connect(null, mapDispatchToProps)(WeatcherSearch);
