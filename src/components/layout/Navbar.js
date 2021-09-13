import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='main-nav'>
      <ul className='main-menu'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/favorite'>Favorite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
