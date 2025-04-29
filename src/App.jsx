import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cartridge from '../public/Cartridge.jsx';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Animation from './components/Animation.jsx';
import DescriptionComponent from '../public/DescriptionComponent.jsx';
import Hud from './Hud.jsx';

import './App.css';

function App() {

  //----------------------------------------------------- TODO: ------------------------------------------------------- 
  
  //const Epsilon = 0.0250 ; // Play around with this for more granularity.
  //const ThresholdX = 0.5725 ;
  //const ThresholdY = 0.4300 ; 


  // Can noramlize this to just be in between 
  //document.addEventListener( 'click', ( event ) => {

     // const NormalizedY =  event.clientY / window.innerHeight  ; 
     // const NormalizedX =  event.clientX / window.innerWidth   ; 

    // if( 
    //   ( NormalizedX <= ThresholdX + Epsilon)
    //   && (NormalizedX > ThresholdX - Epsilon)
    //   && (NormalizedY <= ThresholdY + Epsilon)
    //   && (NormalizedY > ThresholdY - Epsilon)
    // )

  //   if( 
  //     ( NormalizedX <= 0.480 )
  //     && (NormalizedX > 0.440)
  //     && (NormalizedY <= 0.650 )
  //     && (NormalizedY > 0.550 )
  //   )
  //   {
  //     console.log( ' Use did presss one of the buttons ' ) ; 
  //   }
  //
  //   console.log(`Normalized: [${NormalizedX} , ${NormalizedY}] `);
  //
  // });
  
  //----------------------------------------------------- TODO: -------------------------------------------------------

  const [showAnimation, setShowAnimation] = useState(true);
  const [polars, setPolars] = useState([-0.2, -0.2, 0]);
  const [rotation, setRotation] = useState([-0.5, 0.3, 0.3]);
  const [rotationCartridge, setRotationCartridge] = useState([-0.5, 0.3, 0.3]);
  const [showDescription, setShowDescription] = useState(false);
  const [color, setColor] = useState('black');
  const [selectedProject, SetSelectedProject] = useState(0);
  const [ startScreenLoading, setStartScreenLoading]  = useState(true);  // Use state for the gameboy's video 'loading'.

  const polarInternalCount       =          useRef(0);
  const internalCountWheel       =          useRef(0);
  const cartidgeInternalCount    =          useRef(0);
  const rotationalInternalCount  =          useRef(0);

  const ProjectArrayLength       =          2        ;  // This is the number of projects I have later pretty shtty but we move. 

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    window.addEventListener('wheel', wheelDown);
    return () => window.removeEventListener('wheel', wheelDown);
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

  const possiblePolarsCartridge = {
    0: [-0.9, 3.5, -1],
    1: [-0.6, 2, -1],
    2: [-4, 1.8, -1],
  };

  const [cartridgePos, setCartridgePos] = useState(possiblePolarsCartridge[0]);
  const [dynamicComponent, setDynamicComponent] = useState(0);

  const wheelDown = useCallback(() => {
    setTimeout(() => {
      internalCountWheel.current++;
      setDynamicComponent(internalCountWheel.current % 2);
    }, 0);
  }, []);

  // TODO: Add error bounding later 
  // We can change this to handle scroll so we can increment/decrement or tbh we can just % and wrap. 
  const handleClick = () => {
    SetSelectedProject( selectedProject + 1 ) ; 
  }

  return (
    <div className="App" style={{ background: color }}>
      <Animation width='600px' onComplete={handleAnimationComplete} />
      {!showAnimation && <Hud />}
      {!showAnimation && (
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
    </div>
  );
}

export default App;
