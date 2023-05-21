import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navigationBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/article">Article</Link>
        </li>
        <li>
          <Link to="/usefulLinks">Links</Link>
        </li>
        <li>
          <Link to="/rolesManagement">Roles</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
