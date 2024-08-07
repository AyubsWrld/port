import React, { useEffect, useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = (props) => {
  const cardsContainer = useRef(null);

  const applyOverlayMask = (e) => {
    if (!cardsContainer.current) return;

    const x = e.pageX - cardsContainer.current.offsetLeft;
    const y = e.pageY - cardsContainer.current.offsetTop;

    cardsContainer.current.style.setProperty('--x', `${x}px`);
    cardsContainer.current.style.setProperty('--y', `${y}px`);
    cardsContainer.current.style.setProperty('--opacity', `1`);
  };

  function route(){
    console.log('Hello') ;
  }

  useEffect(() => {
    document.body.addEventListener("pointermove", applyOverlayMask);

    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
    };
  }, []);

  return (
    <div className='Card' ref={cardsContainer}>
      <div className='glassCard' onClick={route}>
        <div className='background-circle'>
          <div className='circle'></div>
          <div className='circleTwo'></div>
          <div className='circleThree'>
            <img src={props.icon} alt='Icon' className='icon' />
          </div>
        </div>
      </div>
      <div className="glow-overlay" ></div>
    </div>
  );
};

export default SpotlightCard;
