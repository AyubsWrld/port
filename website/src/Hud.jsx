import React from 'react';
import icon from './assets/Icons/Icon.png';
import './Hud.css';

export default function Hud() {
  return (
    <>
      <div className='Hud'>
        <img src={icon} alt='Icon' className='Logo' />
        <div className='ColumnOne'>
          <button className='BuildWithMe'>Build with me</button>
        </div>
      </div>
    </>
  );
}

