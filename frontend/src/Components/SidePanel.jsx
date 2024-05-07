import React from 'react';
import '../Styles/SidePanel.css';
import { Link } from 'react-router-dom';

const SidePanel = () => {
  return (
    <div className='SidePanel'>
      <ul><b>
      <Link to="/"><li>Dashboard</li></Link>
      <Link to="/expenses"><li>Expenses</li></Link>
      <Link to="/patient/add"> <li>Add Patients</li></Link>
      <Link to="/patient/search"> <li>Search Patients</li></Link></b>
      </ul>
    </div>
  );
};

export default SidePanel;