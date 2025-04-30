import { createSlice } from '@reduxjs/toolkit' ; 


export const levelSlice = createSlice({
  name: 'Level',
  initialState: {
    currentLevel: 'start',
    binaryMap: {},
    description: {},
    model: 'path-to-model'
  },
  reducers: {
    setCurrentLevel: ( state, action ) => {
      console.log(`Setting currentLevel to ${ action.payload }`);
    },
    setBinaryMap: ( state, action ) => {
      console.log(`Loading binary map data from ${ state.currentLevel } to ${ action.payload }`);
    },
    setDescription: ( state, action ) => {
      console.log('Setting current description'); 
    },
    setModel: ( state, action ) => {
      console.log(`Setting model path: ${action.payload}`) ; 
    }
  }
}) ; 

export default levelSlice.reducer ;
export const { setCurrentLevel, setBinaryMap, setDescription, setModel } = levelSlice.actions ; 

