import React from 'react';
import PropTypes from 'prop-types';
import { FaCogs } from 'react-icons/fa';
import { MdMic } from 'react-icons/md';

const NavBar = ({ filterFruit, onFilterChange }) => (
  <div className="nav">
    <h1 style={{ margin: '5px', color: 'green' }}>Fruits</h1>
    <input
      type="text"
      placeholder="Search fruit"
      className="searchBar"
      value={filterFruit}
      onChange={(e) => onFilterChange(e.target.value)}
    />
    <div style={{ display: 'flex' }}>
      <MdMic className="icon" />
      <FaCogs className="icon" />
    </div>
  </div>
);

NavBar.propTypes = {
  filterFruit: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default NavBar;
