import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cartridge from '../public/Cartridge.jsx';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useDispatch, useSelector } from 'react-redux'; 
import Animation from './components/Animation.jsx';
import DescriptionComponent from '../public/DescriptionComponent.jsx';
import Hud from './Hud.jsx';
import { useLevelLoader } from './LoadLevel.jsx';
import Pixel from './Pixel.tsx';

import './App.css';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [polars, setPolars] = useState([-0.2, -0.2, 0]);
  const [rotation, setRotation] = useState([-0.5, 0.3, 0.3]);
  const [rotationCartridge, setRotationCartridge] = useState([-0.5, 0.3, 0.3]);
  const [showDescription, setShowDescription] = useState(false);
  const [color, setColor] = useState('black');
  const [startScreenLoading, setStartScreenLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(0);
  const polarInternalCount = useRef(0);
  const internalCountWheel = useRef(0);
  const cartidgeInternalCount = useRef(0);
  const rotationalInternalCount = useRef(0);
  const projectRef = useRef(0);
  
  // This is the key part - we need to use useSelector to get the updated level state
  const levelState = useSelector(state => state.level);
  const dispatch = useDispatch();
  const { LoadLevel, resetDefault } = useLevelLoader();

  const handleClick = () => {
    // Toggle description visibility or implement other functionality
    setShowDescription(!showDescription);
  }

  const handleSelectProject = () => {
    const projectIndex = projectRef.current % 3;
    LoadLevel(projectIndex);
  }

  const handleToggleProject = (e) => {
    switch (e.code) {
      case "Enter":
        handleSelectProject();
        break;
      case "ArrowUp":
        setSelectedProject(prev => {
          const newValue = Math.abs(prev - 1) % 3;
          projectRef.current = newValue;
          return newValue;
        });
        console.log(selectedProject) ; 
        break;
      case "ArrowDown":
        setSelectedProject(prev => {
          const newValue = Math.abs(prev + 1) % 3;
          projectRef.current = newValue;
          return newValue;
        });
        console.log(selectedProject) ; 
        break;
      default:
        break;
    }
  }

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    console.log('Current level changed to:', levelState.currentLevel);
  }, [levelState.currentLevel]);

  useEffect(() => {
    document.addEventListener('keydown', handleToggleProject);
    return () => {
      document.removeEventListener('keydown', handleToggleProject);
    }
  }, [selectedProject]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartScreenLoading(false);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderLevelContent = () => {
    switch (levelState.currentLevel) {
      case 'start':
        return (
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
              <Cartridge 
                polarCoordinates={polars} 
                rotationalCoordinates={rotation} 
                selectedProject={selectedProject} 
                isStartScreenLoading={startScreenLoading} 
              />
              <EffectComposer>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={400} />
              </EffectComposer>
            </Canvas>
            <div className='Button-Container'>
              <button onClick={handleClick} className='SwapCart'>Project Details</button>
            </div>
            {showDescription && <DescriptionComponent />}
          </div>
        );
      case 'projectOne':
        return <Pixel />;
      case 'projectTwo':
        return <div>Project Two Content</div>;
      case 'projectThree':
        return <div>Project Three Content</div>;
      default:
        return <div>Unknown Level</div>;
    }
  };

  return (
    <div className="App" style={{ background: color }}>
      {showAnimation ? (
        <Animation width='600px' onComplete={handleAnimationComplete} />
      ) : (
        <>
          <Hud />
          {renderLevelContent()}
        </>
      )}
    </div>
  );
}

export default App;
