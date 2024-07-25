// src/components/BlenderModel.jsx
import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PerspectiveCamera, PointLight } from 'three';

function BlenderModel({ url }) {
  const gltf = useLoader(GLTFLoader, url);

  const cameraRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const camera = gltf.cameras.find((cam) => cam.name === 'FrontView');
    if (camera) {
      cameraRef.current = camera;
    }

    const light = gltf.scene.getObjectByName('AreaLight1');
    if (light) {
      lightRef.current = light;
    }
  }, [gltf]);

  useFrame(({ gl, scene }) => {
    if (cameraRef.current) {
      gl.render(scene, cameraRef.current);
    }
  });

  return (
    <>
      <primitive object={gltf.scene} />
      {cameraRef.current && <primitive object={cameraRef.current} />}
      {lightRef.current && <primitive object={lightRef.current} />}
    </>
  );
}

export default BlenderModel;
