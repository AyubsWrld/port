import React, { useState, useContext } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing';


const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function GameTwo(props) {
  const { scene } = useGLTF('./CardtrigeTwo.glb'); 



  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);


  const { position, rotation } = useSpring({
    from: { position: [-10, 4, -0.5], rotation: [-0.8, 4, -0.3] },
    to: { 
      position: props.coordinates,
      rotation: props.rotationalCoordinates  
    },
    config: {
      duration: 2000, // Use the isUsed function to determine the duration
      easing: t => easing(t)
    }
  });

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      {...props}
    />
  );
}

useGLTF.preload('./CardtrigeTwo.glb'); // Ensure the path is correct
