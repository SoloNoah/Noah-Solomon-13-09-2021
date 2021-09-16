import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light mb-4' style={{ backgroundColor: '#e3f2fd' }}>
      <div className='container-fluid'>
        <div className='navbar-brand'>What's the weather?</div>

        <div className='d-flex flex-row'>
          <Link to='/' className='p-2 link'>
            Home
          </Link>
          <Link to='/favorite' className='btn btn-primary p-2 link link__btn  '>
            Favorite
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
