import React from 'react';
import { FaCogs } from 'react-icons/fa';
import { MdMic } from 'react-icons/md';

const NavBar = () => (
  <div className="nav">
    <h1 style={{ margin: '5px', color: 'green' }}>Fruits</h1>
    <input type="text" placeholder="Search fruit" className="searchBar" />
    <div style={{ display: 'flex' }}>
      <MdMic className="icon" />
      <FaCogs className="icon" />
    </div>
  </div>
);

export default NavBar;
