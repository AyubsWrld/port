import React, { useState  , useEffect  , useRef } from 'react';
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

  var internalCount = useRef(0) ; 
  const [showAnimation, setShowAnimation] = useState(true);
  const [polars, setPolars] = useState([-0.2, -0.2, 0]);
  const [showDescription  , setShowDescription ] = useState(false) ; 
  var polarInternalCount = useRef(0) ; 
  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    window.addEventListener("wheel" , wheelDown)
  } , []) ; 


  const componentMap = {
    0 : GameTwo, 
    1 : Game, 
  } ; 

  const possiblePolars = {
    0 : [-0.2, -0.2, 0], 
    1 : [-3 ,  -0.2, 0], 
  } ; 
  


  const [dynamicComponent, setDynamicComponent] = useState(0) ; 
  function wheelDown() {
    setTimeout(() => {
    internalCount.current++;
      setDynamicComponent(internalCount.current % Object.keys(componentMap).length);
      console.log(internalCount.current % Object.keys(componentMap).length) ; 
      console.log(componentMap[internalCount.current % Object.keys(componentMap).length]) ;  
    }, 0);
  }

  function handleClick() {
    polarInternalCount.current++;
    const newPolarIndex = polarInternalCount.current % Object.keys(possiblePolars).length;
    setPolars(possiblePolars[newPolarIndex]);
  
    if (showDescription) {
      setShowDescription(false);
    } else {
      setTimeout(() => {
        setShowDescription(true);
      }, 150);
    }
  }

  console.log(internalCount.current % Object.keys(componentMap).length) ; 
  const DynamicComponent = componentMap[dynamicComponent] ; 
  return (
    <div className="App">
      <Animation width='600px' onComplete={handleAnimationComplete} />
      {!showAnimation && <Hud />} 
      {!showAnimation && <div className = 'Canvas'>
        <Canvas style={{}}>

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


          <Cartridge polarCoordinates = {polars}/>

          {DynamicComponent && <DynamicComponent />}

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              height={400}
            />
          </EffectComposer>
        </Canvas>
        <div className='Button-Container'>
          <button onClick={() => {handleClick()} } className='SwapCart'>
            Swap Cart
          </button>
        </div>
      {!showAnimation && showDescription && <DescriptionComponent/>} 
      </div>}
    </div>
  );
}
export default App;

