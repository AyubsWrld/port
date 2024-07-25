import React, { useState } from 'react';
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

function App() {

  const [showAnimation, setShowAnimation] = useState(true);
  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  
  const componentMap = {
    0 : Game , 
    1 : GameTwo  
  } ; 
  const [dynamicComponent, setDynamicComponent] = useState(0) ; 
  const handleClick = (idx) => {
    setDynamicComponent(idx) ; 
  }
  const DynamicComponent = componentMap[dynamicComponent] ; 
  return (
    <div className="App">
      <Animation width='600px' onComplete={handleAnimationComplete} />
      {!showAnimation && <Hud />} 
      {/* {!showAnimation && <ButtonComponent />}  */}
      {!showAnimation && <div className = 'Canvas'>
        <Canvas>

          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />


          <ambientLight intensity={0.1} /> 
          <directionalLight
            position={[-2, 2, -2]}
            intensity={8}
            castShadow
          />
          <directionalLight
            position={[1, 0, -1]}
            intensity={4}
            castShadow
          />
          <directionalLight
            position={[1, 1, -1]}
            intensity={1}
            castShadow
          />
          <pointLight
            position={[10, 10, 10]}
            intensity={1}
            decay={2}
            distance={50}
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.2}
            penumbra={1}
            intensity={1}
            castShadow
          />


          <OrbitControls 
            enablePan={false}
            enableRotate={false}
            enableDamping={false}
            enableZoom={false}
          /> 


          <Cartridge />
          <DynamicComponent/>
          {/* <GameTwo /> */}


          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              height={400}
            />
          </EffectComposer>
        </Canvas>
      {/* {!showAnimation && <DescriptionComponent />} */}
      </div>}
    </div>
  );
}

export default App;

