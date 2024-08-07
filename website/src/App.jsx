import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cartridge from '../public/Cartridge.jsx'; // Import your GLB loader component
import Game from '../public/Game.jsx'; // Import your GLB loader component
import GameTwo from '../public/GameTwo.jsx'; // Import your GLB loader component
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Animation from './components/Animation.jsx';
import ButtonComponent from './ButtonComponent.jsx';
import DescriptionComponent from '../public/DescriptionComponent.jsx';
import Hud from './Hud.jsx';

import './App.css';

const GameComponent = React.memo(Game);
const GameTwoComponent = React.memo(GameTwo);

function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [polars, setPolars] = useState([-0.2, -0.2, 0]);
  const [rotation, setRotation] = useState([-0.5, 0.3, 0.3]);
  const [rotationCartridge, setRotationCartridge] = useState([-0.5, 0.3, 0.3]);
  const [showDescription, setShowDescription] = useState(false);
  const [color, setColor] = useState('black');

  const polarInternalCount = useRef(0);
  const internalCountWheel = useRef(0);
  const cartidgeInternalCount = useRef(0);
  const rotationalInternalCount = useRef(0);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    window.addEventListener('wheel', wheelDown);
    return () => window.removeEventListener('wheel', wheelDown);
  }, []);

  const componentMap = {
    0: GameTwoComponent,
    1: GameComponent
  };

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
      setDynamicComponent(internalCountWheel.current % Object.keys(componentMap).length);
    }, 0);
  }, [componentMap]);

  const handleClick = useCallback(() => {
    polarInternalCount.current++;
    cartidgeInternalCount.current++;
    setPolars(possiblePolars[polarInternalCount.current % Object.keys(possiblePolars).length]);
    setCartridgePos(possiblePolarsCartridge[cartidgeInternalCount.current % Object.keys(possiblePolarsCartridge).length]);

    if (showDescription) {
      rotationalInternalCount.current++;
      setRotation(possibleRotations[rotationalInternalCount.current % Object.keys(possibleRotations).length]);
      setRotationCartridge(possibleRotationsCartridge[rotationalInternalCount.current % Object.keys(possibleRotationsCartridge).length]);
      setShowDescription(false);
    } else {
      setTimeout(() => {
        rotationalInternalCount.current++;
        polarInternalCount.current++;
        cartidgeInternalCount.current++;
        setPolars(possiblePolars[polarInternalCount.current % Object.keys(possiblePolars).length]);
        setCartridgePos(possiblePolarsCartridge[cartidgeInternalCount.current % Object.keys(possiblePolarsCartridge).length]);
        setRotation(possibleRotations[rotationalInternalCount.current % Object.keys(possibleRotations).length]);
        setRotationCartridge(possibleRotationsCartridge[rotationalInternalCount.current % Object.keys(possibleRotationsCartridge).length]);
        // setColor('radial-gradient(#250303, #000000)');
        setColor('black');
      }, 500);
      setTimeout(() => {
        setShowDescription(true);
      }, 500);
    }
  }, [showDescription]);

  const DynamicComponent = componentMap[dynamicComponent];


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
              <Cartridge polarCoordinates={polars} rotationalCoordinates={rotation} />
              {DynamicComponent && <DynamicComponent key={dynamicComponent} coordinates={cartridgePos} rotationalCoordinates={rotationCartridge} />}
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
