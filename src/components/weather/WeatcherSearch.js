import React, { useState } from 'react';

const WeatcherSearch = ({ onCitySearch }) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onCitySearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder='Weather report at...' onChange={(e) => setQuery(e.target.value)} />
    </form>
  );
};

export default WeatcherSearch;
