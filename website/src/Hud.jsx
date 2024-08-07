import React ,  { useState } from 'react';
import icon from './assets/Icons/Icon.png';
import github from './assets/Icons/github.png';
import linkedin from './assets/Icons/LinkedIn.png';
import instagram from './assets/Icons/instagram.png';
import Card from './components/Card.jsx' ; 
import SpotlightCard from './components/SpotlightCard.jsx' ; 
import './Hud.css';

export default function Hud() {

  const [showSocials , setShowSocials] = useState(false) ; 

  const toggleSocials = () => {
    setShowSocials(showSocials => !showSocials) ; 
  }
  return (
    <>
      {!showSocials && <div className='Hud'>
        <img src={icon} alt='Icon' className='Logo' />
        <div className='ColumnOne'>
          <button className='BuildWithMe' onClick={toggleSocials}>Build with me</button>
        </div>
      </div> }
      { showSocials && <div className='SocialsLink' >
        <div className='HudContainer'>

          <div className='Card-Container'>
  
            <SpotlightCard icon={github}/> 
            <SpotlightCard icon={linkedin}/> 
            <SpotlightCard icon={instagram}/> 
            
          </div>
          <div>
            <button onClick={toggleSocials} className='return'>
              return to projects 
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}

