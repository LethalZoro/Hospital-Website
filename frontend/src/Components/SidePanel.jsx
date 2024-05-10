import React, { useEffect, useRef } from 'react';
import '../Styles/SidePanel.css';
import { Link } from 'react-router-dom';

const SidePanel = ({Side_panel,setSide_panel, buttonRef}) => {
  const sidePanelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidePanelRef.current && !sidePanelRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target) ) {
        setSide_panel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSide_panel, setSide_panel, buttonRef, sidePanelRef]);

  
  return (<>
    {!Side_panel && <div className='overlay' onClick={() => setSide_panel(!Side_panel)}></div>}
    <div className='SidePanel' ref={sidePanelRef}  style={{ transform: Side_panel ? 'translateX(-290px)' : 'translateX(0px)' }}>
      <ul><b>
      <Link to="/"><li>Dashboard</li></Link>
      <Link to="/expenses"><li>Expenses</li></Link>
      <Link to="/patient/add"> <li>Add Patients</li></Link>
      <Link to="/patient/search"> <li>Search Patients</li></Link></b>
      </ul>
    </div>
    </>
  );
};

export default SidePanel;