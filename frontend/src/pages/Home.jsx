import React, { useState, useRef  } from 'react';

import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import '../Styles/Home.css'
const Home = ({Side_panel,setSide_panel}) => {
    const buttonRef = useRef(null);

// Side_panel&& 

  return (
    <>
            <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
            <SidePanel Side_panel={Side_panel} setSide_panel={setSide_panel}  />
            <div className='home' style={{ left: Side_panel ? '0px' : '290px',
            width: Side_panel ? '100%' : 'calc(100% - 290px)'
          }}>
            <h1>Dashboard</h1>
            </div>
            
            </>
  )
}

export default Home