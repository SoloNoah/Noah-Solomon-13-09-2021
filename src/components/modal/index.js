import React from 'react';

import './modal.css';
const Modal = ({ msg, setError, city = '' }) => {
  const clickHandle = () => {
    setError(false);
  };
  return (
    <div className='modal__bg'>
      <div className='modal__card'>
        <div className='modal__title'>
          <h1>Error</h1>
        </div>
        <div className='modal__body'>
          <p>
            {msg}
            {city}.
          </p>
        </div>
        <button className='btn btn-danger' onClick={clickHandle}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
