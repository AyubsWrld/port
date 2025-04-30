import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cartridge from '../public/Cartridge.jsx';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useDispatch, useSelector } from 'react-redux'; 
import Animation from './components/Animation.jsx';
import DescriptionComponent from '../public/DescriptionComponent.jsx';
import Hud from './Hud.jsx';
import Pixel from './Pixel.tsx';

import './App.css';

function App() {

  const [showAnimation, setShowAnimation] = useState(true);
  const [polars, setPolars] = useState([-0.2, -0.2, 0]);
  const [rotation, setRotation] = useState([-0.5, 0.3, 0.3]);
  const [rotationCartridge, setRotationCartridge] = useState([-0.5, 0.3, 0.3]);
  const [showDescription, setShowDescription] = useState(false);
  const [color, setColor] = useState('black');
  const [ startScreenLoading, setStartScreenLoading]  = useState(true);  // Use state for the gameboy's video 'loading'.
  const [ selectedProject, setSelectedProject ] = useState(0) ;

  const polarInternalCount       =          useRef(0);
  const internalCountWheel       =          useRef(0);
  const cartidgeInternalCount    =          useRef(0);
  const rotationalInternalCount  =          useRef(0);
  const projectRef               =          useRef(0); // TODO: This is gonna cause some issues later I know it 
  const levelState               =          useSelector( state => state.level ); 

  const handleClick = () => {

  }


 //---------------------------------------------------------------------------------------- README --------------------------------------------------------------------------------------------------------- 
 
  // This part of the code is really really shtty, had to use a useRef + useState because the stale value wouldn't update. Has something to do with the closure.
  // If the array of projects breaks and is out of sync just know its occuring right here and fix this later to use just one. I used them both because useRef would update but wouldn't trigger rerenders. 
  // See if when this component mounts again it is in sync with the other components.
  // Lets just do mouse up and down 4 now
 const handleSelectProject = () => {
    switch (projectRef.current % 3) {
      case 0:
        console.log('Setting Project one')
        break;
      case 1:
        console.log('Setting Project two')
        break;
      case 2:
        console.log('Setting Project three')
        break;
      default:
        break;
    }
  } 

  const handleToggleProject = (e) => {
    switch (e.code) {
      case "Enter":
        handleSelectProject(); 
        break;
      case "ArrowUp":
        setSelectedProject( prev => prev - 1 );
        projectRef.current = Math.abs(projectRef.current -= 1) % 3 ;  // TODO: This is gonna cause issues later if the selectedProject & and projectRef are not aligned 
        console.log(projectRef.current)
        break;
      case "ArrowDown":
        setSelectedProject( prev => Math.abs(prev + 1));
        projectRef.current = Math.abs(projectRef.current += 1) % 3 ;  // TODO: This is gonna cause issues later if the selectedProject & and projectRef are not aligned 
        break;
      default:
        break;
    }
  }

 //---------------------------------------------------------------------------------------- README --------------------------------------------------------------------------------------------------------- 

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    document.addEventListener( 'keydown', handleToggleProject ) ; 
    return () => {
      window.removeEventListener('keydown', handleToggleProject)
    }
  }, []);

  setTimeout( () => {
    setStartScreenLoading( false ) ;
  }, 4500 );

  const possiblePolars = {
    0: [-0.2, -0.2, 0],
    1: [-0.2, -0.3, 0],
    2: [-4, -0.2, 0],
  };

  const possibleRotations = {
    0: [-0.5, 0.3, 0.3],
    1: [-0.8, 0.8, 0.3],
  };

  const possibleRotationsCartridge = {
    0: [-0.5, 0.3, 0.3],
    1: [-0.8, 0.8, 0.3],
  };

  // TODO: Add error bounding later 
  // We can change this to handle scroll so we can increment/decrement or tbh we can just % and wrap. 
 

  return (
    <div className="App" style={{ background: color }}>
      <Animation width='600px' onComplete={handleAnimationComplete} />
      {!showAnimation && <Hud />}

      {/* --------------------------------------------------- Start Screen ---------------------------------------------------------- */}

      {!showAnimation && levelState.currentLevel == 'start' && ( // Just do null check here pretty easy fix. wtf is the difference  == & ===
        <div className='Canvas'>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[-2, 2, -2]} intensity={8} castShadow />
            <directionalLight position={[1, 0, -1]} intensity={4} castShadow />
            <directionalLight position={[1, 1, -1]} intensity={1} castShadow />
            <pointLight position={[10, 10, 10]} intensity={1} decay={2} distance={50} />
            <spotLight position={[0, 10, 0]} angle={0.2} penumbra={1} intensity={1} castShadow />
            <OrbitControls enablePan={false} enableRotate={false} enableDamping={false} enableZoom={false} />
            <Cartridge polarCoordinates={polars} rotationalCoordinates={rotation} selectedProject={ selectedProject } isStartScreenLoading={startScreenLoading} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={400} />
            </EffectComposer>
          </Canvas>
          <div className='Button-Container'>
            <button onClick={handleClick} className='SwapCart'> Project Details </button>
          </div>
          {!showAnimation && showDescription && <DescriptionComponent value={dynamicComponent}/>}
        </div>
      )}

      {/* --------------------------------------------------- Start Screen ---------------------------------------------------------- */}

      {/* ---------------------------------------------------   Project (1) ---------------------------------------------------------- */}
      { !showAnimation && levelState.currentLevel == 'projectOne ' && (
       <Pixel /> 
      )}
      {/* ---------------------------------------------------   Project (1) ---------------------------------------------------------- */}

      


    </div>
  );
}

export default App;
