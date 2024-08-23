import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="https://www.vrbtech.co/" className="navbar__logo"></Link>

        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/movies" className="navbar__link">
              Home
            </Link>
          </li>

          <li className="navbar__item">
            <Link to="/favorites" className="navbar__link">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
