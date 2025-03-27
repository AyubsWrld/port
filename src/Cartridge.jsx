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




  useEffect(() => {
    console.log("polars changed");
  }, [polarCoordinates[0]]);

  const { scene, nodes, materials } = useGLTF('./Test.glb');
  const groupRef = useRef();


  useEffect(() => {
    const video = document.createElement('video');
    video.src = Animation;
    video.crossOrigin = 'Anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    video.addEventListener('canplaythrough', () => {
      video.play();
    });

    video.addEventListener('play', () => {
      const texture = new THREE.VideoTexture(video);
      texture.needsUpdate = true;

      // Apply the video texture to the specific mesh material
      const targetMesh = nodes['GB_02_low_Screen']; // The name of your mesh
      if (targetMesh) {
        targetMesh.material.map = texture;
        targetMesh.material.needsUpdate = true;
      }
    });

    // Clean up
    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [nodes]);

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
