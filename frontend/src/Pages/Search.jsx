import React from 'react'
import { useState } from 'react'
import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import '../Styles/Search.css'

const Search = ({Side_panel,setSide_panel}) => {
  return (
    <>
            <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
            {Side_panel&&(<SidePanel />)}
            <div className='search' style={{ left: Side_panel ? '260px' : '0' }}>
            <h1>Search Patients</h1>
            </div>
            
            </>
  )
}

export default Search