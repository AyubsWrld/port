import { createSlice } from '@reduxjs/toolkit' ; 


export const levelSlice = createSlice({
  name: 'Level',
  initialState: {
    currentLevel: 'start',
    binaryMap: null ,
    description: null ,
    model: null
  },
  reducers: {
    setCurrentLevel: ( state, action ) => {
      console.log(`Setting currentLevel to ${ action.payload }`);
      state.currentLevel =  action.payload ; 
    },
    setBinaryMap: ( state, action ) => {
      console.log(`Loading binary map data from ${ state.currentLevel } to ${ action.payload }`);
      state.binaryMap =  action.payload ; 
    },
    setDescription: ( state, action ) => {
      console.log('Setting current description'); 
      state.description =  action.payload ; 
    },
    setModel: ( state, action ) => {
      console.log(`Setting model path: ${action.payload}`) ; 
      state.model =  action.payload ; 
    }
  }
}) ; 

export default levelSlice.reducer ;
export const { setCurrentLevel, setBinaryMap, setDescription, setModel } = levelSlice.actions ; 

