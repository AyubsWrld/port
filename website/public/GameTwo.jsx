import React, { useState , useEffect  , useRef} from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);


export default function GameTwo(props) {
  const { scene } = useGLTF('./CardtrigeTwo.glb'); 


  const useIncrement = useRef(0);
  const boolArray = [true , false, false];
  
  function isUsed() {
      if (!boolArray[useIncrement.current % 3]) {
          useIncrement.current++;
          return 500;
      }
      useIncrement.current++;
      return 3000;
  }

  useEffect(() => {
    console.log(props.coordinates) ; 
  } , []) ; 
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);


  const { position, rotation } = useSpring({
    from: { position: [-10, 4, -0.5], rotation: [-0.8, 4, -0.3] },
    to: { 
      position: props.coordinates,
      rotation: props.rotationalCoordinates  
    },
    config: {
      duration: isUsed(),
      easing: t => easing(t)
    }
  });


  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(prev => !prev);
  };

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      // onPointerOver={handlePointerOver}
      // onPointerOut={handlePointerOut}
      onClick={handleClick}
      {...props}
    />
  );
}


useGLTF.preload('./CardtrigeTwo.glb'); // Adjust path if needed

