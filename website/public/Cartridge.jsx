import React, { useState , useEffect , useRef} from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing'; // Import bezier-easing library

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function Cartridge({ polarCoordinates = [-0.2, -0.2, 0] , rotationalCoordinates ,  onClick, ...props }) {


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


  useEffect(() => { console.log("polars changed");

  } , [polarCoordinates[0]]) ;

  const { scene } = useGLTF('./Test.glb'); // Adjust path if needed

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(prevClicked => !prevClicked);
    if (onClick) {
      onClick(); // Notify parent component of the click
    }
  };

  const { position, rotation } = useSpring({
    from: { position: [-0.2, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position:  polarCoordinates ,
      rotation:  rotationalCoordinates
    },
    config: {
      duration: isUsed(),
      easing: t => easing(t)
    }
  });


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

useGLTF.preload('./Test.glb'); // Preload GLTF model
