import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import StartScreen from '../src/assets/anims/Flipped_1.mp4';
import ProjectOne from '../src/assets/anims/ProjectOne.mp4';
import ProjectTwo from '../src/assets/anims/ProjectTwo.mp4';
import ProjectThree from '../src/assets/anims/ProjectThree.mp4';

const UriToVideoTexture = ( source ) => 
{
  const video =  document.createElement( 'video' ) ; 
  video.src = source  ;
  video.loop = false ; 
  video.muted = true ; ; 
  video.crossOrigin = false ;  // Why is this needed frl 
  video.playsInline = true;
  video.style.filter = 'saturate(0)';
  video.play();  // Without this it doesn't work ? 
  const texture = new THREE.VideoTexture( video )  ;
  return texture ;
}

// This context has to be provided in the app which is kinda shtty 
const VideoURIs = [
  ProjectOne,
  ProjectTwo,
  ProjectThree,
]

const VideoTexturesArray = new Array() ; 


const getModelPath = (modelName) => {
  // Base url the app is being served from. 
  // All requested files are "Served relative to this directory"
  // This returns our base directory + our models names, assumes model is within base directory 
  return import.meta.env.BASE_URL + modelName; 
};

// Start of the acutal 
export default function Cartridge({
  polarCoordinates = [-0.2, -0.2, 0],
  rotationalCoordinates,
  onClick,
  selectedProject,
  isStartScreenLoading,
  ...props
}) {

  var texture;  // Global scope this so we can change it later  Dont really need this anymore tbh ; 
  const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);
  // Create the HTML element to be used within setting the texture value.
  // <video> </video>  <- basically all it does.
  const video = document.createElement('video'); // Keep this function scoped 

  // VideoTexturesArray used to store the potential videos defined. Easily expendable.

  // On rerender ? js do this once 
  useEffect( () => {
    VideoURIs.forEach( element => {
      VideoTexturesArray.push( UriToVideoTexture( element ) ) ; 
    })
  }, []) ;



  // Max array length, I js do this to avoid magic numbers. ( Although VideoTexturesArray.length() is pretty descriptive )
  const VIDEO_ARRAY_SIZE = VideoTexturesArray.length ;
  const [modelLoaded, setModelLoaded] = useState(false);
  
  useEffect(() => { // Not using this anymore ? 
    console.log("polars changed");
    const materialTest = new THREE.MeshBasicMaterial() ; 
    nodes['GB_02_low_Screen'].material= materialTest  ; 
  }, [polarCoordinates[0]]);

  const modelPath = getModelPath('Test.glb'); // Retrieve model path from base url. 

  // Load GLTF data using useGLTF
 

  const { scene, nodes, materials } = useGLTF(modelPath);
  const targetMesh = nodes['GB_02_low_Screen']; // Change this to ScreenMesh
  const buttonMesh = nodes['GB_03_low_ButtonMovement']; // ButtonMesh


  // 
  buttonMesh.addEventListener( 'customEvent' , (event) => { 
    console.log('eventFired: ', event ) ;
  });

  buttonMesh.dispatchEvent( { type : 'customEvent' } ); // called twice ? 

  const groupRef = useRef();


  // Helper function to set the current index within the array:width: ,. 
  


  useEffect(() => { 
    if (scene) { // If scene loaded properly 
      setModelLoaded(true);
    }

    // These just change the tag attributes 
    video.src = StartScreen ; 
    video.crossOrigin = 'Anonymous';
    video.loop = false ;
    video.muted = true;
    video.playsInline = true;
    video.style.filter = 'saturate(0)';

    // The canplaythrough event is fired when the user agent can play the media,
    // and estimates that enough data has been loaded to play the media up to its
    // end without having to stop for further buffering of content. Idk if this is needed but everything I've been doing is local so cant test
    
    video.addEventListener('canplaythrough', () => {
      video.play();
    });
    
    video.addEventListener('play', () => {
      texture = new THREE.VideoTexture( video ) ; 
      texture.needsUpdate = true;

      // Get the Mesh we want to apply the video to  
      if (targetMesh) {
        targetMesh.material.map = texture; // is this a reference to ? 
        targetMesh.material.map.offset.set( -2.37 ,  -2.9 ) ; 
        targetMesh.material.map.repeat.set( 5.9 ,   5.9 ) ; 
        targetMesh.material.map.center.set( 0 ,  0 ) ; 
        targetMesh.material.map.flipY = false; // Why tf is this set to true 
        targetMesh.material.needsUpdate = true;
      }else{
        console.error( "Could not load screen mesh" ) ;
      }
    });

    return () => {
      video.pause();
      video.src = '';
      video.load();
    }; // Cleanup after actually loading the file ?  ig we just passing the values in 
  }, [ nodes, scene ]);

  useEffect( () => {
    if( !isStartScreenLoading ) 
    {
      try {
        targetMesh.material.map = VideoTexturesArray[ selectedProject % VideoTexturesArray.length] ;
        targetMesh.material.map.offset.set( -2.37 ,  -2.9 ) ; 
        targetMesh.material.map.repeat.set( 5.9 ,   5.9 ) ; 
        targetMesh.material.map.center.set( 0 ,  0 ) ; 
        targetMesh.material.map.flipY = false; // Why tf is this set to true 
        targetMesh.material.needsUpdate = true;
      } catch (e) {
        console.error(`Error occured while setting the mesh : ${e}`) ;
      }
    }
    console.log(isStartScreenLoading) ;
    console.log('selectedProject' )
  } , [ selectedProject ]
  );

  const { position, rotation } = useSpring({
    from: { position: [-0.2, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position: polarCoordinates,
      rotation: rotationalCoordinates
    },
    config: {
      duration: 2000,
      easing: t => easing(t)
    }
  });

  if (!modelLoaded) return null;

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

// Preload the model
try {
  useGLTF.preload(getModelPath('Test.glb'));
} catch (error) {
  console.error('Error preloading model:', error);
}
