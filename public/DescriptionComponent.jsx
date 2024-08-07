import React, { useEffect, useRef } from 'react';
import './DescriptionComponent.css';
import logo from '../src/assets/Icons/Icon.png'; 
import react from '../src/assets/Icons/react.png'; 
import d3j from '../src/assets/Icons/D3J.png'; 
import tailwind from '../src/assets/Icons/tailwind.png'; 

export default function Description({ value }) {
  const descriptionContainer = useRef(null);

  const applyOverlayMask = (e) => {
    if (!descriptionContainer.current) return;

    const x = e.pageX - descriptionContainer.current.offsetLeft;
    const y = e.pageY - descriptionContainer.current.offsetTop;

    descriptionContainer.current.style.setProperty('--x', `${x}px`);
    descriptionContainer.current.style.setProperty('--y', `${y}px`);
    descriptionContainer.current.style.setProperty('--opacity', `1`);
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", applyOverlayMask);

    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
    };
  }, []);

  return (
    <>
      {value === 1 && (
        <div className='Overarching' ref={descriptionContainer}>
          <h1 className='Header'>Easily Ease</h1>
          <p className='Subtext'>
            Dynamic Bezier Curve Editor designed for CSS animations. This <br />
            interactive tool lets users easily manipulate keyframe curves <br />
            through a visual interface, enabling them to create smooth <br />
            easing effects for web animations. It streamlines the animation <br />
            process by providing real-time feedback, helping developers <br />
            achieve more fluid and engaging animations with minimal effort.<br />
          </p>
          <div className='Techstack'>
            <div className='Rectangle'> <img src={react} alt='React Icon' className='Icon' /></div>
            <div className='Rectangle'> <img src={d3j} alt='D3.js Icon' className='Icon' /></div>
            <div className='Rectangle'> <img src={tailwind} alt='Tailwind CSS Icon' className='Icon' /></div>
          </div>
          <button className='link'>Link to project</button>
          <div className="glow-overlay"></div>
        </div>
      )}

      {value === 0 && (
        <div className='Overarching' ref={descriptionContainer}>
          <h1 className='Header'>I build the bridges between ideas and reality</h1>
          <p className='Subtext'>
            Hi, I'm Ayub, a dual major in Computer Science and Mathematics <br />
            with a passion for embedded systems, game development, web <br />
            development, and design. I blend code with electronics for smart <br />
            tech, push storytelling and graphics in games using C++, and <br />
            create innovative web solutions with a touch of design. <br />
          </p>
          <div className='Techstack'>
            <div className='Rectangle'> <img src={logo} alt='Logo Icon' className='Icon' /></div>
            <div className='Rectangle'> <img src={logo} alt='Logo Icon' className='Icon' /></div>
            <div className='Rectangle'> <img src={logo} alt='Logo Icon' className='Icon' /></div>
          </div>
          {/* <button className='link'>Link to project</button> */}
          <div className="glow-overlay"></div>
        </div>
      )}
    </>
  );
}
