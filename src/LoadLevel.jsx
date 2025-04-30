import { useDispatch } from 'react-redux' ; 
import { setCurrentLevel, setBinaryMap, setDescription, setModel } from './app/levelSlice.jsx'



const namedLevelArray = [  // This is arrayLength + 1
  'start',
  'projectOne',
  'projectTwo',
  'projectThree',
]


const binaryMap = [ 
  [ null ],
  [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, -1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ],
  [ null ] ,
  [ null ] 
]

const descriptionArray = [
  null ,
  { } ,
  { } ,
  { } 
]

const modelURL = [
  null,
  '../src/assets/3D/Room.glb' ,
  '../src/assets/3D/Room.glb' ,
  '../src/assets/3D/Room.glb'
]

// Transition function.

//NOTE: 
  // idx here is within range [ 0, 2 ], this will only map to between default to project 2.
  // We never really wantt this to be the case so set it to idx + 1 to shift range to [ 1, 3 ]. 
//

export const useLevelLoader = () => {
  const dispatch = useDispatch();
  const LoadLevel = (idx) => {
    dispatch(setCurrentLevel(namedLevelArray[idx + 1]));
    dispatch(setBinaryMap(binaryMap[idx + 1]));
    dispatch(setDescription(descriptionArray[idx + 1]));
    dispatch(setModel(modelURL[idx + 1]));
  };

  const resetDefault = () => {
    dispatch(setCurrentLevel(namedLevelArray[0]));
    dispatch(setBinaryMap(binaryMap[0]));
    dispatch(setDescription(descriptionArray[0]));
    dispatch(setModel(modelURL[0]));
  };

  return { LoadLevel, resetDefault };
};
