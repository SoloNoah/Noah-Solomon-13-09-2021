import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light"'>
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <Link to='/'>
            <span>Whats the weather?</span>
          </Link>
        </div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Button className='nav-link active'>
              <Link to='/favorite'>Favorite</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
