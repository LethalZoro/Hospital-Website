import React, { useState } from 'react';
import '../Styles/Header.css'
import logo from '../assets/logo.png'
import user from '../assets/Sample_User_Icon.png'
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Header = ({Side_panel,setSide_panel}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };


  return (
        <div className='Header' >
            <AiOutlineMenu className='side-tray-icon' onClick={() => {setSide_panel(!Side_panel)}}/>
            <Link to="/"><img src={logo} alt="logo error" className='logo' /></Link>
            <div className='user-container' onClick={toggleDropdown}>
                <img src={user} alt="user logo error" className='user-dp' />
                <b>User</b> 
                {isOpen && (
                <div className='dropdown'>
                    <button onClick={() => alert('Logging out')}>Logout</button>
                </div>
                )}
            </div>
        </div>
  )
}

export default Header