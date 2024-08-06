import React from 'react';
import './DescriptionComponent.css';
import logo from '../src/assets/Icons/Icon.png' ; 
import react from '../src/assets/Icons/react.png' ; 
import d3j from '../src/assets/Icons/D3J.png' ; 
import tailwind from '../src/assets/Icons/tailwind.png' ; 

export default function Description({value}) {
  return (
    <>
     { value === 1 && <div className='Overarching'>
        <h1 className='Header'>
          Easily Ease
       </h1>
       <p className='Subtext'>
          dynamic Bezier Curve Editor designed for CSS animations. This <br/>
          interactive tool lets users easily manipulate keyframe curves through <br/>
          a visual interface, enabling them to create smooth and custom <br/>
          easing effects for web animations. It streamlines the animation <br/>
          process by providing real-time feedback, helping developers <br/>
          achieve more fluid and engaging animations with minimal effort.<br/>
        </p>
        <div className='Techstack'>
          <div className='Rectangle'> <img src={react} alt='idk' className='Icon'/></div>
          <div className='Rectangle'> <img src={d3j} alt='idk' className='Icon'/></div>
          <div className='Rectangle'> <img src={tailwind} alt='idk' className='Icon'/></div>
        </div>
        <button className='link'>
          Link to project 
        </button>
      </div>}

     { value === 0 && <div className='Overarching'>
        <h1 className='Header'>
          I build the bridges between ideas and reality 
       </h1>
       <p className='Subtext'>
          Hi, I'm Ayub, a dual major in Computer cock and Mathematics with <br/>
          a passion for embedded systems, game development, web <br/>
         development, and design. I blend code with electronics for smart tech, <br/>
          push storytelling and graphics in games using C++, and create <br/>
          innovative web solutions with a touch of design. 
        </p>
        <div className='Techstack'>
          <div className='Rectangle'> <img src={logo} alt='idk' className='Icon'/></div>
          <div className='Rectangle'> <img src={logo} alt='idk' className='Icon'/></div>
          <div className='Rectangle'> <img src={logo} alt='idk' className='Icon'/></div>
        </div>
        <button className='link'>
          Link to project 
        </button>
      </div>}
    </>
  );
}
