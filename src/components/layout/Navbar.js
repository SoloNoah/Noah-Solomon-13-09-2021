import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './navbar.css';

import { changeTempUnit } from '../../store/actions';

const Navbar = ({ changeTempUnit }) => {
  const onSliderClicked = (e) => {
    let value = 'F';
    if (e.target.checked) value = 'C';
    changeTempUnit(value);
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light mb-4' style={{ backgroundColor: '#e3f2fd' }}>
      <div className='container-fluid'>
        <div className='navbar-brand'>What's the weather?</div>

        <div className='d-flex flex-row '>
          <label className='switch'>
            <input type='checkbox' onChange={(e) => onSliderClicked(e)} />
            <span className='slider round'></span>
          </label>
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

const mapDispatchToProps = { changeTempUnit };

export default connect(null, mapDispatchToProps)(Navbar);
