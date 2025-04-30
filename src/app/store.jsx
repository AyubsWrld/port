import { configureStore } from '@reduxjs/toolkit'
import level from './levelSlice.jsx' ; 

export default configureStore({
  reducer: { level } 
}); 
