import * as THREE from 'three' ; 
import StartScreen from '../src/assets/anims/Flipped.mp4'  ; 
import ProjectOne from '../src/assets/anims/Resized.mp4'  ; 

// Don't really need to iterate over this frl just keep things static 

const VideoURIs = [
  StartScreen,
  ProjectOne
]

const UriToVideoTexture = ( source ) => 
{
  const video =  document.createElement( 'video' ) ; 
  video.src = source  ;
  video.loop = true ; 
  video.muted = true ; ; 
  video.crossOrigin = false ;  // Why is this needed frl 
  return new THREE.VideoTexture(video) ;
}

export const VideoTexturesArray = [ 
]
