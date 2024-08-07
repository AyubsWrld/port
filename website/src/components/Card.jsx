import React from 'react';
import './Card.css';

export default function Card(props) {
  return (
    <div className='Card'>
      <div className='glassCard'>
        <div className='background-circle'>
          <div className='circle'></div>
          <div className='circleTwo'></div>
          <div className='circleThree'>
            <img src={props.icon} alt='Icon' className='icon' />
          </div>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  backgroundColor : 'background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(29, 233, 182, 0.3), transparent 50%)'
}
