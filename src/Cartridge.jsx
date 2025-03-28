import React, { useState, useEffect, useRef, useContext } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

import Animation from '../src/assets/anims/Screen.mp4';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function Cartridge({
  polarCoordinates = [-0.2, -0.2, 0],
  rotationalCoordinates,
  onClick,
  ...props
}) {


  const { scene, nodes, materials } = useGLTF('./Test.glb');
  const groupRef = useRef();


  useEffect(() => {
    console.log("polars changed");
    console.log( nodes );
  }, [polarCoordinates[0]]);

  useEffect(() => {
    const targetMesh = nodes['GB_03_low_ButtonMovement']; 
    if (targetMesh) {
      console.log('Mesh exists');
      targetMesh.material.color.set(0xff0000); 
      targetMesh.material.needsUpdate = true;
    } else {
      console.log('Mesh absent');
    }
  }, []);

  const { position, rotation } = useSpring({
    from: { position: [-0.2, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position: polarCoordinates,
      rotation: rotationalCoordinates
    },
    config: {
      duration: 2000 , // Use the isUsed function to determine the duration
      easing: t => easing(t)
    }
  });

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      ref={groupRef}
      {...props}
    />
  );
}

useGLTF.preload('./Test.glb');
