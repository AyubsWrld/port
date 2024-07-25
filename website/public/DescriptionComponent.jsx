import React from 'react';
import './DescriptionComponent.css';

export default function Description() {
  return (
    <>
      <div className='Overarching'>
        <h1 className='Header'>
          I build the bridges between ideas and reality 
       </h1>
       <p className='Subtext'>
          Hi, I'm Ayub, a dual major in Computer Science and Mathematics with <br/>
          a passion for embedded systems, game development, web <br/>
         development, and design. I blend code with electronics for smart tech, <br/>
          push storytelling and graphics in games using C++, and create <br/>
          innovative web solutions with a touch of design. 
        </p>
        <div className='Techstack'>
          <div className='Rectangle'></div>
          <div className='Rectangle'></div>
          <div className='Rectangle'></div>
        </div>
        <button className='link'>
          Link to project 
        </button>
      </div>
    </>
  );
}
