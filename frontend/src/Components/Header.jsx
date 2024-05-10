import React, { useState, useRef  } from 'react';
import '../Styles/Header.css'
import logo from '../assets/logo.png'
import user from '../assets/Sample_User_Icon.png'
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Header = ({Side_panel,setSide_panel,buttonRef,}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };


  return (
        <div className='Header' >
            {/* <AiOutlineMenu className='side-tray-icon' onClick={() => {setSide_panel(!Side_panel)}}/> */}
            <div className="hamburger" ref={buttonRef}>
                <input className="checkbox" type="checkbox" checked={!Side_panel} onClick={() => {setSide_panel(!Side_panel)}}/>
                <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
                    <path
                    className="lineTop line"
                    strokeLinecap="round"
                    strokeWidth="4"
                    stroke="black"
                    d="M6 11L44 11"
                    ></path>
                    <path
                    strokeLinecap="round"
                    strokeWidth="4"
                    stroke="black"
                    d="M6 24H43"
                    className="lineMid line"
                    ></path>
                    <path
                    strokeLinecap="round"
                    strokeWidth="4"
                    stroke="black"
                    d="M6 37H43"
                    className="lineBottom line"
                    ></path>
                </svg>
            </div>
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